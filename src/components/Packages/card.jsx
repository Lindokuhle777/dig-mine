import { Favorite } from "@mui/icons-material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Paper } from "@mui/material";
import React, {useState} from "react";
import image from '../assets/mine.jpeg';

const Card = () => {

    const [like, setLike] = useState(false);
    const [likeCounter, setLikeCounter] = useState(23);

    const onLike = ()=>{
        if(!like){
            setLikeCounter(likeCounter + 1);
        }else{
            setLikeCounter(likeCounter - 1);
        }
        setLike(!like);
    }

    return (
        <Paper style = {styles.Main} elevation = {6}>
            <img src= {image} alt="Icon" width={260} height = {150} style = {{borderTopLeftRadius: 15, borderTopRightRadius: 15}}/>
            <div style = {styles.Content}>
            <p style = {{margin: 0, color: 'white'}}>Title</p>
            <p style = {{margin: 0, color: 'white', fontSize: 10, marginTop: 2}}>Last updated 12/06/2022</p>

            <div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 5, justifyContent: 'space-between'}}>
            
            <div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center',}}>
            {like ? 
             <Favorite style = {{color:"#f4c870"}} onClick = {()=> onLike()}/>
            :
            <FavoriteBorderIcon  style = {{color:"#f4c870"}} onClick = {()=> onLike()}/>
            }
            <p style = {{margin: 0, color: '#f4c870', marginLeft: 5}}>{likeCounter}</p>
            </div>
            

            <p style = {{margin: 0, padding: 5, borderRadius: 12, borderWidth: 1, borderStyle: 'solid', color: 'white', fontSize: 10,}}>FREE</p>
            </div>
            
            </div>
        </Paper>
    );
}

const styles = {
    Main:{
        display: 'flex',
        flexDirection: 'column',
        background: '#21282f',
        borderRadius: 15,
        minWidth: 260,
        width: 260
    },
    Content:{
        display: 'flex',
        flexDirection: 'column',
        padding: 12
    }
}

export default Card;
