import useShopItems from "./useShopItems.js";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import MuiLink from "./Link.jsx";
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
    const cartItemsCopy = structuredClone(cartItems);
    if (cartItemsCopy.some((element) => element.id === item.id)) {
      const index = cartItemsCopy.findIndex(
        (element) => element.id === item.id
      );
      cartItemsCopy[index].numUnits += numUnits;
      setCartItems(cartItemsCopy);
    } else {
      const newCartItem = Object.assign(item, { numUnits: numUnits });
      setCartItems([...cartItems, newCartItem]);
    }
  };

  const removeCartItem = (id) => {
    // Deep copy to ensure state change
    const cartItemsCopy = structuredClone(cartItems);
    const index = cartItemsCopy.findIndex((item) => item.id === id);
    cartItemsCopy.splice(index, 1);
    setCartItems(cartItemsCopy);
  };

  return (
    <>
      <ScrollToTop />
      <Container maxWidth="xl" disableGutters={true}>
        <Grid container direction="column">
          <TitleBar />
          <NavBar numCartItems={cartItems.length} />
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
        container="header"
        sx={{
          // // easy center of the item
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          fontSize={{ xs: "50px", sm: "60px", md: "70px" }}
          fontWeight="bold"
          color="#ffffff"
          sx={{ textShadow: "3px 3px var(--primary-color)" }}
        >
          The Odin Bazaar
        </Typography>
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
    <>
      <Grid item xs={12} marginBottom="30px">
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
    </>
  );
}

function Footer() {
  const devLinks = [
    {
      linkText: "Github - gtpWebDev",
      link: "https://github.com/gtpWebDev",
    },
    {
      linkText: "X / Twitter - gtpWebDev",
      link: "https://x.com/gtpWebDev",
    },
    {
      linkText: "gmail - gtpwebdev@gmail.com",
      link: "gtpwebdev@gmail.com",
    },
  ];
  return (
    <Box
      backgroundColor="primary.contrastText"
      flexShrink="0"
      padding="20px 15%"
    >
      <Typography sx={{ paddingBottom: "20px" }}>
        {/* MuiLink uses composition! */}
        <MuiLink link={"#top"} newTab={false}>
          <Typography
            fontWeight="bold"
            color="#ffffff"
            fontSize={{ xs: "12px", sm: "14px", md: "16px" }}
          >
            Back to top
          </Typography>
        </MuiLink>
      </Typography>

      <Grid container spacing={{ xs: 1, sm: 2 }}>
        <Grid item xs={12} sm={6} sx={{ marginBottom: "10px" }}>
          <Typography
            textAlign="left"
            fontWeight="bold"
            color="#ffffff"
            fontSize={{ xs: "12px", sm: "14px", md: "16px" }}
          >
            Site developer links
            <br />
            {devLinks.map((element, index) => {
              return (
                <>
                  <MuiLink link={element.link} newTab={true}>
                    {element.linkText}
                  </MuiLink>
                  <br />
                </>
              );
            })}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ marginBottom: "10px" }}>
          <Typography
            textAlign="left"
            fontWeight="bold"
            color="#ffffff"
            fontSize={{ xs: "12px", sm: "14px", md: "16px" }}
          >
            With thanks...
            <br />
          </Typography>
          <Typography
            textAlign="left"
            color="#ffffff"
            fontSize={{ xs: "12px", sm: "14px", md: "16px" }}
          >
            Headline photo by&nbsp;
            <MuiLink
              link="https://unsplash.com/@mercantile?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
              newTab={true}
            >
              Clark Street Mercantile&nbsp;
            </MuiLink>
            on&nbsp;
            <MuiLink
              link="https://unsplash.com/photos/clothes-store-interior-P3pI6xzovu0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
              newTab={true}
            >
              Unsplash
            </MuiLink>
          </Typography>
          <Typography
            textAlign="left"
            color="#ffffff"
            fontSize={{ xs: "12px", sm: "14px", md: "16px" }}
          >
            Home page photo by&nbsp;
            <MuiLink
              link="https://unsplash.com/@mikepetrucci?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
              newTab={true}
            >
              Mike Petrucci&nbsp;
            </MuiLink>
            on&nbsp;
            <MuiLink
              link="https://unsplash.com/photos/gray-and-blue-open-signage-c9FQyqIECds?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
              newTab={true}
            >
              Unsplash
            </MuiLink>
          </Typography>
          <Typography
            textAlign="left"
            color="#ffffff"
            fontSize={{ xs: "12px", sm: "14px", md: "16px" }}
          >
            Fake products from &nbsp;
            <MuiLink link="https://fakestoreapi.com" newTab={true}>
              Fake Store API
            </MuiLink>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
