import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Order from '../components/Order';
import { useStateValue } from '../context/StateProvider'
import { db } from '../firebase';







const Orders = () => {

    const [{user}] = useStateValue();
    const [orders, setorders] = useState([]);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        if(user) {
        setloading(true)
        db
          .collection('users')
          .doc(user?.uid)
          .collection('orders')
          .orderBy('created', 'desc')
          .get()
          .then((snapshot => {           
            setorders(snapshot.docs.map(doc => ({
                id:doc.id,
                data:doc.data()
            })))    
            setloading(false) 
          })).catch((e) => {
            console.log(e)
          })
          
        } else {
            setorders([])
        }
        
    }, [user])







  return (
    <Box sx={{padding:'4%', display:'flex', flexDirection:'column'}}>
      <Typography variant='h3' mb={2} ml={3}>Your Orders</Typography>
      { !loading ?
        <Box>
        {
          orders.map((order,i) => (
            <Order key={i} order={order} />
          ))
        }
        </Box> 
        :
        <Box sx={{display:'flex', justifyContent:'center',flexDirection:'column',textAlign:'center', alignItems:'center', height:'65vh'}}>
          <CircularProgress color='secondary' size={80}/>
        </Box>
      }
    </Box>
  )
}

export default Orders


