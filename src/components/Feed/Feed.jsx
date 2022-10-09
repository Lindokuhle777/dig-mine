import { Fab, TextField, styled } from '@mui/material';
import React, { useEffect, useState, useContext } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Discussions from '../Discussions/Discussions'
import FeedCard from './FeedCard';
import NewPost from './NewPost';
import axios from "axios";
import { AuthContext } from "../../Authentication";


function Feed({isFeed,setIsFeed}) {
  const [open, setOpen] = React.useState(false);
  const { url, user, getPosts, posts } = useContext(AuthContext);
  
  const [currPost, setCurrPost] = useState(null);

  useEffect(() => {
    // getPosts();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getTags = (post) => {

    //TODO: Needs more work
    let tags = [];

    let arr = post.split(" ");

    arr.map(item => {
      if (item[0] == "#") {
        tags.push(item);
      }
    });

    return tags;

  }

  const handleIsfeed = (postIndex) => {
    // console.log(posts[postIndex])
    setCurrPost(posts[postIndex]);
    setIsFeed(false);
  }

  const handlePost = async () => {
    const post = document.getElementById('post').value;
    const data = {
      email: user.email,
      post: post,
      tags: getTags(post),
      username: user.displayName
    }

    console.log(data);

    await axios.post(`${url}/posts/addPost`, data).then(res => {
      console.log(res?.data);
    }).catch(err => {
      console.log(err);
    });

    handleClose();

  }

  return (
    <div style={{ padding: "2%", display: "grid", gridTemplateColumns: "auto", gridGap: "5px" }}>
      {
        isFeed &&
        <>
          {
            posts.map((item, index) => <FeedCard key={item.postId} post={item} userEmail={user?.email} url={url} handleIsfeed={handleIsfeed} index={index} />)
          }
        </>
      }

      {
        !isFeed && <Discussions post={currPost} />
      }
      {/* <Discussions/> */}
      {isFeed && <Fab style={{ position: 'fixed', right: "20px", bottom: "20px", backgroundColor: "#f4c870" }} onClick={handleClickOpen}>
        <AddIcon />
      </Fab>}

      <NewPost open={open} handleClose={handleClose} handlePost={handlePost} />
    </div>
  )
}

export default Feed