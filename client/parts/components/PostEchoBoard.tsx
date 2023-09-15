import React, {useState} from 'react'
import { PostEchoBoardData } from '../Types';
import { postEcho } from '../Functions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Button, Card, TextField, TextareaAutosize, Typography } from '@mui/material';
import { addSyntheticLeadingComment } from 'typescript';

const PostEchoBoard = () => {
    const [echoBoardPost, setProblemPost] = useState<PostEchoBoardData>({
        title: "",
        content: "", 
        author: "" //change it later when we have user authentication
      });

      const queryClient  = useQueryClient();

      const mutation = useMutation(postEcho);
      
      const handleProblemPost = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!echoBoardPost.title.trim() || !echoBoardPost.content.trim()) {
          return;
        }

        mutation.mutate(echoBoardPost, {
            onSuccess: () => {
              queryClient.invalidateQueries(["echoBoards"])
                setProblemPost({
                    title: '',
                    content: '',
                    author: ''
                });
            },
            onError: (error) => {
                console.error("Error:", error);
            }
        });
    };

  return (
    <div >
    <Typography variant="h4" 
    style={{ display: 'flex', justifyContent: "center" }}>
      Create a Post with Your Problem</Typography>
    <form onSubmit={handleProblemPost}>
      <Box
        sx={{
          '& .MuiTextField-root, & .MuiButton-root, & .MuiTextareaAutosize-root': {
            m: 1,
            width: '99%',
            alignSelf: "center"
          },
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TextField
          label="Title"
          variant="outlined"
          name="title"
          value={echoBoardPost.title}
          onChange={(e) =>
            setProblemPost({ ...echoBoardPost, title: e.target.value })
          }
        />
        <TextField
          label="Description"
          id="filled-multiline-static"
          multiline
          name="content"
          minRows={5}
          value={echoBoardPost.content}
          onChange={(e) =>
            setProblemPost({ ...echoBoardPost, content: e.target.value })
          }
        />
        <TextField
          label="Enter your name"
          name="author"
          type="text"
          variant="outlined"
          value={echoBoardPost.author}
          onChange={(e) =>
            setProblemPost({ ...echoBoardPost, author: e.target.value })
          }
        />
        <Button variant="outlined" type="submit">
          Submit Query
        </Button>
      </Box>
    </form>
  </div>
  )
}

export default PostEchoBoard