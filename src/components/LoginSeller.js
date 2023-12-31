import React, { useState } from "react";
import {
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginSeller = ({ open }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loginRegister, setloginRegister] = useState(false);
  const navigate = useNavigate();
  const [emailErrorHandler, setemailErrorHandler] = useState(false);
  const [passwordErrorHandler, setpasswordErrorHandler] = useState(false);
  const [emailErrorHandlerMessage, setemailErrorHandlerMessage] = useState("");
  const [passwordErrorHandlerMessage, setpasswordErrorHandlerMessage] =
    useState("");
  const [handleClose, setHandleClose] = useState(false);
  const toggleLoginRegister = () => {
    setemailErrorHandlerMessage("");
    setpasswordErrorHandlerMessage("");
    setemailErrorHandler(false);
    setpasswordErrorHandler(false);
    setloginRegister(!loginRegister);
  };

  const signIn = (e) => {
    e.preventDefault();
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8000/signin", data)
      .then((response) => {
        console.log(response, "response");

        toast.success("Logging In", {
          position: toast.POSITION.TOP_RIGHT,
        });
        localStorage.setItem("user", JSON.stringify(response?.data));
        setHandleClose(true);
        navigate("/seller-portal");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    console.log("signing in");
  };

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          setloginRegister(false);
        }
      })
      .catch((e) => {
        if (
          e.message ===
          "Firebase: The email address is badly formatted. (auth/invalid-email)."
        ) {
          setemailErrorHandler(true);
          setemailErrorHandlerMessage("Please enter a valid email");
        } else if (
          e.message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          setpasswordErrorHandler(true);
          setpasswordErrorHandlerMessage(
            "Please enter a proper and valid password of more than 6 characters"
          );
        } else if (
          e.message ===
          "Firebase: An internal AuthError has occurred. (auth/internal-error)."
        ) {
          setpasswordErrorHandler(true);
          setpasswordErrorHandlerMessage(
            "Please enter a proper and valid password of more than 6 characters"
          );
        } else if (e.message === "Firebase: Error (auth/missing-email).") {
          setemailErrorHandler(true);
          setemailErrorHandlerMessage("Please enter a valid email");
        } else if (
          e.message ===
          "Firebase: The email address is already in use by another account. (auth/email-already-in-use)."
        ) {
          setemailErrorHandler(true);
          setemailErrorHandlerMessage(
            "The email address is already in use by another account."
          );
        }
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        sx={{ color: "secondary.main", textAlign: "center", fontSize: 30 }}
      >
        {loginRegister ? "Register" : "Login"}
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="email"
          label="email"
          type="text"
          fullWidth
          variant="standard"
          color="secondary"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
            setemailErrorHandlerMessage("");
            setemailErrorHandler(false);
          }}
          error={emailErrorHandler}
          helperText={emailErrorHandler ? emailErrorHandlerMessage : ""}
        />
        <TextField
          margin="dense"
          id="name"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          color="secondary"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
            setpasswordErrorHandlerMessage("");
            setpasswordErrorHandler(false);
          }}
          error={passwordErrorHandler}
          helperText={passwordErrorHandler ? passwordErrorHandlerMessage : ""}
        />
      </DialogContent>
      <DialogActions>
        {loginRegister ? (
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            type="submit"
            onClick={signUp}
          >
            SignUp
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            type="submit"
            onClick={signIn}
          >
            Login
          </Button>
        )}
      </DialogActions>
      <Typography variant="body2" mt={1} gutterBottom align="center">
        {loginRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <Button
          variant="text"
          color="secondary"
          size="small"
          onClick={toggleLoginRegister}
        >
          {loginRegister ? "Login" : "SignUp"}
        </Button>
        {/* Don't have an account?<Button variant='text' color='secondary' size='small'>"SignUp"</Button> */}
      </Typography>
    </Dialog>
  );
};

export default LoginSeller;
