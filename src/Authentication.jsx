import React, { createContext, useEffect, useState,useContext } from "react";
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
  const [mixedArr, setMixedArr] = useState([]);
  const [value, setValue] = React.useState(0);
  const [currPost, setCurrPost] = useState(null);
  const [isFeed, setIsFeed] = React.useState(true);
  const url = "https://enigmatic-island-35216.herokuapp.com";
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);


  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);

  };

  const handleChange = (event, newValue) => {
    // console.log(newValue);
    if(newValue===0) setIsFeed(true);
    setValue(newValue);
  };

  const getAllTags = () => {
    axios.get(`${url}/posts/getAllTags/`).then(
      res=>{
        // console.log(res.data);
        setMixedArr(res.data);
      }
    ).catch((err) => {
      console.log(err);
    })
  }

  const checkUser = (user) => {
    if (user !== null)
      axios.post(`${url}/users/addUser`, {
        email: user.email,
        username: user.displayName
      });
  }

  const getPosts = async () => {
    await axios.get(`${url}/posts/getAllPosts`).then(res => {
      // console.log(res.data);
      setPosts(res.data);
    }).catch(err => {
      console.log(err);
    })
  }

  const logOut = async () => {
    await signOut(auth);
  };

  function filter(query) {
    return posts.filter(item => item.message.toLowerCase().includes(query.toLowerCase()));
  }

  const setCurr = (id)=>{

  }

  const searchFeed = async () => {
    const searchF = document.getElementById("search");
    if (searchF.value !== "" || searchF.value !== " ") {
      // console.log("searching");
      const tt =
        setPosts(filter(searchF.value));
    }
    else { getPosts(); }

  }

  const getPost = (id) => {
    // con
    if(user === null) { return;}

    for (var i = 0; i < posts.length; i++) {
      if (posts[i].postId == id) {
        let temp = { post: posts[i] };
        temp.url = url;
        // temp.handleIsfeed = func;
        temp.userEmail = user.email;
        temp.index = i;
        return temp;
      };
    }
  }

  const getPackage = () => {

  }

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, async (currUser) => {
      setUser(currUser);
      checkUser(currUser);
      getPosts();
      getAllTags();
      // console.log(currUser);
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
        setPosts,
        getPost,
        getPackage,
        searchFeed,
        value, setValue, isFeed, setIsFeed, handleChange,mixedArr,currPost, setCurrPost
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
