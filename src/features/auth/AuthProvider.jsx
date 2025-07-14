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
      const token = await currentUser.getIdToken(); // 🧠 just fetch, no refresh yet

      // Hit your backend to sync and trigger custom claim
      await fetch("http://localhost:3000/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: currentUser.displayName,
          email: currentUser.email,
        }),
      });

      // 🔁 Wait a few seconds for Firebase to update the claim (important!)
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // 🔥 Now force refresh the token
      const updatedToken = await currentUser.getIdToken(true);
      localStorage.setItem("token", updatedToken);
      setToken(updatedToken);
      setUser(currentUser);
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




