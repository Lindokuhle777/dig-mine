import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Feed from '../Feed/Feed';
import Package from '../Packages/Package';
import { Toolbar, AppBar, Button, Divider } from '@mui/material';
import SearchAppBar from '../SearchAppBar';
import Tags from '../Tags/Tags';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ position: 'absolute', left: "20%", backgroundColor: '#404755', height: "100vh",width: "80%"}}>
          <div>
            <SearchAppBar/>
            {children}
          </div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
    >
      <div style={{ position: 'fixed', margin: 0, left: 0, width: "19.9%", backgroundColor: '#404755', height: "100vh"}}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Typography variant='h4' style={{color:"#f4c870"}}>Mining Exchange</Typography>
        </div>

        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          style={{ position: 'absolute', margin: 0, left: 0, width: "100%", height: "100vh" }}
        >
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="Packages" {...a11yProps(1)} />
          <Tab label="Tags" {...a11yProps(2)} />
        </Tabs>
        
        
      </div>
        

      <TabPanel value={value} index={0}>
        <Feed />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Package />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Tags/>
      </TabPanel>

    </div>
  );
}
