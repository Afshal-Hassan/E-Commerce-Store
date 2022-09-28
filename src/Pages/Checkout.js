import { Box, Typography } from '@mui/material'
import React from 'react'
import '../App.css'
import Cartitems from '../components/Cartitems'
import Subtotal from '../components/Subtotal'
import { useStateValue } from '../context/StateProvider'
import useMediaQuery from '@mui/material/useMediaQuery';

const Checkout = () => {
    const [{basket}, ] = useStateValue()
    const matches = useMediaQuery('(max-width:756px)');

  return (
    <Box sx={matches ? {display:'flex', flexDirection:'column', flexWrap:'wrap', width:{md:'max-content',  sm:'max-content', xs:'170vw'}, height:'auto'} : {height:'max-content'}}>
    <Box  component='div' className='abc' maxWidth sx={{display:'flex', padding:'20px', backgroundColor:'white', height:'max-content' }} >
        <Box sx={{width:'100vw'}}>
            <Box>
                <img style={matches ? {width:"100vw"}: {width:'70vw'}} className='banner__img' src='https://img.freepik.com/free-vector/banner-black-friday-super-sale-realistic-3d-black-shopping-basket_548887-26.jpg?size=626&ext=jpg' alt="banner" />
            </Box>
            <Box sx={{ borderBottom:'1px solid Lightgray' }}>
                <Typography variant='h4' gutterBottom>Your Shopping Basket</Typography>
            </Box>
            <Box>
                {
                    basket.map((item, i) => 
                        <Cartitems key={i} title={item.title} price={item.price} rating={item.rating} image={item.image} id={item.id}/>
                    )
                }
            </Box>
            <Box>
            </Box>
        </Box>
        { !matches && <Box sx={{paddingTop:'1%'}}>
            <Subtotal />
        </Box>}
    </Box>
    { matches && <Box mt={2} mb={2} sx={{paddingTop:'1%', width:'max-content', marginLeft:"auto", marginRight:'auto'}}>
            <Subtotal />
        </Box>}
    
    </Box>
  )
}

export default Checkout





// "https://img.freepik.com/free-vector/banner-black-friday-super-sale-realistic-3d-black-shopping-basket_548887-26.jpg?size=626&ext=jpg"