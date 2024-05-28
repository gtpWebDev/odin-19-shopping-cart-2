import { Link, useOutletContext } from "react-router-dom";
import { default as MuiLink } from "@mui/material/Link";

import numeral from "numeral";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

function Cart() {
  const { cartItems, removeCartItem } = useOutletContext();

  const subtotal = cartItems.reduce(
    (total, element) => total + element.price * element.numUnits,
    0
  );

  return (
    <div>
      <Typography
        component="h2"
        variant="h2"
        fontSize={{ xs: "40px", sm: "50px" }}
        sx={{
          color: "primary.main",
          fontWeight: "bold",
          padding: "15px 0",
          textShadow: "1px 1px black",
        }}
      >
        Your Cart...
      </Typography>

      <Container maxWidth="lg" sx={{ marginBottom: "30px" }}>
        <Paper elevation={5}>
          {cartItems.length > 0 ? (
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={2}></TableCell>
                  <TableCell align="center">Units</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Total Price</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cartItems.map((item, index) => {
                  return (
                    <ItemRow
                      key={index}
                      cartItem={item}
                      removeCartItem={removeCartItem}
                    />
                  );
                })}
                <TableRow>
                  <TableCell colSpan={3} />
                  <TableCell colSpan={1} align="center">
                    <Typography
                      component="body1"
                      variant="body1"
                      fontWeight="bold"
                    >
                      Subtotal
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      component="body1"
                      variant="body1"
                      fontWeight="bold"
                    >
                      {numeral(subtotal).format("$0,0.00")}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        alert(
                          `You have not just been charged ${numeral(
                            subtotal
                          ).format("$0,0.00")}`
                        );
                      }}
                      sx={{ minWidth: "120px" }}
                    >
                      Purchase
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableBody>
                <TableRow colSpan={6}>
                  <TableCell align="center">
                    <Typography component="h4" sx={{ padding: "20px" }}>
                      The cart is empty
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </Paper>
      </Container>

      <Link to={"/"}>
        <MuiLink>Return to home page</MuiLink>
      </Link>
    </div>
  );
}

const ItemRow = (props) => {
  return (
    <TableRow>
      <TableCell align="center">
        <img
          style={{
            backgroundColor: "black",
            height: "50px",
          }}
          src={props.cartItem.image}
          alt=""
        />
      </TableCell>
      <TableCell align="center">{props.cartItem.title}</TableCell>
      <TableCell align="center">{props.cartItem.numUnits}</TableCell>
      <TableCell align="center">
        {numeral(props.cartItem.price).format("$0,0.00")}
      </TableCell>
      <TableCell align="center">
        {numeral(props.cartItem.price * props.cartItem.numUnits).format(
          "$0,0.00"
        )}
      </TableCell>
      <TableCell align="center">
        <Button
          variant="text"
          onClick={() => {
            props.removeCartItem(props.cartItem.id);
          }}
          sx={{ minWidth: "120px" }}
        >
          Remove item
        </Button>
      </TableCell>
    </TableRow>
  );
};

ItemRow.propTypes = {
  cartItem: PropTypes.object.isRequired,
};

export default Cart;
