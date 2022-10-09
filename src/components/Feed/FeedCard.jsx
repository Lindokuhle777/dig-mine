import { Paper, Typography, IconButton, Divider } from '@mui/material';
import { LoremIpsum } from 'react-lorem-ipsum';
import React, { useState, useEffect, useContext } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Favorite } from "@mui/icons-material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AuthContext } from "../../Authentication";
import axios from 'axios';

const paperSty = {
    backgroundColor: "#595c6c",
    padding: "10px",
    marginBottom: "20px",
}

function FeedCard({ post, userEmail, handleIsfeed, index }) {

    const [like, setLike] = useState(false);
    const [numLikes, setNumLikes] = useState(0);
    const { setPosts, posts,url } = useContext(AuthContext);

    useEffect(() => {
        if (post.likes?.includes(userEmail)) {
            setLike(true);
            // post.likes === undefined ? setNumLikes(0) : post.likes.length;
            setNumLikes(post.likes === undefined ? setNumLikes(0) : post.likes.length);
        }
    }, []);

    const handleLike = () => {
        // console.log({ postId: post.postId, likerId: userEmail });
        // likerId, postId
        axios.post(`${url}/posts/like`, { postId: post.postId, likerId: userEmail });
        if (like) {
            setNumLikes(numLikes - 1);
            setLike(false);

            let temp = [];

            posts.map(item => {
                if (item.postId === post.postId) {

                    let arr = item.likes.filter(item => item !== userEmail);

                    item = { ...item, likes: arr }

                    temp.push(item);
                } else {
                    temp.push(item);
                }
            });
            console.log(temp)
            setPosts(temp);

        } else {
            setNumLikes(numLikes + 1);
            setLike(true);

            let temp = [];

            posts.map(item => {
                if (item.postId === post.postId) {
                    if (item.likes === undefined) {
                        item = { ...item, likes: [userEmail] }
                    } else {
                        item = { ...item, likes: [...item.likes, userEmail] }
                    }
                    temp.push(item);
                } else {
                    temp.push(item);
                }
            });
            console.log(temp);
            setPosts(temp);
        }



    }

    return (
        <Paper style={paperSty} elevation={10} >
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: "5px" }} onClick={(event) => { event.preventDefault(); handleIsfeed(index); }}>
                <IconButton >
                    <AccountCircleIcon style={{ color: 'white' }} size="large" />
                </IconButton>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h5' style={{ color: 'white' }}>{post.username}</Typography>
                    <Typography variant='subtitle' >{post.time}</Typography>
                </div>

            </div>
            <Divider />
            <Typography variant='body1' style={{ color: 'white' }}>
                {/* <LoremIpsum p={1} /> */}
                {post.message}
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'row' }}>{like ?
                <Favorite style={{ color: "#f4c870" }} onClick={handleLike} />
                :
                <FavoriteBorderIcon style={{ color: "#f4c870" }} onClick={handleLike} />
            }
                <Typography style={{ color: "#f4c870" }} > {numLikes} </Typography>
            </div>

        </Paper>
    )
}

export default FeedCard