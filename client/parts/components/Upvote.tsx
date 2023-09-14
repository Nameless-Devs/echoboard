import React from 'react';
import { upvotePost, fetchEchoBoardById } from '../Functions';
import { UpvoteProps } from '../Types';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

export const Upvote: React.FC<UpvoteProps> = ({ echoBoardId }) => {
  const queryClient = useQueryClient();

  const { data: echoData } = useQuery(['echoBoard', echoBoardId], () => fetchEchoBoardById(echoBoardId));
  const upvoteCount = echoData ? echoData.upvote : 0;

  const mutation = useMutation(() => upvotePost(echoBoardId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['echoBoard', echoBoardId]);
      queryClient.refetchQueries(['echoBoard', echoBoardId]);
    }
  });

  return (
    <div>
      <button onClick={() => mutation.mutate()}>upvotes: {upvoteCount}</button>
      {mutation.isError ? <div>Error: {(mutation.error as Error).message}</div> : null}
    </div>
  );
};
