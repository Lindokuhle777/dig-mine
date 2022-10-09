import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { TextField, InputAdornment, Button, IconButton, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CssTextField from './CsstextField';
import { AuthContext } from '../Authentication';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const btnStyle = {
    background: '#21282f', color: "white", border: "0px solid black", marginRight: "10px"
}

export default function MenuAppBar() {

    const { user, googleSignIn, logOut, searchFeed, getPosts, isFeed, setIsFeed } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        logOut();
    };

    const onChange = (event) => {
        searchFeed();
        // console.log(event.target.value);
        if (event.target.value === ' ' || event.target.value === "") {
            getPosts();
        }

    }



    return (

        <AppBar position="sticky" style={{ backgroundColor: '#21282f' }} >
            <Toolbar>

                {
                    !isFeed && <IconButton onClick={() => { setIsFeed(true) }}>
                        <ArrowBackIosIcon style={{ color: "white" }} />
                    </IconButton>
                }



                <CssTextField
                    size="small"
                    id="search"
                    onChange={onChange}
                    style={{ margin: "10px 20px", backgroundColor: "#787a7c", color: "#fff" }}
                    placeholder="Search"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <div style={{ position: "absolute", right: "10px", }}>

                    {
                        user === null &&
                        <>
                            <Button size="small" style={btnStyle} onClick={googleSignIn}>Login</Button>

                        </>
                    }

                    {
                        user !== null && <><IconButton id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>
                            <AccountCircleIcon style={{ color: 'white' }} />
                        </IconButton>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose}>Log out</MenuItem>
                            </Menu></>

                    }

                </div>

            </Toolbar>
        </AppBar>
    );
}
