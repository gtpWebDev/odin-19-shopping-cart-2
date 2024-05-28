// Build with Material UI

import numeral from "numeral";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import styles from "./ProductSummary.module.css";
import PropTypes from "prop-types";

export default function ProductSummary(props) {
  return (
    <Paper elevation={5}>
      <Box padding={3}>
        <Typography component="h2" variant="h6" fontWeight="bold">
          {props.title}
        </Typography>
      </Box>
      <img
        // className={styles.img}

        style={{ height: "8rem", backgroundColor: "black" }}
        src={props.imageUrl}
        alt=""
      />
      <Box padding={3} sx={{ fontWeight: "bold", color: "black" }}>
        <Typography component="h2" variant="h5">
          {numeral(props.price).format("$0,0.00")}
        </Typography>
      </Box>
    </Paper>
  );
}

ProductSummary.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
};
