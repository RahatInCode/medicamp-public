import { useForm } from "react-hook-form";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth } from '../../firebase/firebase.config';
import { useNavigate, Link } from "react-router";
import { toast } from "react-hot-toast"; // ✅ replaced sonner with hot-toast

const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const onSubmit = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log("✅ User signed in:", res.user);
        toast.success("Login successful!");
        navigate("/");
      })
      .catch((err) => {
        console.error("❌ Login failed:", err.code);
        if (
          err.code.includes("auth/wrong-password") ||
          err.code.includes("auth/user-not-found")
        ) {
          toast.error("Wrong email or password. Please check credentials.");
        } else {
          toast.error("Login failed. Try again.");
        }
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log("✅ Google login:", res.user);
        toast.success("Logged in with Google!");
        navigate("/");
      })
      .catch((err) => {
        console.error("❌ Google login error:", err.message);
        toast.error("Google login failed");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4 font-bold text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
        />
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn bg-black text-white w-full">Login</button>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full mt-4"
      >
        Sign in with Google
      </button>
      <p className="mt-4 text-center">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-blue-600 underline">Register</Link>
      </p>
    </div>
  );
};

export default SignIn;




