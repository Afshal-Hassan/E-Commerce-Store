import './App.css';
import Home from './Pages/Home';
import { Routes, Route } from 'react-router-dom'
import Checkout from './Pages/Checkout';
import React, { useEffect } from 'react'
import { auth } from './firebase'
import { useStateValue } from './context/StateProvider';
import { SnackbarProvider } from 'notistack';
import Payment from './Pages/Payment';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from "@stripe/react-stripe-js"
import { Requireauth } from './context/Requireauth'
import Orders from './Pages/Orders';
import FinalNavbar from './components/FinalNavbar';
import NotFound from './components/NotFound';
import CustomList from './components/CustomList';
import SellerPortal from './Pages/SellerPortal';
// require('dotenv').config()


// const promise = loadStripe('pk_test_51Lj1VASGZP3p3zAFtVcaROPwiUqDuCIEVwh3cFK8320PfdnsZtbY6gqIcfiixLNaSEYaklsIpdBoM6RREobVrw9B0014tcuE1j')
const promise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`)

function App() {
  const [, dispatch] = useStateValue();


  // useEffect(() => {
  //   auth.onAuthStateChanged(authUser => {

  //     if (authUser) {
  //       dispatch({
  //         type: 'SETUSER',
  //         user: authUser
  //       });
  //       localStorage.setItem("User", authUser.email)
  //     } else {
  //       dispatch({
  //         type: 'SETUSER',
  //         user: null
  //       });
  //     }
  //   })
  // }, [])


  return (
    <>
      <FinalNavbar />
      <SellerPortal />


      {/* <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <Routes>
        <Route  path='/' element={<Home />} />  
        <Route  path='/checkout' element={<Checkout />}/>
        <Route element={<Requireauth />}>
          <Route  path='/payment' element={<Elements stripe={promise}><Payment /></Elements>} exact />
          <Route path='/orders' element={<Orders />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      </SnackbarProvider> */}
    </>

  );
}

export default App;
