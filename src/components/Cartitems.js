import { Box, Button, Rating, Stack, Typography } from '@mui/material'
import React from 'react'
import '../App.css'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useStateValue } from '../context/StateProvider';
import { useSnackbar } from 'notistack';

export default function Cartitems({price, rating, image, title, id, hideButton}) {
    const { enqueueSnackbar } = useSnackbar();
    const [, dispatch] = useStateValue();

    const removeFromCart = () => {
        dispatch({
          type:'REMOVEITEM',
          id:id
        })
        enqueueSnackbar('Item removed successfully', {
          variant:'error',
          anchorOrigin:{
            vertical:'bottom',
            horizontal:'right'
          }
        });
      }






  return (
    <Stack direction='row' mt={{hideButton}? 5: 2} >
      <Box>
        <img className='cart__item' src={image} alt="item-cart" />
      </Box>
        
        <Stack direction='column' ml={3} mt={{hideButton}? 2: 0} >
            <Typography variant='h6'><strong>{title}</strong></Typography>
            <Typography variant='subtitle1'><strong>${price}</strong></Typography>
            <Rating  value={rating} readOnly size='small' />
            {
              !hideButton && <Button color='secondary' variant='contained' startIcon={<RemoveShoppingCartIcon />} size='small' sx={{marginTop:'2%', width:'300px'}}  onClick={removeFromCart}>Remove from cart</Button>
            }           
        </Stack>
    </Stack>
  )
}
