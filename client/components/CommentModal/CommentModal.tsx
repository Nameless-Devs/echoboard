import React, { useState } from "react";
import { Box, Modal, Button } from "@mui/material";
import { EchoBoardResponseData, UserResponseData } from "@/service/Types";
import { Upvote } from "../Upvote";
import { PostComment } from "../PostComment/PostComment";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchEchoBoardById } from "@/service/Functions";
import "../../app/styles/CommentModal.css";
import { PostSolution } from "../PostSolution";
import { useCookies } from "react-cookie";
import { SinglePost } from "../SinglePost/SinglePost";
import { useUpvote } from "@/hooks/useUpvote";
import { useUpvoteSolution } from "@/hooks/useUpvoteSolution";
import { TabsManager } from "./commentModalComponents/TabsManager";
import { CustomTabContent } from "./commentModalComponents/CustomTabContent";
import { CommentsList } from "./commentModalComponents/CommentsList";
import { SolutionsList } from "./commentModalComponents/SolutionsList";


interface CommentsModalProps {
  post: EchoBoardResponseData;
  handleClose: () => void;
  isOpen: boolean;
  user: UserResponseData;
  defaultTabIndex: number;
}

const CommentsModal: React.FC<CommentsModalProps> = ({
  post,
  handleClose,
  isOpen,
  user,
  defaultTabIndex,
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
      return await fetchEchoBoardById(post.id);
    }
  );

  const displayPost = updatedPost || post;
  const queryClient = useQueryClient();

  const handleSolutionPosted = () => {
    queryClient.refetchQueries(["comments", post.id]);
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box className="model-display" sx={{width: {xs: "100%", md:"60%"}}}>
        <Box mb={1}>
          <SinglePost echoBoard={post} user={user} />
          <Upvote upvote={displayPost.upvote} echoBoardId={displayPost.id} />
        </Box>
        <Box className="tabs-container">
          <TabsManager
            labels={["Comments", "Solutions"]}
            onTabChange={handleTabChange}
            currentTabIndex={value}
            defaultTabIndex={defaultTabIndex}
          />
          <CustomTabContent value={value} index={0}>
            <Box className="comment-display">
              <CommentsList
                comments={displayPost.echoBoardComments}
                onCommentUpvote={(commentId) => upvoteMutation.mutate(commentId)}
              />
              <PostComment echoBoardId={displayPost.id} user={user} />
            </Box>
          </CustomTabContent>
          <CustomTabContent value={value} index={1}>
            <Box className="comment-display">
              <SolutionsList
                solutions={displayPost.echoBoardSolutions}
                onSolutionUpvote={(solutionId) => solutionUpvoteMutation.mutate(solutionId)}
              />
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
      </Box>
    </Modal>
  );
};

export default CommentsModal;
