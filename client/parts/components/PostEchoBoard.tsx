import React, { ChangeEvent, useState } from "react";
import { PostEchoBoardData, UserResponseData } from "../Types";
import { postEcho } from "../Functions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useCookies } from "react-cookie";

const PostEchoBoard: React.FC<UserResponseData> = (user: UserResponseData) => {

  const [ifAnonymous, setIfAnonymous] = useState(false);
  const [echoBoardPost, setProblemPost] = useState<PostEchoBoardData>({
    title: "",
    content: "",
    author: user.name,
    anonymous: false,
  });



  const queryClient = useQueryClient();
  const [cookies] = useCookies();

  const mutation = useMutation((data: PostEchoBoardData) => postEcho(data, cookies.JwtToken));

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setIfAnonymous(event.target.checked);
    setProblemPost((prevEchoBoardPost) => ({
      ...prevEchoBoardPost,
      anonymous: event.target.checked,
    }));
  }

  const handleProblemPost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!echoBoardPost.title.trim() || !echoBoardPost.content.trim()) {
      return;
    }
    console.log(ifAnonymous);

    mutation.mutate(echoBoardPost, {
      onSuccess: () => {
        queryClient.invalidateQueries(["echoBoards"]);
        setProblemPost({
          title: "",
          content: "",
          author: user.name,
          anonymous: false,
        });
        setIfAnonymous(false);
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
      <form onSubmit={handleProblemPost} >

        <Box
          sx={{
            "& .MuiTextField-root, & .MuiButton-root, & .MuiTextareaAutosize-root":
            {
              m: 1,
              width: "99%",
              alignSelf: "center",
            },
          }}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Box style={{ display: "flex" }}>
            <Box>
              <Avatar 
              alt={user.name + "avatar picture"} 
              src={user.picture}
              style={{margin: "10px"}}
               />
            </Box>
            <Box>
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
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    name="Anonymous"
                    checked={ifAnonymous} 
                    style={{marginLeft: "10px"}}/>
                }
                label="Post anonymously"
              />
            </Box>
          </Box>
          <Button 
            variant="outlined" 
            type="submit"
            style={{width: "40%", marginTop: "15px"}}>
            Make a post
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default PostEchoBoard;
