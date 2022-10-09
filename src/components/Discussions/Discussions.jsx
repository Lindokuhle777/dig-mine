import { Paper, Typography, IconButton, Divider, Fab, TextField } from '@mui/material';
import { LoremIpsum } from 'react-lorem-ipsum';
import React, { useState, useEffect, useContext } from 'react';
import { alpha, styled } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Favorite } from "@mui/icons-material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FeedCard from '../Feed/FeedCard'
import Replies from './Replies';
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SendIcon from '@mui/icons-material/Send';
import { AuthContext } from "../../Authentication";
import { getAdditionalUserInfo } from 'firebase/auth';


const CssTextField = styled(TextField)({
	'& label.Mui-focused': {
		color: "#f4c870",
	},
	'& .MuiInput-underline:after': {
		borderBottomColor: "#f4c870",
	},
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: "#f4c870",
		},
		'&:hover fieldset': {
			borderColor: "#f4c870",
		},
		'&.Mui-focused fieldset': {
			borderColor: "#f4c870",
		},
	},
});

function Discussions({ post }) {

	const { url, user } = useContext(AuthContext);
	const [replies, setReplies] = useState([]);

	const getData = async () => {
		await axios.post(`${url}/posts/getPostReplies`, { postId: post.postId }).then(res => {
			setReplies(res.data);

		}).catch(err =>
			console.log(err));
	}

	const handleIsfeed = () => {

	}

	const reply = () => {
		const message = document.getElementById("reply").value;

		const data = {
			reply: message,
			email: user.email,
			postId: post.postId,
			username: user.displayName
		}
		axios.post(`${url}/posts/addReply`, data).then(res => {
			// console.log(res.data);
			document.getElementById("reply").value = "";
		}).catch(err => {

		});
		getData();
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<div>


			<FeedCard post={post} userEmail={user?.email} url={url} handleIsfeed={handleIsfeed} />


			<div style={{ display: 'flex', flexDirection: 'row' }}><CssTextField
				id="reply"
				fullWidth
				rows={3}
				multiline
				placeholder="Comment"
				style={{ marginBottom: '10px', }}
			/>

				<IconButton style={{ position: "relative", bottom: 0 }} onClick={reply}>
					<SendIcon />
				</IconButton>

			</div>





			<Typography gutterBottom variant="h4">Replies</Typography>
			{
				replies.map((item, index) => <div key={item.time}>
					<Replies post={item} replies={replies} setReplies={setReplies} />
					<Divider style={{ margin: "10px auto" }} />

				</div>)
			}

		</div>
	)
}

export default Discussions