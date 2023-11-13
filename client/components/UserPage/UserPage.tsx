import { UserResponseData } from "@/service/Types";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { TabsManager } from "../CommentModal/commentModalComponents/TabsManager";
import { CustomTabContent } from "../CommentModal/commentModalComponents/CustomTabContent";
import { SingleUserPost } from "./UserPageComponents/SingleUserPost";
import { UserPageInfoSection } from "./UserPageComponents/UserPageInfoSection";
import { SolutionItem } from "../CommentModal/commentModalComponents/SolutionItem";

type UserPageProps = {
  user: UserResponseData;
};
export const UserPage: React.FC<UserPageProps> = ({ user }) => {
  const [value, setValue] = useState(0);

  const handleTabChange = (newTabIndex: number) => {
    setValue(newTabIndex);
  };

  const onUpvote = () => {
   console.log('You pressed upvote button');
  }

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
        <Box sx={{width: {xs: "100vw", md: "auto"}, margin: "auto"}}>
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
              {user.echoBoards.length === 0 ? (
                <p>You have not made any posts yet.</p>
              ) : (
                user.echoBoards
                  .slice()
                  .sort((a, b) => {
                    return new Date(b.created).getTime() - new Date(a.created).getTime();
                  })
                  .map((echoBoard, index) => {
                    return <SingleUserPost key={index} echoBoard={echoBoard} user={user} />;
                  })
              )}
            </Box>
          </CustomTabContent>
          <CustomTabContent value={value} index={1}>
            <Box>
               {user.echoBoardSolutions.length === 0 ? (
                <p>You have not suppested any solutions yet.</p>
               ) : (
                user.echoBoardSolutions
                  .slice()
                  .sort((a, b) => {
                    return new Date(b.created).getTime() - new Date(a.created).getTime();
                  })
                  .map((solution, index) => {
                    return (
                    <>
                   <Typography>{solution.content}</Typography> 
                    </>
                    );
                  })
               )}
            </Box>
          </CustomTabContent>
        </Box>
      </Box>
    </>
  );
};
