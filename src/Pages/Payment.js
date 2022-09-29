import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import Cartitems from '../components/Cartitems'
import { useStateValue } from '../context/StateProvider'
import { CardElement ,useElements, useStripe } from '@stripe/react-stripe-js'
import axios from 'axios';
import { db } from '../firebase'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { LoadingButton } from '@mui/lab';


const Payment = () => {
    const navigate= useNavigate()
    const [{deliveryAddress, user, basket},dispatch] = useStateValue();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState("");
    const [loading, setloading] = useState(false);
    const [clientSecret, setclientSecret] = useState(true);


    const getTotal = basket.reduce((amount, item) => amount + item.price,0).toFixed(2)

    // baseURL: 'https://hidden-crag-02537.herokuapp.com/'
// baseURL:'http://localhost:8000/'

    useEffect(() => {
        const getClientSecret = async () => {
            // const response = await axios.post(`/payment/create?total=${getTotal*100}`);
            // console.log('awdawd',response.data.clientSecret)
            // setclientSecret(response.data.clientSecret);
            const response = await axios({
                method: 'post',
                url: `https://hidden-crag-02537.herokuapp.com/payment/create?total=${getTotal*100}`,
                headers: {"Content-Type": "application/json"}
              });
            //   console.log('awdawd',response.data.clientSecret)
            setclientSecret(response.data.clientSecret);
        }
        getClientSecret();
        getClientSecret();
        getClientSecret();
    }, [basket, getTotal])




    const stripe = useStripe();
    const elements = useElements();


   

    const basketLength= basket.length>0

    const emptyCart = () => {
        navigate('/')
    }
    const handleSubmit = async (event) => {
        event.preventDefault();       
        setloading(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            db.collection('users')  //we go to users collection
            .doc(user?.uid)          // we get hold of a specific user
            .collection('orders')   //we go in that user orders
            .doc(paymentIntent.id)  //we create a document with payment indtent id
            .set({                  //we push this info 
                basket:basket,
                amount:paymentIntent.amount/100,
                created:paymentIntent.created
            }).catch((e) => {
                console.log(e)
            })
            setError(null);
            setProcessing(false);
            dispatch({
                type:'RESETBASKET'
            })
            navigate('/orders', {replace: true})
        })
    }

    const handleChange = event => {
        setDisabled(!event.complete);
        setProcessing(event.empty);
        console.log(event)
        setError(event.error? event.error.message: '')
    }
  
    return (
    <>
    <Box sx={{display:'flex', flexDirection:'column', flexWrap:'wrap'}}>
            <Typography mt={7} variant='h5' align='center'>Checkout ({basket?.length} Items)</Typography>
            <Typography ml={2} variant='caption' sx={{color:'text.secondary', textAlign:'center'}}>(Enter 42424242..... in card detail and then click buy now to make a test transaction)</Typography>
        <Box sx={{backgroundColor:'white'}} mt={2}>
            <Stack direction='column' ml={3} >
                <Stack direction='row' p={3} sx={{borderBottom:'1px solid Lightgray'}}>
                    <Typography variant='h6'><strong>Delivery Address</strong></Typography>
                    <Stack deirection='column' ml={7}>
                        <Typography variant='subtitle1' ml={1}>{user?.email}</Typography>
                        <Stack direction='row'>
                            <LocationOnIcon sx={{padding:0}}/>
                            <Typography variant='subtitle1'><strong>{deliveryAddress}</strong></Typography>
                        </Stack>
                        
                    </Stack>
                </Stack>

                <Stack direction='row' p={4} sx={{borderBottom:'1px solid Lightgray', width:'auto'}}>
                <Typography variant='h6'><strong>Review items and <br/> delivery</strong></Typography>
                    <Stack direction='column' ml={6}>
                    {
                      basketLength ?   
                        basket.map((item, i) => 
                            <Cartitems key={i} title={item.title} price={item.price} rating={item.rating} image={item.image} id={item.id}/>
                        )
                        : 
                            <Typography variant='subtitle1'><strong>Your cart is empty.<Button variant='text' color='secondary' onClick={emptyCart}>Add something</Button></strong></Typography>      
                    }
                    </Stack>
                </Stack>

                <Stack direction='row' p={4} sx={{borderBottom:'1px solid Lightgray'}}>
                    <Typography variant='h6'><strong>Payment method</strong></Typography>
                    <Stack direction='column' ml={7} sx={{width:'35vh'}}>
                        <Typography variant='subtitle1'><strong>Card Details</strong></Typography>
                        <Stack direction='row' mb={2} >
                            <form style={{width:'100%'}}>
                                <CardElement onChange={handleChange}/>
                                {error && <div style={{color:'purple'}}>{error}</div>}
                            </form>
                        </Stack>
                        <Paper elevation={2} sx={{border:'1px solid silver', padding:'10%'}}>
                            <Typography><strong>Order Total: ${getTotal}</strong></Typography>
                            <LoadingButton 
                              fullWidth 
                              loadingIndicator='Processing...' 
                              sx={{marginTop:'2%'}} 
                              color='secondary' 
                              variant='contained' 
                              onClick={handleSubmit} 
                              disabled={!basketLength || processing || disabled}               
                              loading={loading}
                            >
                              Buy now
                            </LoadingButton>
                        </Paper>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    </Box>
    </>
  )
}

export default Payment
