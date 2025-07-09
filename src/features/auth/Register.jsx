// File: /pages/Register.jsx
import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase/firebase.config'
import { useNavigate } from 'react-router'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) return alert('Passwords do not match')
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password)
      await updateProfile(userCredential.user, { displayName: form.name })
      navigate('/')
    } catch (err) {
      alert(err.message)
    }
  }

  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      navigate('/')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md shadow">
        <h2 className="text-2xl font-bold mb-2 text-center">Create Account</h2>
        <p className="text-center text-gray-500 mb-4">Join our community and access quality healthcare</p>
        <form onSubmit={handleRegister} className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Enter your full name" required />
          <input name="email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" type="email" placeholder="Enter your email" required />
          <input name="password" value={form.password} onChange={handleChange} className="w-full p-2 border rounded" type="password" placeholder="Create a password" required />
          <input name="confirm" value={form.confirm} onChange={handleChange} className="w-full p-2 border rounded" type="password" placeholder="Confirm your password" required />
          <button type="submit" className="bg-black text-white w-full py-2 rounded">Create Account</button>
        </form>
        <div className="text-center my-4 text-gray-400">OR CONTINUE WITH</div>
        <button onClick={handleGoogle} className="w-full py-2 border rounded flex justify-center items-center gap-2">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" /> Continue with Google
        </button>
        <p className="mt-4 text-sm text-center">Already have an account? <a href="/join-us" className="text-blue-600">Sign in</a></p>
      </div>
    </div>
  )
}
