import * as React from "react";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, Tooltip } from "@mui/material";
import { useStateValue } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Login from "./Login";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import LoginSeller from "./LoginSeller";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function FinalNavbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  const [openSeller, setOpenSeller] = useState(false);
  ///MY FUNCTIONS
  const [{ basket, open }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [searchValue, setsearchValue] = React.useState("");

  const handleOrders = () => {
    if (user) {
      navigate("/orders");
      handleMobileMenuClose();
      handleMenuClose();
    } else {
      dispatch({
        type: "OPENLOGINDIALOG",
      });
    }
  };

  const handleOpen = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
    dispatch({
      type: "OPENLOGINDIALOG",
    });
    handleMenuClose();
  };
  const handleClose = () => {
    dispatch({
      type: "CLOSELOGINDIALOG",
    });
  };

  const handleAuthentication = () => {
    if (user) {
      setAnchorEl(null);
      setMobileMoreAnchorEl(null);
      localStorage.setItem("user", null);
      localStorage.removeItem("User");
      navigate("/");
    }
  };

  const handleOpenSeller = () => {
    setOpenSeller(true);
    dispatch({
      type: "OPENLOGINDIALOGSELLER",
    });
  };
  const handleCloseSeller = () => {
    dispatch({
      type: "CLOSELOGINDIALOGSELLER",
    });
  };

  const handleSearchChange = (e) => {
    setsearchValue(e.target.value);
  };

  const handleSearchIconClick = () => {
    window.find(searchValue);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={isMenuOpen}
      onClose={handleMenuClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={handleOrders} sx={{ color: "text.secondary" }}>
        <IconButton size="large" aria-label="show orders" color="inherit">
          <HistoryToggleOffIcon />
        </IconButton>
        <p>Your orders</p>
      </MenuItem>
      {user ? (
        <MenuItem
          onClick={handleAuthentication}
          sx={{ color: "text.secondary" }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <LogoutIcon color="text.secondary" />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      ) : (
        <MenuItem onClick={handleOpen} sx={{ color: "text.secondary" }}>
          <IconButton>
            <LoginIcon color="text.secondary" />
          </IconButton>
          <p>Sign In</p>
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          navigate("/checkout");
          handleMobileMenuClose();
        }}
        sx={{ color: "text.secondary" }}
      >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={basket?.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart Items</p>
      </MenuItem>
      <MenuItem onClick={handleOrders} sx={{ color: "text.secondary" }}>
        <IconButton size="large" aria-label="show orders" color="inherit">
          <HistoryToggleOffIcon />
        </IconButton>
        <p>Your orders</p>
      </MenuItem>
      {user ? (
        <MenuItem
          onClick={handleAuthentication}
          sx={{ color: "text.secondary" }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <LogoutIcon color="text.secondary" />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      ) : (
        <MenuItem onClick={handleOpen} sx={{ color: "text.secondary" }}>
          <IconButton>
            <LoginIcon color="text.secondary" />
          </IconButton>
          <p>Sign In</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              marginLeft: { md: "4%", sm: "4%", xs: "7%" },
              "&:hover": { cursor: "pointer" },
            }}
            onClick={() => navigate("/")}
          >
            Cleever Store{" "}
          </Typography>
          <Search sx={{ display: { xs: "none", sm: "flex" } }}>
            <Tooltip title="Search" arrow>
              <IconButton onClick={handleSearchIconClick}>
                <SearchIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearchChange}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            {user && (
              <Box
                sx={{
                  alignItems: "center",
                  marginTop: "5%",
                  display: { xs: "none", sm: "block" },
                }}
              >
                <Typography variant="caption">Hi, {user?.email}</Typography>
              </Box>
            )}
            <Tooltip title="Cart" arrow>
              <IconButton
                size="large"
                aria-label="show items in cart"
                color="inherit"
                onClick={() => navigate("/checkout")}
              >
                <Badge badgeContent={basket?.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {user ? (
              <Tooltip title="Your Account" arrow>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  sx={{ display: { xs: "none", md: "flex" } }}
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            ) : (
              <Button sx={{ color: "white" }} onClick={handleOpenSeller}>
                Sign In Seller
              </Button>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <Tooltip title="more" arrow>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {/* <Login open={open} handleClose={handleClose} /> */}
      <LoginSeller open={openSeller} handleClose={handleCloseSeller} />
    </Box>
  );
}
