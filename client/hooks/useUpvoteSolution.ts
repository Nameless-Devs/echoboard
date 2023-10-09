import { upvoteSolution } from "@/service/Functions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpvoteSolution = (postId: string, jwtToken: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (solutionId: string) => upvoteSolution(postId, solutionId, jwtToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["echoBoards"]);
        queryClient.invalidateQueries(["comments", postId]);
      },
    }
  );

  return mutation;
};
