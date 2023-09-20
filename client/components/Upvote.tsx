import React from "react";
import { upvotePost, fetchEchoBoardById } from "./Function";
import { UpvoteProps } from "./types";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import Button from "@mui/material/Button";

export const Upvote: React.FC<UpvoteProps> = ({ echoBoardId }) => {
  const queryClient = useQueryClient();

  const { data: echoData } = useQuery(["echoBoard", echoBoardId], () =>
    fetchEchoBoardById(echoBoardId)
  );
  const upvoteCount = echoData ? echoData.upvote : 0;

  const mutation = useMutation(() => upvotePost(echoBoardId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["echoBoard", echoBoardId]);
      queryClient.refetchQueries(["echoBoard", echoBoardId]);
    },
  });

  return (
    <div>
      <Button size="small" onClick={() => mutation.mutate()}>
        upvotes: {upvoteCount}
      </Button>
      {mutation.isError ? (
        <div>Error: {(mutation.error as Error).message}</div>
      ) : null}
    </div>
  );
};
