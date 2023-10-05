import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Header from "./Header";
import Footer from "./Footer";
import MainFeatured from "./Main";

const echoBoardHeader = {
  title: "EchoBoard",
};

const mainFeature = {
  title: "EchoBoard",
  description: "Where Your Voice Amplifies Change!",
};

const home = () => {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "	#343434" }}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title={echoBoardHeader.title} />
        <Grid>
          <MainFeatured
            title={mainFeature.title}
            description={mainFeature.description}
          />
        </Grid>
      </Container>
      <Footer
        title="Developers"
        description="Something here to give the footer a purpose!"
      />
    </main>
  );
};

export default home;
