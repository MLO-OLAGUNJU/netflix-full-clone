import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export const AuthContext = createContext(); // Define AuthContext

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User created successfully, now set user data in Firestore
        setDoc(doc(db, "users", email), {
          savedShows: [],
        });
      })
      .catch((error) => {
        // Handle any errors during user creation
        console.error("Error signing up:", error);
      });
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("Current user:", currentUser); // Log the current user
    });
    return () => {
      unSubscribe();
    };
  }, []);
  
  return (
    <AuthContext.Provider value={{ signUp, user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
