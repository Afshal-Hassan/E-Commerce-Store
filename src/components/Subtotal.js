import {Button, Checkbox, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useStateValue } from '../context/StateProvider'
import AddressDialog from './AddressDialog';
import { useSnackbar } from 'notistack';


const Subtotal = () => {

  const { enqueueSnackbar  } = useSnackbar();
  const [{basket, user}, dispatch ] = useStateValue();
  const [opened, setopened] = useState(false)

  const getTotal = basket.reduce((amount, item) => amount + item.price,0).toFixed(2)
  
  const handleOpen = () => {
    if (user && basket.length>0) {
      setopened(true)
    } else if (!user && basket.length>0){
      dispatch({
        type: 'OPENLOGINDIALOG'
      });
    } else if (user && !basket.length>0){
      enqueueSnackbar('Please Enter something in the basket first', {
        variant:'warning',
        anchorOrigin:{
          vertical:'top',
          horizontal:'center'
        }
      });
    } else if (!user && !basket.length>0){
      dispatch({
        type: 'OPENLOGINDIALOG'
    });
    } 
    // else if (user && basket.length>0 && deliveryAddress) {
    //   navigate('/payment')
    // } 
    else {
      setopened(true)
    } 
  }

  const handleClose = () => {
    setopened(false)
  }

  return (
    <>
    <Paper elevation={2} sx={{width:'auto', height:'auto', padding:'5%', marginLeft:'15%', backgroundColor:'rgb(248, 247, 247)'}}>
        <Typography variant='subtitle1'>Subtotal ({basket?.length} Items): <strong>${getTotal? getTotal : 0}</strong></Typography>
        <Checkbox sx={{marginBottom:'2px', paddingLeft:0, marginLeft:0}} color='secondary' /><Typography component='span' varaint='caption'>This order contains a Gift.</Typography>
        <Button color='secondary' fullWidth variant='contained' sx={{marginTop:'15px'}} onClick={handleOpen}>
            Proceed to Checkout
        </Button>
    </Paper>
    <AddressDialog open={opened} handleClose={handleClose}/>
    </>
  )
}

export default Subtotal