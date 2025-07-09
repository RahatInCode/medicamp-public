import { useState } from "react"
import { auth, googleProvider } from "../../firebase/firebase.config"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useNavigate, Link } from "react-router"
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (err) {
      setError(err.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      navigate("/")
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6 gap-2">
          <div className="bg-black text-white font-bold text-xl w-10 h-10 flex items-center justify-center rounded-full">
            M
          </div>
          <h2 className="text-2xl font-extrabold text-zinc-800 tracking-tight">MediCamp Sign In</h2>
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSignIn} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700">Email</label>
            <div className="flex items-center border rounded px-3">
              <Mail className="text-gray-400 mr-2" size={18} />
              <input
                type="email"
                className="w-full py-2 outline-none text-zinc-800"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700">Password</label>
            <div className="flex items-center border rounded px-3">
              <Lock className="text-gray-400 mr-2" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full py-2 outline-none text-zinc-800"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-500 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-zinc-800 text-white font-semibold py-2 rounded transition"
          >
            <LogIn className="inline mr-1" size={18} /> Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="mt-4 w-full flex items-center justify-center border border-zinc-300 py-2 rounded hover:bg-gray-50 transition"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
            className="w-5 h-5 mr-2"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            }}
          />
          Continue with Google
        </button>

        <div className="mt-6 text-center text-sm">
          Not a member?{" "}
          <Link to="/register" className="text-black font-medium hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

