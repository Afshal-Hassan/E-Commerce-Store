import { Box, Typography, Stack, IconButton } from "@mui/material";
import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "secondary.dark",
        height: "max-content",
        textAlign: "center",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      {/* <Typography sx={{color:'white'}} variant='overline'>Created By Muneeb</Typography> */}
    </Box>
  );
};

export default Footer;
