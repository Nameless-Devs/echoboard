import React, { useState } from 'react'
import { SolutionToPost } from '../Types';
import { Button, Modal, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postSolution } from '../Functions';
import { error } from 'console';

type SolutionProps = {
    echoBoardId: string; 
    handleClose: () => void;
    isOpen: boolean;
}

export const PostSolution: React.FC<SolutionProps> = ({
    echoBoardId,
    handleClose,
    isOpen
}) => {
    const [solutionToPost, setSolutionToPost] = useState<SolutionToPost>({
        author: "",
        content: ""
    });

   const queryClient = useQueryClient();
   const mutation = useMutation((data: SolutionToPost) => postSolution(data, echoBoardId));

   const handleSolutionPost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!solutionToPost.author.trim() || !solutionToPost.content.trim()){
        return;
    }

    mutation.mutate(solutionToPost, {
        onSuccess: () => {
            queryClient.invalidateQueries(["echoBoards"]);
            queryClient.refetchQueries(["solutions", echoBoardId]);
            setSolutionToPost({
                author: "",
                content: ""
            });
        },
        onError: (error) => {
            console.error("Error:", error);
        },
    });
   }
  return (
    <Modal open={isOpen} onClose={handleClose} >
        <form className='post-comment__form' onSubmit={handleSolutionPost}>
            <TextField className='post-comment__name-input'
                    label="Enter your name"
                    variant="outlined"
                    name="author"
                    size="small"
                    value={solutionToPost.author}
                    onChange={(e) =>
                    setSolutionToPost({ ...solutionToPost, author: e.target.value }) }/>
            <TextField className='post-comment__comment'
                    label="Solution"
                    variant="outlined"
                    name="content"
                    multiline
                    rows={2}
                    value={solutionToPost.content}
                    onChange={(e) =>
                    setSolutionToPost({ ...solutionToPost, content: e.target.value }) }/>
            <Button className='post-comment__button' variant="outlined" type="submit">
                    Suggest solution
            </Button>
            
        </form>
        </Modal>
  )
}
