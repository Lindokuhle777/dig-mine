import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const url = "http://localhost:5000";
  const [user, setUser] = useState(null);
  const [posts,setPosts] = useState([]);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);

  };

  const checkUser = (user)=>{
    if(user!== null)
    axios.post(`${url}/users/addUser`,{
      email:user.email,
      username:user.displayName
    });
  }

  const getPosts = async () => {
    await axios.get(`${url}/posts/getAllPosts`).then(res=>{
      console.log(res.data);
      setPosts(res.data);
    }).catch(err=>{
      console.log(err);
    })
  }

  const logOut = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, async (currUser) => {
      setUser(currUser);
      checkUser(currUser);
      getPosts();
      console.log(currUser);
    });
    return () => {
      subscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        googleSignIn,
        user,
        logOut,
        url,
        posts,
        getPosts,
        setPosts
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
