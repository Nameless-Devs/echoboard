import { EchoBoardResponseData, CommentResponseData, UserResponseData } from "../Types";
import { fetchEchoBoards, fetchEchoBoardById, getUserInfo } from "../Functions";
import { SinglePost } from "./SinglePost";
import { Upvote } from "./Upvote";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { PostComment } from "./PostComment";
import { useState } from "react";
import CommentsModal from "./CommentModal";
import { PostSolution } from "./PostSolution";
import { useCookies } from "react-cookie";

export const EchoBoard: React.FC<UserResponseData> = (user: UserResponseData) => {

  const [cookies] = useCookies();

  const {
    data: echoBoards,
    isLoading,
    isError,
  } = useQuery<EchoBoardResponseData[]>(["echoBoards"], () => fetchEchoBoards(cookies.JwtToken));


  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] =
    useState<null | EchoBoardResponseData>(null);
  const [isOpenSolution, setIsOpenSolution] = useState(false);
  const [selectedPostForSolution, setSelectedPostForSolution] =
  useState<null | EchoBoardResponseData>(null);
  const [sortByUpvote, setSortByUpvote] = useState(false);

  const sortedEchoBoards = sortByUpvote
  ? [...(echoBoards || [])].sort((a, b) => b.upvote - a.upvote)
  : [...(echoBoards || [])].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());


  const handleOpen = (post: EchoBoardResponseData) => {
    setIsOpen(true);
    setSelectedPost(post);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedPost(null);
  };

  const handleOpenSolutionForm = (post: EchoBoardResponseData) => {
    setIsOpenSolution(true);
    setSelectedPostForSolution(post);
  }

  const handleCloseSolutionForm = () => {
    setIsOpenSolution(false);
    setSelectedPostForSolution(null);
  };
  const queryClient = useQueryClient();

  const handleSolutionPosted = () => {
    queryClient.invalidateQueries(["echoBoards"]);
    queryClient.refetchQueries(["solutions", selectedPost?.id]);
  };

  const { data: echoBoardDetail } = useQuery(
    ["echoBoard", selectedPost?.id],
    () => {
      if (!selectedPost?.id) throw new Error("No post selected");
      return fetchEchoBoardById(selectedPost.id, cookies.JwtToken);
    },
    {
      enabled: !!selectedPost,
    }
  );

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>EchoBoard All Posts</h2>
      {sortByUpvote ? (
        <Button onClick={() => setSortByUpvote(false)}>Default</Button>
      ):(
        <Button variant="outlined" onClick={() => setSortByUpvote(true)}>Sort</Button>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error!</p>}
        {sortedEchoBoards?.map((echoBoard, index) => (
          <Card
            key={index}
            sx={{
              maxWidth: 345,
              minWidth: 345,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent
              sx={{
                flex: "1 1 auto",
              }}
            >
              <SinglePost {...echoBoard} />
            </CardContent>
            <CardActions>
              <Upvote upvote={echoBoard.upvote} echoBoardId={echoBoard.id} />
              <Button size="small" onClick={() => handleOpen(echoBoard)}>
                Comments: {echoBoard.echoBoardComment.length}
              </Button>
              <Button size="small" onClick={() => handleOpen(echoBoard)}>
                Solutions: {echoBoard.echoBoardSolutions.length}
              </Button>
            </CardActions>
            <PostComment echoBoardId={echoBoard.id} user={user} />
            <Button size="medium" onClick={() => handleOpenSolutionForm(echoBoard)} >
              Suggest solution
            </Button>
  
          </Card>
        ))}
      </div>
      {selectedPost && (
        <CommentsModal
          post={echoBoardDetail || selectedPost}
          handleClose={handleClose}
          isOpen={isOpen}
          user={user}
        />
      )}

      {selectedPostForSolution && (
        <PostSolution 
        echoBoardId={selectedPostForSolution.id} 
        handleClose={handleCloseSolutionForm}
        isOpen={isOpenSolution}
        onSolutionPosted={handleSolutionPosted}
        user={user}
        />
      )}
    </main>
  );
};
