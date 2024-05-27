import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Typography
      component="h2"
      variant="h2"
      sx={{ color: "secondary.main", fontWeight: "bold", padding: "15px 0" }}
    >
      Welcome
    </Typography>
  );
}
