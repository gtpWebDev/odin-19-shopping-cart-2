import { Link, useOutletContext } from "react-router-dom";

import ProductSummary from "./ProductSummary";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Shop() {
  const { shopItems } = useOutletContext();

  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
      <Grid item xs={12}>
        <Typography
          component="h2"
          variant="h2"
          sx={{
            color: "secondary.main",
            fontWeight: "bold",
            padding: "15px 0",
          }}
        >
          Our Products
        </Typography>
      </Grid>

      {shopItems.map((element) => {
        return (
          <Grid key={element.id} item xs={12} sm={6} md={4} lg={3}>
            <Link to={`/product/${element.id}`}>
              <ProductSummary
                title={element.title}
                price={element.price}
                imageUrl={element.image}
              />
            </Link>
          </Grid>
        );
      })}
    </Grid>
  );
}
