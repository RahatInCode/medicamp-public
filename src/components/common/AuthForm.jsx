import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "../../features/auth/SignIn";
import RegisterForm from "../../features/auth/Register";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin((prev) => !prev);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <motion.div
        className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-gray-800"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-white text-2xl font-semibold text-center mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "register"}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
          >
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 px-4 py-2 rounded-xl transition-all font-medium ${
              isLogin ? "bg-white text-gray-900" : "bg-gray-700 text-white"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 px-4 py-2 rounded-xl transition-all font-medium ${
              !isLogin ? "bg-white text-gray-900" : "bg-gray-700 text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <button
                className="text-blue-400 hover:underline"
                onClick={toggleForm}
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                className="text-blue-400 hover:underline"
                onClick={toggleForm}
              >
                Sign In
              </button>
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
}