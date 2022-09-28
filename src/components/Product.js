import { Box, Button, Paper, Rating, Skeleton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React, { useState, useEffect } from 'react'
import { useStateValue } from '../context/StateProvider';
import { useSnackbar } from 'notistack';

const Product = ({title, price, rating, image ,loading, id}) => {
  const { enqueueSnackbar  } = useSnackbar();
    // FAKE STATE FOR SKELETON COMPO
    const [item, setitem] = useState(false)
    const [hover, setHover] = useState(0)


    useEffect(() => {
      setTimeout(() => {
        setitem(true)         //can remove this code
      }, 200);
    }, [])
    // FAKE STATE FOR SKELETON COMPO

    const [ , dispatch] = useStateValue();
    const addToCart = (variant='success') => {
      dispatch({
        type:'ADDITEM',
        item:{
          id,
          title,
          image,
          price,
          rating
        }
      });
      enqueueSnackbar('Item added successfully', {
      variant:'success',
      anchorOrigin:{
        vertical:'bottom',
        horizontal:'right'
      }
    });
    }

    function onMouseHover() {
      setHover(10)
    }
    function onMouseNotHover() {
      setHover(0)
    }
    
  return (
    <Paper sx={{padding:{md:'1%', xs:'2%'}, height:'max-content'}} square elevation={hover} onMouseOver={onMouseHover} onMouseOut={onMouseNotHover}>
        <Typography variant='subtitle1' sx={{fontWeight:'bold'}}>
            {title}
        </Typography>
        <Typography variant='subtitle1'>
            <strong>${price}</strong>
        </Typography>
        { item ? <Rating name="read-only" value={rating} readOnly /> : <Skeleton variant='text' width="20%" />}
        <Box sx={{display:'flex', justifyContent:'center'}} mt={2}>
        {
           item ? <img style={{width:'12vh', height:'12vh'}} src={image} alt='product-img' />: <Skeleton variant='rectangular' width={200} height={200} animation="wave"/>
        }
        </Box>

        <Box  sx={{padding:3}}>
            <Button color='secondary' fullWidth variant='contained' disableElevation size='small' onClick={addToCart}>
                <AddIcon />Add to cart
            </Button>
        </Box>
    </Paper>
  )
}

export default Product