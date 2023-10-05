import React from 'react';
import { UpvoteProps } from '@/service/Types';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import Button from '@mui/material/Button';
import { useCookies } from 'react-cookie';
import { fetchEchoBoardById, upvotePost } from '@/service/Functions';

export const Upvote: React.FC<UpvoteProps> = ({ echoBoardId }) => {
  const queryClient = useQueryClient();
  const [cookies] = useCookies();

  const { data: echoData } = useQuery(['echoBoard', echoBoardId], () => 
     fetchEchoBoardById(echoBoardId, cookies.JwtToken)
  );
  const upvoteCount = echoData ? echoData.upvote : 0;

  const mutation = useMutation(
    () => upvotePost(echoBoardId, cookies.JwtToken), 
    {
    onSuccess: () => {
      queryClient.invalidateQueries(['echoBoard', echoBoardId]);
      queryClient.refetchQueries(['echoBoard', echoBoardId]);
      },
    }
  );


  return (
    <div>
      <Button size="small" onClick={() => mutation.mutate()}>
        upvotes: {upvoteCount}
      </Button>
      {mutation.isError ? <div>Error: {(mutation.error as Error).message}</div> : null}
    </div>
  );
};
