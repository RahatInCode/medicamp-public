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
    setUser(currentUser);
    if (currentUser) {
      const idToken = await currentUser.getIdToken();
      localStorage.setItem("token", idToken); 
      setToken(idToken);

      await fetch("http://localhost:3000/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          name: currentUser.displayName,
          email: currentUser.email,
        }),
      });
    } else {
      localStorage.removeItem("token"); 
      setToken(null);
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


