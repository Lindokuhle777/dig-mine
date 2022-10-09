import React, { useState, useContext } from 'react';
import { Typography, Button } from "@mui/material";
import FeedCard from '../Feed/FeedCard';
import Card from '../Packages/Card';
import { AuthContext } from "../../Authentication";

const tagStyle = {
  border: "3px solid #f4c870",
  borderRadius: "30px",
  display: 'inline-block',
  margin: "5px 5px",
  color: "white"
}

const cardsSty = {
  padding: "2%",
}

function Tags() {
  // const [tags, setTags] = useState(["#One", "#Two", "#Three", "#Four", "#Five", "#Six"]);
  const { getPost, getPackage, mixedArr, setValue, setIsFeed, setCurr, posts, setPosts, setCurrPost } = useContext(AuthContext);
  const handleIsFeed = (index) => {
    setCurrPost(posts[index]);
    setValue(0);
    setIsFeed(false);

  }
  return (
    <div >
      <Typography variant="h3" style={{ color: 'white', margin: "10px 0", textAlign: 'center' }}> Popular </Typography>
      <div style={{ textAlign: 'center' }}>{
        mixedArr.map((tag, i) => { return (<Button style={tagStyle} key={i * 8}>{tag.tag}</Button>) })
      }</div>


      <div style={cardsSty}>
        {
          mixedArr.map((item, index) => {
            if (item.type === "post") {
              const curr = getPost(item.id);
              return <FeedCard key={index} userEmail={curr.userEmail} post={curr.post} index={curr.index} handleIsfeed={handleIsFeed} />
            } else {
              const curr = getPackage(item.id);
              <Card key={index} package={curr} />
            }
          })
        }
      </div>

    </div>
  )
}

export default Tags