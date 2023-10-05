import React from "react";
import { EchoBoardResponseData, UserResponseData } from "@/service/Types";
import Typography from "@mui/material/Typography";
import { Avatar, Box } from "@mui/material";
import { timeConverter } from "@/service/TimeConverter";

type SinglePostProps = 
{
  echoBoard: EchoBoardResponseData;
  user: UserResponseData;
};

export const SinglePost: React.FC<SinglePostProps> = ({
echoBoard,
user
}) => {
  const convertedTime = timeConverter(echoBoard.created);
  return (
    <>
      <Box 
      sx={{
        display: "flex", 
        gap: "8px", 
        alignItems: "center",
        marginBottom: "10px"}}
        >
        <Avatar src={user.picture}  />
        <Box>
          <Typography variant="subtitle1">
            {echoBoard.anonymous ? "Anonymous" : echoBoard.author}
          </Typography>
          <Typography variant="caption">
            {convertedTime}
          </Typography>
        </Box>
      </Box>
      <Typography gutterBottom variant="h5" component="div">
        {echoBoard.title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        <p>{echoBoard.content}</p>
      </Typography>
    </>
  );
};
