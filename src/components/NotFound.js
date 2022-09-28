import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
    const navigate = useNavigate();
  return (
    <Box sx={{display:'flex', justifyContent:'center',flexDirection:'column',textAlign:'center', alignItems:'center', height:'85vh'}}>
        <Typography variant='h5' sx={{color:'text.secondary'}}>OOPS!<br/>The page you are looking<br /> for does not exist.</Typography>
        <Button color='secondary' onClick={() => navigate('/')}>Go To Home Page</Button>
    </Box>
  )
}
