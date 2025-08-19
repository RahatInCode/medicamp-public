import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from '../../firebase/firebase.config';
import { useNavigate, Link } from "react-router";
import { toast } from "react-hot-toast";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const onSubmit = ({ name, email, password }) => {
    if (password.length < 6) {
      toast.error("🚫 Password must be at least 6 characters!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await updateProfile(user, { displayName: name });
        const token = await user.getIdToken();
        localStorage.setItem("token", token);

        await fetch("https://medicamp-server-five.vercel.app/users", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, email }),
        });

        toast.success("🎉 Registration successful!");
        setTimeout(() => navigate("/"), 1200);
      })
      .catch((err) => {
        console.error("❌ Registration error:", err.message);
        toast.error("⚠️ Registration failed: " + err.message);
      });
  };

  const handleGoogleRegister = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (res) => {
        const user = res.user;
        const token = await user.getIdToken();
        const name = user.displayName || "Google User";
        const email = user.email;
        localStorage.setItem("token", token);

        await fetch("https://medicamp-server-five.vercel.app/users", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, email }),
        });

        toast.success("🎯 Google registration successful!");
        navigate("/");
      })
      .catch((err) => {
        console.error("❌ Google registration error:", err.message);
        toast.error("⚠️ Google registration failed: " + err.message);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-base-200 dark:bg-base-300 rounded-xl shadow-lg">
      <h2 className="text-2xl mb-6 font-bold text-center text-base-content dark:text-white">
        Register
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="Full Name"
          className="input input-bordered w-full bg-base-100 dark:bg-base-200 text-base-content dark:text-white"
        />
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
          className="input input-bordered w-full bg-base-100 dark:bg-base-200 text-base-content dark:text-white"
        />
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password (min 6 characters)"
          className="input input-bordered w-full bg-base-100 dark:bg-base-200 text-base-content dark:text-white"
        />
        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          Register
        </button>
      </form>

      <button
        onClick={handleGoogleRegister}
        className="btn btn-outline w-full mt-4"
      >
        Register with Google
      </button>

      <p className="mt-4 text-center text-base-content dark:text-gray-300">
        Already have an account?{" "}
        <Link to="/join-us" className="text-primary underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;





