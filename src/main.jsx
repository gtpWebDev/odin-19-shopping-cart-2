import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./Home.jsx";
import Shop from "./shop/Shop.jsx";
import Cart from "./cart/Cart.jsx";
import Product from "./Product.jsx";
import ErrorPage from "./ErrorPage.jsx";
import "./index.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00B290",
      lightTextHover: "#b1e4d7",
    },
    secondary: {
      main: "#b20021",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "product/:productId",
        element: <Product />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

/*

To do list:
  - Add testing for two main components - product and cart
  - Look at adding styling themes for Material UI to avoid local repeats, etc.
  - Complete fluff content and styling:
    - title page, subpage titles
    - make product summaries look nicer
    - work out how to push footer always to bottom even when content doesn't reach bottom
      - (https://css-tricks.com/couple-takes-sticky-footer/)
  -  

*/
