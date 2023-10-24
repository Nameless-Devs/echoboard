import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface FooterProps {
  description: string;
  title: string;
}

export default function Footer() {
  

  return (
    <Grid
      item
      xs={12}
      md={4}
      style={{ position: "fixed", bottom: 0, width: "100%" }}
    >
      <Paper elevation={0} sx={{ p: 2, bgcolor: "#6c9bd3" }}>
        <Typography variant="h6" gutterBottom>
          title
        </Typography>
        <Typography>description</Typography>
      </Paper>
    </Grid>
  );
}
