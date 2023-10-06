import React, { useState } from "react";
import { Modal, List, ListItem, ListItemText, Tabs, Tab } from "@mui/material";
import Typography from "@mui/material/Typography";
import { EchoBoardResponseData, UserResponseData } from "@/service/Types";
import { Upvote } from "./Upvote";
import { PostComment } from "./PostComment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchEchoBoardById, upvoteSolution } from "@/service/Functions";
import { upvoteComment } from "@/service/Functions";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import "../app/styles/CommentModalStyles.css";
import { PostSolution } from "./PostSolution";
import { useCookies } from "react-cookie";
import { SinglePost } from "./SinglePost";
import { useUpvote } from "@/hooks/useUpvote";
import UpvoteButton from "./UpvoteButton";

interface CommentsModalProps {
  post: EchoBoardResponseData;
  handleClose: () => void;
  isOpen: boolean;
  user: UserResponseData;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
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

  const handleOpenSolutionForm = (post: EchoBoardResponseData) => {
    setIsOpenSolution(true);
    setSelectedPostForSolution(post);
  };

  const handleCloseSolutionForm = () => {
    setIsOpenSolution(false);
    setSelectedPostForSolution(null);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { data: updatedPost } = useQuery<EchoBoardResponseData>(
    ["comments", post.id],
    async () => {
      const result = await fetchEchoBoardById(post.id, cookies.JwtToken);
      return result;
    }
  );

  const displayPost = updatedPost || post;
  const queryClient = useQueryClient();

  const handleSolutionPosted = () => {
    queryClient.refetchQueries(["comments", post.id]);
  };

  const mutation1 = useMutation(
    (solutionId: string) =>
      upvoteSolution(post.id, solutionId, cookies.JwtToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["echoBoards"]);
        queryClient.invalidateQueries(["comments", post.id]);
      },
    }
  );
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div
        style={{
          padding: "20px",
          background: "#fff",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "5px",
          width: "60%",
        }}
      >
        <Box mb={1}>
          <SinglePost echoBoard={post} user={user} />
          <Upvote upvote={displayPost.upvote} echoBoardId={displayPost.id} />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Comments" {...a11yProps(0)} />
              <Tab label="Solutions" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Box
              className="comment-display"
              style={{ maxHeight: "300px", overflow: "auto" }}
            >
              <List>
                {displayPost.echoBoardComments
                  .sort((a, b) => b.upvote - a.upvote)
                  .map((comment, index) => (
                    <ListItem
                      className="comment-display__individual-comment"
                      key={index}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="body2" color="textSecondary">
                            {comment.author}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" color="textPrimary">
                            {comment.content}
                          </Typography>
                        }
                      ></ListItemText>
                      
                    </ListItem>
                  ))}
              </List>
              <PostComment echoBoardId={displayPost.id} user={user} />
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Box
              className="comment-display"
              style={{ maxHeight: "300px", overflow: "auto" }}
            >
              <List>
                {displayPost.echoBoardSolutions
                  .sort((a, b) => b.upvote - a.upvote)
                  .map((solution, index) => (
                    <ListItem
                      className="comment-display__individual-comment"
                      key={index}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="body2" color="textSecondary">
                            {solution.author}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" color="textPrimary">
                            {solution.content}
                          </Typography>
                        }
                      ></ListItemText>
                      <Button onClick={() => mutation1.mutate(solution.id)}>
                        Upvote: {solution.upvote}
                      </Button>
                    </ListItem>
                  ))}
              </List>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  size="medium"
                  onClick={() => handleOpenSolutionForm(displayPost)}
                >
                  Suggest solution
                </Button>
              </div>
            </Box>
          </CustomTabPanel>
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
