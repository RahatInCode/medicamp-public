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
        console.log("✅ User registered:", user);

        await updateProfile(user, { displayName: name });

        // Get Firebase JWT
        const token = await user.getIdToken();
        console.log("🔐 JWT Token:", token);

        // Optional: send to backend
        // await axiosSecure.post('/auth/register', { email, name }, {
        //   headers: { Authorization: `Bearer ${token}` }
        // });

        localStorage.setItem("token", token);

        toast.success("🎉 Registration successful!");
        navigate("/");
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
        console.log("✅ Google register:", user);

        const token = await user.getIdToken();
        console.log("🔐 Google JWT Token:", token);

        // Optional: send to backend
        // await axiosSecure.post('/auth/google-register', { email: user.email }, {
        //   headers: { Authorization: `Bearer ${token}` }
        // });

        localStorage.setItem("token", token);
        toast.success("🎯 Google registration successful!");
        navigate("/");
      })
      .catch((err) => {
        console.error("❌ Google registration error:", err.message);
        toast.error("⚠️ Google registration failed: " + err.message);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4 font-bold text-center">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="Full Name"
          className="input input-bordered w-full"
        />
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
        />
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password (min 6 characters)"
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn bg-black text-white w-full">
          Register
        </button>
      </form>
      <button
        onClick={handleGoogleRegister}
        className="btn btn-outline w-full mt-4"
      >
        Register with Google
      </button>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/join-us" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;



