import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";

import PropTypes from "prop-types";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { default as MuiLink } from "@mui/material/Link";

import { useOutletContext } from "react-router-dom";

function Product() {
  const { productId } = useParams(); /* path parameter */
  const { shopItems, addCartItem } = useOutletContext();

  const displayItem = shopItems.find((item) => item.id == productId);

  return (
    <Paper sx={{ margin: "30px auto 0 auto", width: "60%" }} elevation={5}>
      <Grid
        container
        padding="15px"
        flexDirection="column"
        alignItems="center"
        gap="15px"
      >
        <Grid item>
          <Typography component="h2" variant="h4" fontWeight="bold">
            {displayItem.title}
          </Typography>
        </Grid>
        <Grid item padding="0 20px">
          <Typography component="p" variant="body2">
            {displayItem.description}
          </Typography>
        </Grid>
        <Box
          sx={{
            width: "20vw",
            padding: "40px",
            boxShadow:
              "inset 6px 6px 3px -2px #000, inset -6px -6px 3px -2px #000",
          }}
        >
          <img style={{ width: "100%" }} src={displayItem.image} alt="" />
        </Box>
        <Grid item>
          <ProductReviewInfo rating={displayItem.rating} />
        </Grid>
        <Grid item>
          <ProductPrice addCartItem={addCartItem} displayItem={displayItem} />
        </Grid>
        <Grid item>
          {/* This creates a warning of nesting hyperlniks */}
          {/* There is a way of using routing within Material UI but for another time... */}
          <Link to={"../shop"}>
            <MuiLink>Return to shop</MuiLink>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
}

const ProductReviewInfo = (props) => {
  return (
    <>
      <Box sx={{ margin: "0" }}>
        <Rating
          name="simple-controlled"
          value={props.rating.rate}
          precision={0.1}
          readOnly
        />
        <Typography component="legend">
          ({props.rating.count} reviews)
        </Typography>
      </Box>
    </>
  );
};

ProductReviewInfo.propTypes = {
  rating: PropTypes.object.isRequired,
};

const ProductPrice = (props) => {
  const [numUnits, setNumUnits] = useState(1);

  const marks = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
  ];

  return (
    <>
      <Box sx={{ width: 200 }}>
        <Slider
          color="primary"
          value={numUnits}
          onChange={(event, newValue) => {
            setNumUnits(newValue);
          }}
          defaultValue={1}
          step={1}
          min={1}
          max={10}
          marks={marks}
        />
      </Box>

      <Button
        variant="outlined"
        onClick={() => {
          props.addCartItem(props.displayItem, numUnits);
        }}
      >
        ${(numUnits * props.displayItem.price).toFixed(2)} - Add to Cart
      </Button>
    </>
  );
};

ProductPrice.propTypes = {
  addCartItem: PropTypes.func.isRequired,
  displayItem: PropTypes.object.isRequired,
};

export default Product;
