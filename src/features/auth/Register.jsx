import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from '../../firebase/firebase.config';
import { useNavigate, Link } from "react-router";
import { toast } from "react-hot-toast"; // ✅ using working toast

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
      .then((userCredential) => {
        console.log("✅ User registered:", userCredential.user);
        return updateProfile(userCredential.user, { displayName: name });
      })
      .then(() => {
        toast.success("🎉 Registration successful!");
        navigate("/");
      })
      .catch((err) => {
        console.error("❌ Register error:", err.code);
        if (err.code.includes("weak-password")) {
          toast.error("🛡️ Password is too weak!");
        } else if (err.code.includes("email-already-in-use")) {
          toast.error("📧 Email already in use. Try logging in.");
        } else {
          toast.error("⚠️ Registration failed. Try again.");
        }
      });
  };

  const handleGoogleRegister = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log("✅ Google register:", res.user);
        toast.success("🎯 Google registration successful!");
        navigate("/");
      })
      .catch((err) => {
        console.error("❌ Google register error:", err.message);
        toast.error("⚠️ Google registration failed");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4 font-bold text-center">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("name", { required: true })} type="text" placeholder="Full Name" className="input input-bordered w-full" />
        <input {...register("email", { required: true })} type="email" placeholder="Email" className="input input-bordered w-full" />
        <input {...register("password", { required: true })} type="password" placeholder="Password (min 6 characters)" className="input input-bordered w-full" />
        <button type="submit" className="btn bg-black text-white w-full">Register</button>
      </form>
      <button onClick={handleGoogleRegister} className="btn btn-outline w-full mt-4">Register with Google</button>
      <p className="mt-4 text-center">
        Already have an account? <Link to="/join-us" className="text-blue-600 underline">Login</Link>
      </p>
    </div>
  );
};

export default Register;

