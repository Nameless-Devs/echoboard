import React, { useState } from "react";
import { PostEchoBoardData, UserResponseData } from "../Types";
import { getUserInfo, postEcho } from "../Functions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useCookies } from "react-cookie";

const PostEchoBoard: React.FC<UserResponseData> = (user: UserResponseData) => {
 
  const [echoBoardPost, setProblemPost] = useState<PostEchoBoardData>({
    title: "",
    content: "",
    author: "", //change it later when we have user authentication
  });
  
  const queryClient = useQueryClient();
  const [cookies] = useCookies();

  const mutation = useMutation((data: PostEchoBoardData) => postEcho(data, cookies.JwtToken));

  const handleProblemPost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!echoBoardPost.title.trim() || !echoBoardPost.content.trim()) {
      return;
    }

    mutation.mutate(echoBoardPost, {
      onSuccess: () => {
        queryClient.invalidateQueries(["echoBoards"]);
        setProblemPost({
          title: "",
          content: "",
          author: "",
        });
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minWidth: "300px"
    }}>
      <Typography
        variant="h4"
        style={{ display: "flex", justifyContent: "center", padding: "1rem" }}
      >
        Create a Post with Your Problem
      </Typography>
      <form onSubmit={handleProblemPost}>
        <Box
          sx={{
            "& .MuiTextField-root, & .MuiButton-root, & .MuiTextareaAutosize-root":
            {
              m: 1,
              width: "99%",
              alignSelf: "center",
            },
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
            Make a post
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default PostEchoBoard;
