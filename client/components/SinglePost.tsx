import React from "react";
import { EchoBoardResponseData, UserResponseData } from "@/service/Types";
import Typography from "@mui/material/Typography";
import { Avatar, Box } from "@mui/material";
import { timeConverter } from "@/service/TimeConverter";

type SinglePostProps = {
  echoBoard: EchoBoardResponseData;
  user: UserResponseData;
};

export const SinglePost: React.FC<SinglePostProps> = ({ echoBoard, user }) => {
  const convertedTime = timeConverter(echoBoard.created);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Avatar src={echoBoard.anonymous ? " " : user.picture} />
        <Box>
          <Typography variant="subtitle1" style={{ marginBottom: "-5px" }}>
            {echoBoard.anonymous ? "Anonymous" : echoBoard.echoBoardUser.name}
          </Typography>
          <Typography variant="caption" style={{ color: "gray" }}>
            {convertedTime}
          </Typography>
        </Box>
      </Box>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        style={{ margin: "10px 0px 4px" }}
      >
        {echoBoard.title}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        style={{ margin: "0px" }}
      >
        {echoBoard.content}
      </Typography>
    </>
  );
};
