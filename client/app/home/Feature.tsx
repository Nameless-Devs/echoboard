"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import "../styles/Feature.css";
import VisibilitySensor from "react-visibility-sensor";

type FeatureProps = {
  icon: React.ReactElement;
  title: string;
  description: string;
  reverseOnDesktop?: boolean;
};

export const Feature: React.FC<FeatureProps> = ({
  icon,
  title,
  description,
  reverseOnDesktop,
}) => {
  const [animate, setAnimate] = useState(false);

  const onVisibilityChange = (isVisible: boolean) => {
    if (isVisible) setAnimate(isVisible);
  };
  return (
    <VisibilitySensor onChange={onVisibilityChange}>
      <Box
        className={`pop-up ${animate ? "active" : ""}`}
        sx={{
          textAlign: { xs: "left", md: reverseOnDesktop ? "right" : "left" },
          display: "flex",
          padding: "1rem",
          m: {
            xs: "0.5rem",
            md: reverseOnDesktop ? "0 1.5rem 0 0" : "0 0 0 1.5rem",
          },
          borderRadius: { xs: "50px", md: "20px" },
          backgroundColor: "#f9e8dd",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        }}
      >
        {reverseOnDesktop && (
          <>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              {icon}
              <Box ml={"10px"}>
                <Typography variant="h5" sx={{ fontSize: "1.4rem" }}>
                  {title}
                </Typography>
                <Typography variant="body1">{description}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Box mr={"20px"}>
                <Typography variant="h5" sx={{ fontSize: { md: "2rem" } }}>
                  {title}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: { md: "1.2rem" } }}>
                  {description}
                </Typography>
              </Box>
              {icon}
            </Box>
          </>
        )}
        {!reverseOnDesktop && (
          <>
            <Box display={"flex"}>
              {icon}
              <Box ml={"5px"}>
                <Typography
                  variant="h5"
                  sx={{ fontSize: { xs: "1.4rem", md: "2rem" } }}
                >
                  {title}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: { md: "1.2rem" } }}>
                  {description}
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </VisibilitySensor>
  );
};
