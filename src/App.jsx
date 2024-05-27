import useShopItems from "./useShopItems.js";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import PropTypes from "prop-types";

import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

import titleBackground from "./assets/images/header-background-image.jpg";
import ScrollToTop from "./ScrollToTop";

export default function App() {
  // Note, collecting shop data at top of app is bad design.
  // If ever used in anger, move this to shop page.
  // It suffices for purpose of this project which is to practice routes.
  const { shopItems, error, loading } = useShopItems();

  const [cartItems, setCartItems] = useState([]);

  const addCartItem = (item, numUnits) => {
    // Deep copy to ensure state change
    const tempCartItems = structuredClone(cartItems);
    if (tempCartItems.some((element) => element.id === item.id)) {
      const index = tempCartItems.findIndex(
        (element) => element.id === item.id
      );
      tempCartItems[index].numUnits += numUnits;
      setCartItems(tempCartItems);
    } else {
      const newCartItem = Object.assign(item, { numUnits: numUnits });
      setCartItems([...cartItems, newCartItem]);
    }
  };

  const removeCartItem = (id) => {
    // Deep copy to ensure state change
    const tempCartItems = structuredClone(cartItems);
    const index = tempCartItems.findIndex((item) => item.id === id);
    tempCartItems.splice(index, 1);
    setCartItems(tempCartItems);
  };

  return (
    <>
      <ScrollToTop />
      <Container maxWidth="xl" disableGutters={true}>
        <Grid container direction="column">
          <TitleBar />
          <NavBar numCartItems={cartItems.length} />
          {/* {cartItems ? <div>{cartItems[0]}</div> : <></>} */}
          <MainArea
            shopItems={shopItems}
            cartItems={cartItems}
            addCartItem={addCartItem}
            removeCartItem={removeCartItem}
          />
          <Footer />
        </Grid>
      </Container>
    </>
  );
}

function TitleBar() {
  return (
    <Grid
      item
      xs={12}
      sx={{
        backgroundImage: `url(${titleBackground})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundColor: "primary.main",
      }}
    >
      <Box
        minHeight="200px"
        alignItems="center"
        color="#ffffff"
        fontSize="70px"
        fontWeight="bold"
        container="header"
        sx={{
          textShadow: "3px 3px var(--primary-color)",
          // easy center of the item
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        The Odin Bazaar
      </Box>
    </Grid>
  );
}

function NavBar(props) {
  return (
    // AppBar represents header, and toolbars are simply horizontal flexboxes
    <AppBar position="sticky" top="0" sx={{}}>
      <Toolbar disableGutters={true}>
        <Toolbar disableGutters={true} sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="h2">
            <MenuItem route="/" text="Home" icon={<HomeIcon />} />
          </Typography>
          <Typography variant="h6" component="h2">
            <MenuItem route="/shop" text="Shop" icon={<ShoppingBasketIcon />} />
          </Typography>
        </Toolbar>
        <Toolbar disableGutters={true} sx={{ flexGrow: 0 }}>
          <Typography variant="h6" component="h2">
            <MenuItem
              route="cart"
              text={
                `Cart: ${props.numCartItems} item` +
                (props.numCartItems === 1 ? "" : "s")
              }
              icon={<ShoppingCartIcon />}
            />
          </Typography>
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = {
  numCartItems: PropTypes.number.isRequired,
};

function MenuItem(props) {
  return (
    <Link to={props.route}>
      <Toolbar
        sx={{
          columnGap: "8px",
          color: "#ffffff",
          "&:hover": {
            color: "primary.lightTextHover",
          },
        }}
      >
        {props.icon}
        <Typography variant="h6" component="h2">
          {props.text}
        </Typography>
      </Toolbar>
    </Link>
  );
}

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

function MainArea(props) {
  return (
    <Grid item xs={12} sx={{ minHeight: "2000px" }}>
      <main>
        <Outlet
          context={{
            shopItems: props.shopItems,
            cartItems: props.cartItems,
            addCartItem: props.addCartItem,
            removeCartItem: props.removeCartItem,
          }}
        />
      </main>
    </Grid>
  );
}

function Footer() {
  return (
    <Grid item xs={12}>
      <footer>Footer</footer>
    </Grid>
  );
}
