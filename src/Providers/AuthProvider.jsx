import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "./AuthContext.jsx";
import app from "../Firebase/firebase.config.js";
import api from "../Utility/axios.js";
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const existingUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logoutUser = () => {
    return signOut(auth);
  };

  const deleteAccount = () => {
    return deleteUser(auth.currentUser);
  };
  const updateUserData = async (updateData) => {
    if (!auth.currentUser) {
      throw new Error("User not logged in");
    }
    await updateProfile(auth.currentUser, updateData);
    await auth.currentUser.reload();
    return auth.currentUser;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api
        .get("/api/user/me")
        .then((res) => {
          const userData = res.data.user;
          setUser(userData);
        })
        .catch((err) => {
          console.log("error", err);
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      setLoading(false);
      return () => unsubscribe();
    }
  }, [localStorage.getItem("token")]);

  const authData = {
    user,
    setUser,
    createUser,
    existingUser,
    logoutUser,
    loading,
    setLoading,
    googleSignIn,
    updateUserData,
    deleteAccount,
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
