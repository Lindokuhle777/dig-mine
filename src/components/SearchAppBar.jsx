import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { TextField,InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CssTextField from './CsstextField';

export default function MenuAppBar() {

//   "#787a7c"

  return (
  
      <AppBar position="sticky" style={{backgroundColor:"#404755"}} elevation={0}>
        <Toolbar>
          
          <CssTextField
          fullWidth
          style={{margin:"10px 20px",backgroundColor:"#787a7c",color:"#fff"}}
          placeholder="Search"

          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          />
          
        </Toolbar>
      </AppBar>
  );
}
