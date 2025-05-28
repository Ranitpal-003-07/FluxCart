/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-useless-catch */
import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      await currentUser.reload();
      setUser({ ...auth.currentUser });
    } else {
      setUser(null);
    }
    setLoading(false);
  });
  return () => unsubscribe();
  }, []);



  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

 const updateUserProfile = async (updates) => {
  try {
    await auth.currentUser?.reload(); 
    const currentUser = auth.currentUser; 

    if (!currentUser) throw new Error('No authenticated user');

    const profileUpdates = {};
    if (updates.displayName) profileUpdates.displayName = updates.displayName;
    if (updates.photoURL) profileUpdates.photoURL = updates.photoURL;

    if (Object.keys(profileUpdates).length) {
      await updateProfile(currentUser, profileUpdates);
    }

    if (updates.email) {
      throw new Error('Changing email requires re-authentication');
    }

    if (updates.password) {
      throw new Error('Changing password requires re-authentication');
    }

    setUser({ ...auth.currentUser });

    return true;
  } catch (error) {
    console.error("Error updating profile:", error.message);
    throw error;
  }
};


  const value = {
    user,
    signup,
    login,
    logout,
    googleSignIn,
    loading,
    updateUserProfile,
    currentUser: auth.currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
