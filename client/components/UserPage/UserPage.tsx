import { UserResponseData } from "@/service/Types";
import { Avatar, Box, Chip, Typography } from "@mui/material";
import React, { useState } from "react";
import { TabsManager } from "../CommentModal/commentModalComponents/TabsManager";
import { CommentsList } from "../CommentModal/commentModalComponents/CommentsList";
import { CustomTabContent } from "../CommentModal/commentModalComponents/CustomTabContent";
import { PostComment } from "../PostComment/PostComment";
import { SinglePost } from "../SinglePost/SinglePost";
import { timeConverter } from "@/service/TimeConverter";

type UserPageProps = {
  user: UserResponseData;
};
export const UserPage: React.FC<UserPageProps> = ({ user }) => {
  const [value, setValue] = useState(0);

  const handleTabChange = (newTabIndex: number) => {
    setValue(newTabIndex);
  };

  // const convertedTime = timeConverter(echoBoard.created);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "100px",
        }}
      >
        <Avatar
          alt={user.name + "avatar"}
          src={user.picture}
          style={{
            width: "150px",
            height: "150px",
          }}
        />
        <Box sx={{ alignSelf: "center" }}>
          <Typography variant="h3" color="textPrimary">
            {user.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            <Chip
              label={"Problems solved: " + user.name.length}
              color="success"
            />
            <Chip label="Volunteered: 5" color="warning" />
            {/* number of solved problems and volunteered are just placeholder for now,
                    real funtionality will be implemented later on */}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15px",
        }}
      >
        <Box className="tabs-container">
          <TabsManager
            labels={[
              "Your posts",
              "Your solutions",
              "Your comments",
              "Volunteering",
            ]}
            onTabChange={handleTabChange}
            currentTabIndex={value}
            defaultTabIndex={0}
          />
            <CustomTabContent value={value} index={0}>
            <Box>
              {user.echoBoards.map((echoBoard, index) => {
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
                        {echoBoard.anonymous ? "Anonymous" : user.name}
                      </Typography>
                      <Typography variant="caption" style={{ color: "gray" }}>
                        {timeConverter(echoBoard.created)}
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
                )
              })}
           
            </Box>
          </CustomTabContent>
        </Box>
      </Box>
    </>
  );
};
