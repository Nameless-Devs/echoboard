import { UserResponseData } from "@/service/Types";
import { Avatar, Box, Chip, Typography } from "@mui/material";
import React, { useState } from "react";
import { TabsManager } from "../CommentModal/commentModalComponents/TabsManager";
import { CustomTabContent } from "../CommentModal/commentModalComponents/CustomTabContent";
import { SingleUserPost } from "./UserPageComponents/SingleUserPost";
import { UserPageInfoSection } from "./UserPageComponents/UserPageInfoSection";

type UserPageProps = {
  user: UserResponseData;
};
export const UserPage: React.FC<UserPageProps> = ({ user }) => {
  const [value, setValue] = useState(0);

  const handleTabChange = (newTabIndex: number) => {
    setValue(newTabIndex);
  };

  return (
    <>
      <UserPageInfoSection user={user} /> 
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
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
                  <SingleUserPost key={index} echoBoard={echoBoard} user={user} />
                )
              })}

            </Box>
          </CustomTabContent>
        </Box>
      </Box>
    </>
  );
};
