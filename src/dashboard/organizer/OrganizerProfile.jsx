import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { Edit2, Mail, UserCircle, Image } from "lucide-react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../features/auth/AuthContext";
import axiosSecure from "../../api/axiosSecure";
import toast from "react-hot-toast";

const OrganizerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(""); // For live image preview
  const { user } = useContext(AuthContext);
  const [organizerId, setOrganizerId] = useState(null);

  const { register, handleSubmit, reset, watch } = useForm();

  // Fetch real data on mount
  useEffect(() => {
    if (!user?.email) return;
    axiosSecure
      .get(`/organizers/${user.email}`)
      .then((res) => {
        const data = res.data;
        setOrganizerId(data._id); // needed for update
        setProfileImage(data.image); // show profile pic
        reset(data); // populate form fields
      })
      .catch((err) => {
        console.error("Failed to fetch profile:", err);
        toast.error("Failed to load profile info");
      });
  }, [user, reset]);

  // Live image preview update
  const imageWatch = watch("image");

  useEffect(() => {
    if (imageWatch) setProfileImage(imageWatch);
  }, [imageWatch]);

  const onSubmit = async (data) => {
    try {
      await axiosSecure.put(`/organizers/${organizerId}`, data);
      toast.success("Profile updated!");
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update failed:", err);
      toast.error("Update failed. Try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-10 bg-white/10 backdrop-blur-md border border-white/10 shadow-xl p-6 rounded-2xl text-white"
    >
      {!isEditing ? (
        <div className="text-center space-y-4">
          <img
            src={profileImage || "https://i.pravatar.cc/150?img=12"}
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full border-2 border-white object-cover"
          />
          <h2 className="text-xl font-semibold flex justify-center items-center gap-2">
            <UserCircle className="w-5 h-5" />
            {watch("name") || "Loading..."}
          </h2>
          <p className="flex justify-center items-center gap-2 text-sm text-gray-200">
            <Mail className="w-4 h-4" />
            {watch("email") || "Loading..."}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 transition rounded-xl flex items-center justify-center gap-2 font-medium"
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
            <label className="block mb-1 text-sm">Name</label>
            <div className="flex items-center border border-white/20 rounded-xl px-3 py-2 bg-white/10">
              <UserCircle className="w-5 h-5 text-white/70" />
              <input
                {...register("name")}
                className="bg-transparent outline-none ml-2 w-full text-white"
                type="text"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm">Email</label>
            <div className="flex items-center border border-white/20 rounded-xl px-3 py-2 bg-white/10">
              <Mail className="w-5 h-5 text-white/70" />
              <input
                {...register("email")}
                className="bg-transparent outline-none ml-2 w-full text-white"
                type="email"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm">Profile Image URL</label>
            <div className="flex items-center border border-white/20 rounded-xl px-3 py-2 bg-white/10">
              <Image className="w-5 h-5 text-white/70" />
              <input
                {...register("image")}
                className="bg-transparent outline-none ml-2 w-full text-white"
                type="text"
              />
            </div>
            {profileImage && (
              <img
                src={profileImage}
                alt="Preview"
                className="w-20 h-20 mt-3 rounded-full object-cover border"
              />
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl w-full"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                reset(); // revert to last fetched data
              }}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl w-full"
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
