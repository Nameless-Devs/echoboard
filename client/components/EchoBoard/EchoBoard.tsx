import { EchoBoardResponseData, UserResponseData } from "@/service/Types";
import { fetchEchoBoards, fetchEchoBoardById } from "@/service/Functions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import { useState } from "react";
import CommentsModal from "../CommentModal/CommentModal";
import { PostSolution } from "../PostSolution";
import "../../app/styles/EchoBoard.css";
import EchoBoardCard from "./EchoBoardCard";
import { SinglePostSkeleton } from "./SinglePostSkeleton";
import ErrorComponent from "@/app/error";

export const EchoBoard: React.FC<UserResponseData> = (
  user: UserResponseData
) => {
  const {
    data: echoBoards,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<EchoBoardResponseData[]>(["echoBoards"], () =>
    fetchEchoBoards()
  );

  const [isOpen, setIsOpen] = useState(false);
  const [defaultTabIndex, setDefaultTabIndex] = useState(0);
  const [selectedPost, setSelectedPost] =
    useState<null | EchoBoardResponseData>(null);
  const [isOpenSolution, setIsOpenSolution] = useState(false);
  const [selectedPostForSolution, setSelectedPostForSolution] =
    useState<null | EchoBoardResponseData>(null);
  const [sortByUpvote, setSortByUpvote] = useState(false);

  const sortedEchoBoards = sortByUpvote
    ? [...(echoBoards || [])].sort((a, b) => b.upvote.length - a.upvote.length)
    : [...(echoBoards || [])].sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
      );

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
  };

  const handleOpenCommentsTab = () => {
    setDefaultTabIndex(0);
  };

  const handleOpenSolutionsTab = () => {
    setDefaultTabIndex(1);
  };

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
      return fetchEchoBoardById(selectedPost.id);
    },
    {
      enabled: !!selectedPost,
    }
  );

  return (
    <main className="echo-board-main">
      {sortByUpvote ? (
        <Button onClick={() => setSortByUpvote(false)}>Default</Button>
      ) : (
        <Button variant="outlined" onClick={() => setSortByUpvote(true)}>
          Sort
        </Button>
      )}
      <div className="echo-board-posts">
        {isLoading && <SinglePostSkeleton />}

        {isError && error instanceof Error && (
          <ErrorComponent error={error} reset={refetch} />
        )}

        {sortedEchoBoards?.map((echoBoard, index) => (
          <EchoBoardCard
            key={index}
            echoBoard={echoBoard}
            user={user}
            handleOpen={handleOpen}
            handleOpenSolutionForm={handleOpenSolutionForm}
            index={index}
            handleOpenCommentsTab={handleOpenCommentsTab}
            handleOpenSolutionsTab={handleOpenSolutionsTab}
          />
        ))}
      </div>
      {selectedPost && (
        <CommentsModal
          post={echoBoardDetail || selectedPost}
          handleClose={handleClose}
          isOpen={isOpen}
          user={user}
          defaultTabIndex={defaultTabIndex}
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
