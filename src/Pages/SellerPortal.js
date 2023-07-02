import { Typography } from '@mui/material';
import React from 'react'
import CustomList from '../components/CustomList';

function SellerPortal() {
    return (
        <div style={{ backgroundColor: "white", width: "100%", height: "90vh", paddingTop: 30 }}>
            <Typography variant='h4' style={{ marginLeft: 30, color: "rgb(156, 39, 176)" }}  >Seller Portal</Typography>
            <CustomList />
        </div>
    )
}

export default SellerPortal;