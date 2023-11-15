import { upvoteComment } from "@/service/Functions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpvote = (postId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (commentId: string) => upvoteComment(postId, commentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["echoBoards"]);
        queryClient.invalidateQueries(["comments", postId]);
      },
    }
  );

  return mutation;
};
