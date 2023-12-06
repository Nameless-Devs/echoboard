import { Box } from "@mui/material";
import * as React from "react";
import "../styles/LandingPage.css";
import NavBar from "./NavBar";
import Main from "./Main";
import { FeatureList } from "./FeatureList";
import { About } from "./About";
import { ExtraFeaturesList } from "./ExtraFeaturesList";
import Footer from "./Footer";

const pages = ["Home", "Features", "About", "Contact"];
const home = () => {
  return (
    <>
      <Box className="main__background-picture">
        <NavBar />
        <Main
          title="EchoBoard"
          description="Where Your Voice Amplifies Change!"
        />
      </Box>
      <FeatureList />
      <About />
      <ExtraFeaturesList />
      <Footer />
    </>
  );
};

export default home;
