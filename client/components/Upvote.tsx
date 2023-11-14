import React from "react";
import { UpvoteProps } from "@/service/Types";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import { fetchEchoBoardById, upvotePost } from "@/service/Functions";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

export const Upvote: React.FC<UpvoteProps> = ({ upvote, echoBoardId }) => {
  const queryClient = useQueryClient();

  const { data: echoData } = useQuery(["echoBoard", echoBoardId], () =>
    fetchEchoBoardById(echoBoardId)
  );
  const upvoteCount = echoData ? echoData.upvote.length : upvote.length;

  const mutation = useMutation(
    () => upvotePost(echoBoardId),
    {
      onSuccess: () => {
        console.log('upvote sent')
        queryClient.invalidateQueries(["echoBoard", echoBoardId]);
        queryClient.refetchQueries(["echoBoard", echoBoardId]);
      },
    }
  );

  return (
    <div>
      <Button size="small" onClick={() => mutation.mutate()}>
        <ThumbUpIcon />
        {upvoteCount}
      </Button>
      {mutation.isError ? (
        <div>Error: {(mutation.error as Error).message}</div>
      ) : null}
    </div>
  );
};
