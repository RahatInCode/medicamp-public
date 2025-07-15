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

  if (!user) return <p className="text-white">User not logged in.</p>;

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
            {user.displayName || "No Name"}
          </h2>
          <p className="flex justify-center items-center gap-2 text-sm text-gray-200">
            <Mail className="w-4 h-4" />
            {user.email}
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
                disabled
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
                reset({
                  name: user.displayName || "",
                  email: user.email || "",
                  image: user.photoURL || "",
                });
                setProfileImage(user.photoURL || "");
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

