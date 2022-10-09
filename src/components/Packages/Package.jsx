import React, { useEffect, useState } from 'react';
import Card from './Card';
import Button from '@mui/material/Button';
import ViewPackage from './ViewPackage';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from "../../Authentication";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Package() {

  const {user} = useContext(AuthContext);
  const [packages, setPackages] = useState([]);
  const [intel, setIntel] = useState({});
 
  useEffect(()=>{
    const getList =async()=>{
      await axios.get('https://enigmatic-island-35216.herokuapp.com/packages/getPackages/')
      .then((response)=>{
        setPackages(response.data);
      });
    };

    getList();
  }, []);

  const [isView, setIsView] = useState(false);
  const [open, setOpen] = React.useState(false);

  // vars
  const [packageT, setPackageT] = useState('');
  const [des, setDes] = useState('');
  const [mineName, setMineName] = useState('');
  const [prod, setProd] = useState('');
  const [town, setTown] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [elev, setElev] = useState('');
  const [water, setWater] = useState('');
  const [air, setAir] = useState('');

  // holes
  const [id, setID] = useState('');
  const [type, setType] = useState('');
  const [essay, setEssay] = useState('');
  const [depth, setDepth] = useState('');

  // array
  let boreHoles = [];


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseC = () => {
    setOpen(false);
    // submit to rest...
    axios.post('https://enigmatic-island-35216.herokuapp.com/packages/addPackage/', {
        mineName: mineName,
        title: packageT,
        likes: 0,
        nearestTown: town,
        status: 'Operational',
        coordinateX: lat,
        coordinateY: long,
        elavation: elev,
        waterQuality: water,
        airQuality: air,
        production: prod,
        boreHoles: boreHoles,
        username: user.displayName,
        email: user.email,
    });

    setAir('');
    setDepth('');
    setDes('');
    setElev('');
    setMineName('');
    setLong('');
    setProd('');
    setWater('');
    setLat('');
    setPackageT('');
  };

  const [openB, setOpenB] = React.useState(false);

  const handleClickOpenB = () => {
    setOpenB(true);
  };

  const handleCloseB = () => {
    setOpenB(false);
  };

  const handleCloseBB = () => {
    setOpenB(false);
    let obj = {id: id, depth: depth, type: type, essay: essay};
    boreHoles.push(obj);
    setEssay('');
    setID('');
    setDepth('');
    setType('');
    console.log(obj);
  };


  return (
    <div style = {styles.Main}>
      {!isView ?
        <div>
        <p style = {{margin: 0, fontSize: 28, color: 'white'}}>Packages</p>
        <p style = {{margin: 0, fontSize: 15, color: 'white'}}>Explore, analyze, and share quality data.</p>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        {packages.map((item, index)=>
            <Card
            key={index}
            data = {item}
            setView = {setIsView}
            setIntel = {setIntel}
            />
          )}
        </div>
        
          {packages.length == 0 &&
            <div style = {{alignSelf: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
               <CircularProgress />
            </div>
          }
        </div>
        :
        <ViewPackage intel = {intel}/>
      }
      <div style = {styles.FAB}>
      <Fab variant="extended" size="medium" aria-label="add" onClick={handleClickOpen} style = {{background: '#f4c870'}}>
        <AddIcon sx={{ mr: 1 }} />
        Add Package
      </Fab>
      </div>

      <div>
    
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{position: 'relative'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
           
            <Button autoFocus color="inherit" onClick={handleCloseC}>
            SAVE
            </Button>
          </Toolbar>
        </AppBar>
        
        <div style = {{display: 'flex', flexDirection: 'column', alignSelf: 'center', 'width': '60%'}}>
        <p style = {{fontWeight: '600'}}>Package Title</p>
        <TextField variant="standard" fullWidth value={packageT} onChange = {(e)=> setPackageT(e.target.value)}/>
        <p style = {{fontWeight: '600'}}>Description</p>
        <TextField variant="standard" multiline value={des} onChange = {(e)=> setDes(e.target.value)}/>
        <p style = {{fontWeight: '600'}}>Mine Name</p>
        <TextField variant="standard" value={mineName} onChange = {(e)=> setMineName(e.target.value)}/>
        <p style = {{fontWeight: '600'}}>Production</p>
        <TextField variant="standard" value={prod} onChange = {(e)=> setProd(e.target.value)}/>
        <p style = {{fontWeight: '600'}}>Nearest Town</p>
        <TextField variant="standard" value={town} onChange = {(e)=> setTown(e.target.value)}/>
        <p style = {{fontWeight: '600'}}>Latitude</p>
        <TextField variant="standard" value={lat} onChange = {(e)=> setLat(e.target.value)}/>
        <p style = {{fontWeight: '600'}}>Longitude</p>
        <TextField variant="standard" value={long} onChange = {(e)=> setLong(e.target.value)}/>
        <p style = {{fontWeight: '600'}}>Elevation</p>
        <TextField variant="standard" value={elev} onChange = {(e)=> setElev(e.target.value)}/>
        <p style = {{fontWeight: '600'}}>Water Quality</p>
        <TextField variant="standard" value={water} onChange = {(e)=> setWater(e.target.value)}/>
        <p style = {{fontWeight: '600'}}>Air Quality</p>
        <TextField variant="standard" value={air} onChange = {(e)=> setAir(e.target.value)}/>

        <div style = {styles.FAB}>
        <Fab variant="extended" size="medium" aria-label="add" onClick = {()=> handleClickOpenB()} style = {{background: '#f4c870'}}>
        <AddIcon sx={{ mr: 1 }} />
        Add BoreHole
      </Fab>
      </div>

      <Dialog open={openB} onClose={handleCloseB} fullWidth>
        <DialogTitle>Add Bore Hole</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={id}
            onChange = {(e)=> setID(e.target.value)}
            margin="dense"
            label="ID"
            fullWidth
            variant="standard"
          /> 
          <TextField variant='standard' label='Type' fullWidth value={type} onChange = {(e)=> setType(e.target.value)}/>
          <TextField variant='standard' label='Chemisty Essay' fullWidth value ={essay} onChange = {(e)=> setEssay(e.target.value)}/>
          <TextField variant='standard' label='Depth' fullWidth value = {depth} onChange = {(e)=> setDepth(e.target.value)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseB}>Cancel</Button>
          <Button onClick={handleCloseBB}>Done</Button>
        </DialogActions>
      </Dialog>

      </div>
      </Dialog>
    </div>
    </div>
  )
}

const styles = {
  Main:{
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 50
  },
  FAB:{
    position: 'absolute',
    right: 20,
    bottom: 20
  }
}


export default Package