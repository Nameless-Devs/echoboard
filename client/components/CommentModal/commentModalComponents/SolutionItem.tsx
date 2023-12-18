import { SolutionResponseData, UserResponseData } from "@/service/Types";
import { Box, Grid, ListItem } from "@mui/material";
import React from "react";
import { SolutionStatusBadge } from "./SolutionStatusBadge";
import { ItemContent } from "./ItemContent";
import { ItemHeader } from "./ItemHeader";

type SolutionItemProps = {
  solution: SolutionResponseData;
  onUpvote: (solutionId: string) => void;
  user?: UserResponseData;
};

export const SolutionItem: React.FC<SolutionItemProps> = ({
  solution,
  onUpvote,
  user,
}) => {
  return (
    <ListItem className="comment-display__individual-comment">
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "0.2rem 0.5rem 0 0 ",
            }}
          >
            <SolutionStatusBadge
              status={solution.status}
              solutionId={solution.id}
            />
          </Box>
        </Grid>
        <ItemHeader
          pictureUrl={solution.echoBoardUser.picture}
          userName={solution.echoBoardUser.name}
          created={solution.created}
        />
        <ItemContent
          content={solution.content}
          upvote={solution.upvote.length}
          onUpvote={onUpvote}
          id={solution.id}
        />
      </Grid>
    </ListItem>
  );
};
