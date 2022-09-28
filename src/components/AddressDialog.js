import React, { useState } from 'react'
import { Button, TextField, Slide, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { useStateValue } from '../context/StateProvider';
import { useNavigate } from 'react-router-dom';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const AddressDialog = ({open, handleClose}) => {

    const navigate = useNavigate('')
    const [address, setaddress] = useState('')
    const [errorHandler, seterrorHandler] = useState(false);
    const [, dispatch] = useStateValue();

    
    const proceed = () => {
        if (address.length < 15) {
            seterrorHandler(true)
        } else {
            dispatch({
                type:'ADDRESS',
                address:address
            });
            setaddress('');
            navigate('/payment');
        }
    }


  return (
    <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
        <DialogTitle>Add your address</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Before we proceed to checkout page, please enter your address.
          </DialogContentText>
          <TextField
            error={errorHandler}
            autoFocus
            margin="dense"
            label="Address"
            type="address"
            fullWidth
            variant="standard"
            color='secondary'
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            helperText={errorHandler ?'please enter a proper address': ''}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={handleClose}>Cancel</Button>
          <Button color='secondary' onClick={proceed}>Proceed</Button>
        </DialogActions>
      </Dialog>
  )
}

export default AddressDialog
