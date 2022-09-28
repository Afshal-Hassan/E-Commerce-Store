import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useStateValue } from '../context/StateProvider';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Navbar() {

    const [{ basket, open, user }, dispatch] = useStateValue();
    const navigate= useNavigate();

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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color='secondary'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Cleever
          </Typography>

        <ButtonGroup color='secondary' variant='outlined'>
        <Button  onClick={handleOrders} sx={{ paddingLeft: 0, paddingTop: 0, color:'white' }}>return <br/> & Orders</Button>
        {
            user? <Button sx={{ paddingLeft: 0, paddingTop: 0, color:'white' }} onClick={handleAuthentication}>Logout</Button>:<Button sx={{ color: 'white', paddingLeft: 0, paddingTop: 0 }} onClick={handleOpen}>Sign In</Button>
        }
        </ButtonGroup>
        <Button sx={{color:'white'}} color='secondary' variant='outlined'>awdwadawd</Button>
        
        
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
