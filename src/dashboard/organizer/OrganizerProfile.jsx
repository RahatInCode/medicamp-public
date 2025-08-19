import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Edit2, Mail, UserCircle, Image } from "lucide-react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../features/auth/AuthContext";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../../firebase/firebase.config";

const OrganizerProfile = () => {
  const { user } = useContext(AuthContext); // Firebase user
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.photoURL || "");
  const { register, handleSubmit, reset, watch } = useForm();

  // Reset form with Firebase user data
  useEffect(() => {
    if (user) {
      reset({
        name: user.displayName || "",
        email: user.email || "",
        image: user.photoURL || "",
      });
      setProfileImage(user.photoURL || "");
    }
  }, [user, reset]);

  // Live image preview
  const imageWatch = watch("image");
  useEffect(() => {
    if (imageWatch) setProfileImage(imageWatch);
  }, [imageWatch]);

  const onSubmit = async (data) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: data.name,
        photoURL: data.image,
      });

      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Update failed");
    }
  };

  if (!user) return <p className="p-6 text-base-content">User not logged in.</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-10 bg-base-100 text-base-content border border-base-300 shadow-xl p-6 rounded-2xl"
    >
      {!isEditing ? (
        <div className="text-center space-y-4">
          <img
            src={profileImage || "https://i.pravatar.cc/150?img=12"}
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full border-2 border-base-300 object-cover"
          />
          <h2 className="text-xl font-semibold flex justify-center items-center gap-2">
            <UserCircle className="w-5 h-5" />
            {user.displayName || "No Name"}
          </h2>
          <p className="flex justify-center items-center gap-2 text-sm text-base-content/70">
            <Mail className="w-4 h-4" />
            {user.email}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-primary mt-4 flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Edit2 className="w-4 h-4" /> Update Profile
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 animate-in fade-in duration-300"
        >
          <div>
            <label className="block mb-1 text-sm text-base-content/70">Name</label>
            <div className="flex items-center border border-base-300 rounded-xl px-3 py-2 bg-base-100">
              <UserCircle className="w-5 h-5 text-base-content/50" />
              <input
                {...register("name")}
                className="bg-transparent outline-none ml-2 w-full text-base-content"
                type="text"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm text-base-content/70">Email</label>
            <div className="flex items-center border border-base-300 rounded-xl px-3 py-2 bg-base-100">
              <Mail className="w-5 h-5 text-base-content/50" />
              <input
                {...register("email")}
                className="bg-transparent outline-none ml-2 w-full text-base-content"
                type="email"
                disabled
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm text-base-content/70">Profile Image URL</label>
            <div className="flex items-center border border-base-300 rounded-xl px-3 py-2 bg-base-100">
              <Image className="w-5 h-5 text-base-content/50" />
              <input
                {...register("image")}
                className="bg-transparent outline-none ml-2 w-full text-base-content"
                type="text"
              />
            </div>
            {profileImage && (
              <img
                src={profileImage}
                alt="Preview"
                className="w-20 h-20 mt-3 rounded-full object-cover border border-base-300"
              />
            )}
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              type="submit"
              className="btn btn-success w-full sm:w-auto flex-1"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                reset({
                  name: user.displayName || "",
                  email: user.email || "",
                  image: user.photoURL || "",
                });
                setProfileImage(user.photoURL || "");
              }}
              className="btn btn-error w-full sm:w-auto flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default OrganizerProfile;


