import React from 'react'
import { AppBar, Box, Button, IconButton, InputAdornment, Stack, TextField, Toolbar, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import Login from './Login';
import { auth } from '../firebase';
import '../App.css';

const Header = () => {

    const navigate = useNavigate();
    const boxSX = {
        // border: "1px solid #9c27b0",
        // border: "2px solid purple",
        borderRadius: '5%',
        padding: '5px',
        "&:hover": {
            border: "1px solid Lightgray",
            // backgroundColor:'#EDC24C',
            borderRadius: "3px"
        },
    };

    const [{ basket, open, user }, dispatch] = useStateValue();

    const handleOpen = () => {
        dispatch({
            type: 'OPENLOGINDIALOG'
        });
    }
    const handleClose = () => {
        dispatch({
            type: 'CLOSELOGINDIALOG',
        })
    }

    const handleAuthentication = () => {
        if(user) {
            auth.signOut()
        }
    }
    // const matches = useMediaQuery('(max-width:600px)');

    const handleOrders = () => {
        if(user) {
            navigate('/orders')
        } else {
            dispatch({
                type: 'OPENLOGINDIALOG'
            });
        }
    }


    return (
        <>
            <AppBar color='secondary' position='fixed'>
                <Toolbar>
                    <Typography variant='h5' ml={5} mr={5} sx={{cursor:'pointer', color:'white'}} onClick={() => navigate('/')} >Cleever</Typography>
                    {/* <img className='logo__img' src={logo} alt="logo" /> */}
                    <TextField
                        margin='dense'
                        color='secondary'
                        placeholder='Search'
                        sx={{ flex:0.9 ,backgroundColor: 'white', color: 'white', borderRadius: '5px', margin:'auto' }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton sx={{ backgroundColor: 'gold' }}>
                                        <SearchIcon color='secondary' />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Stack spacing={2} direction='row' ml={2} mr={5}>
                        <Box sx={boxSX}>
                            <Typography variant='caption' display='block'>Hello {user?.email}</Typography>
                            {
                               user? <Button sx={{ paddingLeft: 0, paddingTop: 0, color:'white' }} onClick={handleAuthentication}>Logout</Button>:<Button sx={{ color: 'white', paddingLeft: 0, paddingTop: 0 }} onClick={handleOpen}>Sign In</Button>
                            }
                            
                        </Box>
                        <Box sx={boxSX} onClick={handleOrders}>
                            <Typography variant='caption' display='block'>Return</Typography>
                            <Button color='secondary' sx={{ paddingLeft: 0, paddingTop: 0, color:'white' }}>& Orders</Button>
                        </Box>
                        {/* <Box sx={boxSX}>
                            <Typography variant='caption' display='block'>your</Typography>
                            <Button sx={{ color: 'white', paddingLeft: 0, paddingTop: 0 }}>| Prime</Button>
                        </Box> */}
                        <Box sx={boxSX}>
                            <IconButton sx={{color:'white'}}>
                                <ShoppingCartIcon onClick={() => navigate('/checkout')} />
                                <Typography variant='caption' >{basket?.length}</Typography>
                            </IconButton>
                        </Box>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Login open={open} handleClose={handleClose} />
         </> 

            
    )
}

export default Header
