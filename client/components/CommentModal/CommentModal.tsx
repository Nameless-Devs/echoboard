import React, { useState } from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemText,
  Modal,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { EchoBoardResponseData, UserResponseData } from "@/service/Types";
import { Upvote } from "../Upvote";
import { PostComment } from "../PostComment";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchEchoBoardById } from "@/service/Functions";
import Button from "@mui/material/Button";
import "../../app/styles/CommentModal.css";
import { PostSolution } from "../PostSolution";
import { useCookies } from "react-cookie";
import { SinglePost } from "../SinglePost";
import { useUpvote } from "@/hooks/useUpvote";
import UpvoteButton from "../UpvoteButton";
import { SolutionStatusButton } from "../SolutionStatusButton";
import { useUpvoteSolution } from "@/hooks/useUpvoteSolution";
import { CustomTabContent } from "./CustomTabContent";
import { TabsManager } from "../TabsManager";
import { CommentItem } from "./CommentItem";
import { SolutionItem } from "./SolutionItem";

interface CommentsModalProps {
  post: EchoBoardResponseData;
  handleClose: () => void;
  isOpen: boolean;
  user: UserResponseData;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CommentsModal: React.FC<CommentsModalProps> = ({
  post,
  handleClose,
  isOpen,
  user,
}) => {
  const [value, setValue] = useState(0);
  const [isOpenSolution, setIsOpenSolution] = useState(false);
  const [selectedPostForSolution, setSelectedPostForSolution] =
    useState<null | EchoBoardResponseData>(null);

  const [cookies] = useCookies();
  const upvoteMutation = useUpvote(post.id, cookies.JwtToken);
  const solutionUpvoteMutation = useUpvoteSolution(post.id, cookies.JwtToken);

  const handleOpenSolutionForm = (post: EchoBoardResponseData) => {
    setIsOpenSolution(true);
    setSelectedPostForSolution(post);
  };

  const handleCloseSolutionForm = () => {
    setIsOpenSolution(false);
    setSelectedPostForSolution(null);
  };

  const handleTabChange = (newTabIndex: number) => {
    setValue(newTabIndex);
  };

  const { data: updatedPost } = useQuery<EchoBoardResponseData>(
    ["comments", post.id],
    async () => {
      return await fetchEchoBoardById(post.id, cookies.JwtToken);
    }
  );

  const displayPost = updatedPost || post;
  const queryClient = useQueryClient();

  const handleSolutionPosted = () => {
    queryClient.refetchQueries(["comments", post.id]);
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="model-display">
        <Box mb={1}>
          <SinglePost echoBoard={post} user={user} />
          <Upvote upvote={displayPost.upvote} echoBoardId={displayPost.id} />
        </Box>
        <Box className="tabs-container">
          <TabsManager
            labels={["Comments", "Solutions"]}
            onTabChange={handleTabChange}
            currentTabIndex={value}
          />
          <CustomTabContent value={value} index={0}>
            <Box className="comment-display">
              <List>
                {displayPost.echoBoardComments
                  .sort((a, b) => b.upvote.length - a.upvote.length)
                  .map((comment, index) => (
                    <CommentItem
                    key={index}
                    comment={comment}
                    onUpvote={() => upvoteMutation.mutate(comment.id)}
                  />
                  ))}
              </List>
              <PostComment echoBoardId={displayPost.id} user={user} />
            </Box>
          </CustomTabContent>
          <CustomTabContent value={value} index={1}>
            <Box className="comment-display">
              <List>
                {displayPost.echoBoardSolutions
                  .sort((a, b) => b.upvote.length - a.upvote.length)
                  .map((solution, index) => (
                    <SolutionItem
                    key={index}
                    solution={solution}
                    onUpvote={() => solutionUpvoteMutation.mutate(solution.id)}
                  />
                  ))}
              </List>
              <div className="solution-button-container">
                <Button
                  size="medium"
                  onClick={() => handleOpenSolutionForm(displayPost)}
                >
                  Suggest solution
                </Button>
              </div>
            </Box>
          </CustomTabContent>
        </Box>
        {selectedPostForSolution && (
          <PostSolution
            echoBoardId={selectedPostForSolution.id}
            handleClose={handleCloseSolutionForm}
            isOpen={isOpenSolution}
            onSolutionPosted={handleSolutionPosted}
            user={user}
          />
        )}
      </div>
    </Modal>
  );
};

export default CommentsModal;
