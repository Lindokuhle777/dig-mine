import React, {useState} from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const ShowBoreHole = (props)=>{
    return(
        <div>
            <p style = {{margin: 0, color: 'white'}}>ID: {props.id}</p>
            <p style = {{margin: 0, color: 'white'}}>Type: {props.type}</p>
            <p style = {{margin: 0, color: 'white'}}>Depth: {props.depth}</p>
            <p style = {{margin: 0, color: 'white'}}>Essay: {props.essay}</p>
        </div>
    );
}


function ViewPackage({intel}) {
    let source = "https://embed.waze.com/iframe?zoom=14&lat=" + intel.coordinateX + "&lon=" + intel.coordinateY + "&ct=livemap";
    const [value, setValue] = useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
  return (
    <div style = {styles.Main}>
        <div style = {styles.Top}>
        <p style = {{margin: 0, color: 'white', fontSize: 25}}>{intel.title}</p>
        <div style={styles.DownloadBtn}>
            <DownloadIcon sx = {{color: 'white'}}/>
            <p style = {{margin:0, color: 'white', fontWeight: 'w800'}}>Download</p>
        </div>
        </div>
        
        <p style = {{margin: 0, color: 'white'}}>Summary about the package</p>

        <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Infomation" value="1" />
            <Tab label="Discussion" value="2" />
            <Tab label="Visuals" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <p style = {{margin: 0, color: 'white'}}>Mine Name: {intel.mineName}</p>
            <p style = {{margin: 0, color: 'white'}}>Status: {intel.status}</p>
            <p style = {{margin: 0, color: 'white'}}>Production: {intel.production}</p>
            <p style = {{margin: 0, color: 'white'}}>Nearest Town: {intel.nearestTown}</p>
            <p style = {{margin: 0, color: 'white'}}>Geographical Coordinates</p>
            <p style = {{margin: 0, color: 'white'}}>{intel.coordinateX}</p>
            <p style = {{margin: 0, color: 'white'}}>{intel.coordinateY}</p>
            <p style = {{margin: 0, color: 'white'}}>Elevation: {intel.elavation}</p>

            <p style= {{margin: 0, fontWeight: 'bold', fontSize:18, color: 'white'}}>Bore Holes</p>
            {intel.boreHoles.map((item, index)=>
                <ShowBoreHole 
                id = {item.id}
                depth = {item.depth}
                type= {item.type}
                essay =  {item.essay}
                key = {index}
                />
            )}
            
        </TabPanel>
        <TabPanel value="2"></TabPanel>
        <TabPanel value="3">
        <iframe 
        src= {source}
        width="100%" height="450" allowfullscreen>
        </iframe>
        </TabPanel>
      </TabContext>
        
    </div>
  );
}

const styles = {
    Main:{
        paddingLeft: 50,
        paddingRight: 50
    },
    Top:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center'
    },
    DownloadBtn:{
        display: 'flex',
        flexDirection: 'row',
        background: '#21282f',
        borderRadius: 20,
        padding: 12
    }
}

export default ViewPackage