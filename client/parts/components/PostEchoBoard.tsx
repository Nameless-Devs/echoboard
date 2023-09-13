import React, {useState} from 'react'
import { PostEchoBoardData } from '../Types';
import { postEcho , fetchEchoBoards } from '../Functions';
import { useMutation } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const PostEchoBoard = () => {
    const [echoBoardPost, setProblemPost] = useState<PostEchoBoardData>({
        title: "",
        content: "", 
        author: "" //change it later when we have user authentication
      });

      const mutation = useMutation(postEcho);
      const handleProblemPost = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!echoBoardPost.title.trim() || !echoBoardPost.content.trim()) {
          return;
        }

        mutation.mutate(echoBoardPost, {
            onSuccess: () => {
                setProblemPost({
                    title: '',
                    content: '',
                    author: ''
                });
                fetchEchoBoards();
                
            },
            onError: (error) => {
                console.error("Error:", error);
            }
        });
    };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <h2>Create post with your problem</h2>
        <form onSubmit={handleProblemPost}>
          <div>
          <TextField
            id="outlined-helperText"
            label="Name"
            defaultValue="Anonymous"
            value={echoBoardPost.author}
              onChange={(e) => setProblemPost({...echoBoardPost, author: e.target.value})}
          />
          </div>
          <div>
          <TextField
          required
          id="outlined-required"
          label="Title"
          value={echoBoardPost.title}
          onChange={(e) => setProblemPost({...echoBoardPost, title: e.target.value})}
          />
          </div>
          <div>
          <TextField
            required
            id="standard-multiline-flexible"
            label="Content"
            multiline
            value={echoBoardPost.content}
            onChange={(e) => setProblemPost({...echoBoardPost, content: e.target.value})}
          />
          </div>
        <input type="submit" />
      </form>   
    </Box>
  )
}

export default PostEchoBoard