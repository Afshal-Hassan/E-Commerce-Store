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

const Login = ({ open, handleClose }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loginRegister, setloginRegister] = useState(false);
  const navigate = useNavigate();
  const [emailErrorHandler, setemailErrorHandler] = useState(false);
  const [passwordErrorHandler, setpasswordErrorHandler] = useState(false);
  const [emailErrorHandlerMessage, setemailErrorHandlerMessage] = useState("");
  const [passwordErrorHandlerMessage, setpasswordErrorHandlerMessage] =
    useState("");

  const toggleLoginRegister = () => {
    setemailErrorHandlerMessage("");
    setpasswordErrorHandlerMessage("");
    setemailErrorHandler(false);
    setpasswordErrorHandler(false);
    setloginRegister(!loginRegister);
  };

  const signIn = (e) => {
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
        navigate("/");
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
    const data = {
      email: email,
      password: password,
      roleId: 2,
    };
    axios
      .post("http://localhost:8000/signup", data)
      .then((response) => {
        console.log(response, "response");

        toast.success(response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <>
      <ToastContainer />
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
          {loginRegister
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
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
    </>
  );
};

export default Login;
