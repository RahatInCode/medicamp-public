import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setLoading(true);

    if (currentUser) {
      try {
        // Step 1️⃣: Save user first — no auth needed
        await fetch("https://medicamp-server-five.vercel.app/users/public", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: currentUser.displayName,
            email: currentUser.email,
          }),
        });

        // Step 2️⃣: Get fresh token
        const token = await currentUser.getIdToken(true);

        localStorage.setItem("token", token);
        setToken(token);
        setUser(currentUser);
      } catch (err) {
        console.error("Auth error:", err.message);
      }
    } else {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    }

    setLoading(false);
  });

  return () => unsubscribe();
}, []);


  return (
    <AuthContext.Provider value={{ user, token, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;






