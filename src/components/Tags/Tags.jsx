import React,{useState} from 'react';
import {Typography} from "@mui/material";

const tagStyle = {

}

function Tags() {
  const [tags,setTags] = useState(["#One","#Two","#Three","#Four","#Five","#Six"]);
  return (
    <div style={{textAlign: 'center'}}>
      <Typography variant="h3" style={{color: 'white', margin:"10px 0"}}> Popular </Typography>

      {
        tags.map(tag => {return (<div style={tagStyle}>{tag}</div>)})
      }
        
    </div>
  )
}

export default Tags