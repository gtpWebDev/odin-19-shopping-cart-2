import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import mainImage from "./assets/images/home-page-img.jpg";

export default function Home() {
  const repeatArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingTop: "30px",
      }}
    >
      <Paper elevation={5}>
        <Grid container>
          {repeatArray.map((element) => {
            return (
              <Grid key={element} item xs={4}>
                <img style={{ width: "100%" }} src={mainImage} alt="" />
              </Grid>
            );
          })}
        </Grid>

        {/* <img style={{ width: "100%" }} src={mainImage} alt="" /> */}
        {/* <Typography
          component="h2"
          variant="h2"
          sx={{
            color: "primary.main",
            fontWeight: "bold",
            padding: "15px 0",
            textShadow: "1px 1px black",
          }}
        >
          Welcome
        </Typography> */}
      </Paper>
    </Container>
  );
}
