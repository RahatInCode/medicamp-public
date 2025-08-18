import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import React, { useContext, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../api/axiosSecure";
import { AuthContext } from "../../features/auth/AuthContext";
import toast from "react-hot-toast";

export default function Profile() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["participantProfile", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(
        `/participantRegistrations/user?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
    onError: () => toast.error("Failed to load profile data."),
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setNameInput(data[0].participantName || "");
      setImageInput(data[0].participantImage || "");
    }
  }, [data]);

  const updateMutation = useMutation({
    mutationFn: ({ name, image }) =>
      axiosSecure.patch("/participantRegistrations/profile", {
        participantName: name,
        participantImage: image,
      }),
    onSuccess: async () => {
      try {
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName: nameInput.trim(),
            photoURL: imageInput.trim() || null,
          });
        }
        toast.success("Profile updated successfully!");
        queryClient.invalidateQueries(["participantProfile", user.email]);
        setIsEditing(false);
      } catch (error) {
        console.error("Firebase profile update error:", error);
        toast.error("Failed to update Firebase profile.");
      }
    },
    onError: () => {
      toast.error("Failed to update profile.");
    },
  });

  if (authLoading)
    return <p className="p-6 text-base-content/70">Loading user info...</p>;
  if (!user)
    return <p className="p-6 text-base-content/70">Please log in to view your profile.</p>;
  if (isLoading)
    return <p className="p-6 text-base-content/70">Loading profile data...</p>;
  if (isError)
    return <p className="p-6 text-error">Failed to load profile data.</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    updateMutation.mutate({ name: nameInput.trim(), image: imageInput.trim() });
  };

  const displayName = nameInput || user.displayName || "No name";
  const displayImage =
    imageInput ||
    user.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName
    )}&background=random`;

  return (
    <div className="max-w-md mx-auto p-6 bg-base-100 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-base-content">
        Participant Profile
      </h2>

      <div className="flex flex-col items-center space-y-4 mb-6">
        <img
          src={displayImage}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <p className="text-xl font-semibold text-base-content">{displayName}</p>
        <p className="text-base-content/70">{user.email}</p>

        {data?.[0] && (
          <div className="mt-2 text-sm text-base-content/70 space-y-1">
            <p>
              <strong>Phone:</strong> {data[0].phone || "N/A"}
            </p>
            <p>
              <strong>Age:</strong> {data[0].age || "N/A"}
            </p>
            <p>
              <strong>Gender:</strong> {data[0].gender || "N/A"}
            </p>
            <p>
              <strong>Emergency Contact:</strong> {data[0].emergencyContact || "N/A"}
            </p>
          </div>
        )}
      </div>

      {!isEditing && (
        <button className="btn btn-primary w-full" onClick={() => setIsEditing(true)}>
          Update Profile
        </button>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block mb-1 font-semibold text-base-content">Name</label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="input input-bordered w-full"
              disabled={updateMutation.isLoading}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-base-content">Image URL</label>
            <input
              type="text"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              className="input input-bordered w-full"
              disabled={updateMutation.isLoading}
              placeholder="Paste an image URL"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsEditing(false)}
              disabled={updateMutation.isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={updateMutation.isLoading}
            >
              {updateMutation.isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

