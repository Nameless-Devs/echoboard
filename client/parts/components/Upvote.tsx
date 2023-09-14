import React, { useState } from "react";
import { upvotePost } from "../Functions";
import { UpvoteProps } from "../Types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const Upvote: React.FC<UpvoteProps> = ({ upvote, echoBoardId }) => {
  // const [currentUpvote, setCurrentUpvote] = useState(upvote);

  // const increaseUpvoteNumber = async () => {
  //   const response = await upvotePost(echoBoardId);
  //   if (response.ok) {
  //     setCurrentUpvote(currentUpvote + 1);
  //   } else {
  //     throw new Error(`HTTP Error! Status: ${response.status}`);
  //   }
  // };

  const queryClient = useQueryClient();

  const currentData = queryClient.getQueryData<{ upvote: number }>([
    "echoBoard",
    echoBoardId,
  ]);
  const currentUpvote = currentData ? currentData.upvote : 0; 

  const mutation = useMutation(() => upvotePost(echoBoardId), {
    onSuccess: () => {

      queryClient.invalidateQueries(["echoBoard", echoBoardId]);

      queryClient.refetchQueries(['echoBoard', echoBoardId]);
    },
  });

  return (
    <div>
      {/* <button onClick={() => mutation.mutate()}>upvotes: {currentUpvote}</button> */}
      {/* <button onClick={increaseUpvoteNumber}>upvotes:{currentUpvote}</button> */}

      <button onClick={() => mutation.mutate()}>upvotes: {upvote}</button>
      {mutation.isError ? <div>Error: {(mutation.error as Error).message}</div> : null}

    </div>
  );
};
