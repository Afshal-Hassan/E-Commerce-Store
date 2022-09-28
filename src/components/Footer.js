import { Box, Typography, Stack, IconButton } from '@mui/material'
import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';


const Footer = () => {
  return (
    <Box sx={{backgroundColor:'secondary.dark', height:'max-content', textAlign:'center', display:'flex', flexDirection:'column-reverse'}} >
        <Typography sx={{color:'white'}} variant='overline'>Created By Muneeb</Typography>
        <Stack direction='row' alignItems='center' justifyContent='center'>
          <a href="https://www.linkedin.com/in/muneeb-ullah-khan/"  target="_blank" rel="noreferrer">
            <IconButton sx={{color:'white'}}>
                <LinkedInIcon />
            </IconButton>
          </a>
            <a href="mailto:muneeb.thekhan222@gmail.com" target="_blank" rel="noreferrer">
            <IconButton sx={{color:'white'}}>
                <EmailIcon />
            </IconButton>
            </a>
            
        </Stack>
    </Box>
  )
}

export default Footer