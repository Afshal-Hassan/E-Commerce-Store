import { Typography } from '@mui/material';
import React from 'react'
import CustomList from '../components/CustomList';
import { useState } from 'react';
import CustomModal from '../components/CustomModal/CustomModal';





function SellerPortal() {




    const [isModalOpen, setIsModalOpen] = useState(false);







    const handleCancel = () => {
        setIsModalOpen(false);
    };




    return (
        <div style={{ backgroundColor: "white", width: "100%", height: "90vh", paddingTop: 30 }}>
            <Typography variant='h4' style={{ marginLeft: 30, color: "rgb(156, 39, 176)" }}  >Seller Portal</Typography>
            <CustomList setIsModalOpen={setIsModalOpen} />
            <CustomModal handleCancel={handleCancel} isModalOpen={isModalOpen} />
        </div>
    )
}

export default SellerPortal;