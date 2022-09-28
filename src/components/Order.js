import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import moment from 'moment'
import Cartitems from './Cartitems'

const Order = ({order}) => {
  return (
    <Box sx={{backgroundColor:'white', padding:'3%', margin:'2%', marginBottom:'5%'}}>
        <Stack direction='row' justifyContent="space-between" sx={{flexWrap:'wrap'}} mb={1}>
        <Typography variant='h4'><strong>Order</strong></Typography>
        <Typography variant='body1'>Order id: <strong>{order.id}</strong></Typography>
        </Stack>
        <Typography variant='body1'>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</Typography>
        
        {
            order.data.basket?.map((item,i) => (
                <Cartitems key={i} id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating} hideButton/>
            ))
        }
        <Stack direction='row-reverse'>
            <Typography variant='body1'>Order Total: <strong>${order.data.amount}</strong></Typography>
        </Stack>
    </Box>
  )
}

export default Order