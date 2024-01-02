import { EchoBoardResponseData } from "@/service/Types";
import { fetchEchoBoards, fetchEchoBoardById } from "@/service/Functions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import { useState } from "react";
import "../../app/styles/EchoBoard.css";
import EchoBoardCard from "./EchoBoardCard";
import { SinglePostSkeleton } from "./SinglePostSkeleton";
import ErrorComponent from "@/app/error";

export const NoUserEchoBoard = () => {
    const {
        data: echoBoards,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery<EchoBoardResponseData[]>(["echoBoards"], () =>
        fetchEchoBoards()
    );

    const doNothing = () => {}

    const [selectedPost, setSelectedPost] =
        useState<null | EchoBoardResponseData>(null);
    const [sortByUpvote, setSortByUpvote] = useState(false);

    const sortedEchoBoards = sortByUpvote
        ? [...(echoBoards || [])].sort((a, b) => b.upvote.length - a.upvote.length)
        : [...(echoBoards || [])].sort(
            (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
        );

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
            <h2>EchoBoard All Posts</h2>
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
                        handleOpen={doNothing}
                        handleOpenSolutionForm={doNothing}
                        index={index}
                        handleOpenCommentsTab={doNothing}
                        handleOpenSolutionsTab={doNothing}
                    />
                ))}
            </div>
        </main>
    );
};
