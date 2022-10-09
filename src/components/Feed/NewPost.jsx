import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import {DialogContent,styled,TextField} from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

  const btnStyle = {
    background: '#21282f', color: "white", border: "1px solid #f4c870", marginRight: "10px"
}

export default function NewPost({open, handleClose,handlePost}) {
 

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{backgroundColor:"#21282f",color:"white"}}>{"New Post"}</DialogTitle>
        <DialogContent style={{backgroundColor:"#21282f"}}>
        <CssTextField
            id="post"
            fullWidth
            rows={3}
            multiline
            placeholder="New post"
            style={{ color:"white" }}
            />
        </DialogContent>
        <DialogActions style={{backgroundColor:"#21282f"}}>
          <Button style={{...btnStyle}} onClick={handlePost}>Post</Button>
          <Button style={{...btnStyle}} onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
