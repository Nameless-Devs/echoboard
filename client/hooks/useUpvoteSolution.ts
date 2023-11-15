import { upvoteSolution } from "@/service/Functions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpvoteSolution = (postId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (solutionId: string) => upvoteSolution(postId, solutionId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["echoBoards"]);
        queryClient.invalidateQueries(["comments", postId]);
      },
    }
  );

  return mutation;
};
