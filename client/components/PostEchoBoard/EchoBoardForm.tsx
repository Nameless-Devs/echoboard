import { PostEchoBoardData, UserResponseData } from '@/service/Types'
import { Avatar, Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import React, { ChangeEvent } from 'react'

type EchoBoardFormProps = {
  echoBoardPost: PostEchoBoardData;
  setProblemPost: (post: PostEchoBoardData) => void;
  ifAnonymous: boolean;
  handleProblemPost: (event?: React.FormEvent<HTMLFormElement>) => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  user: UserResponseData;
  handleIfAnonymousChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const EchoBoardForm: React.FC<EchoBoardFormProps> = ({
  echoBoardPost,
  setProblemPost,
  ifAnonymous,
  handleProblemPost,
  handleKeyPress,
  user,
  handleIfAnonymousChange
}
) => {
  return (
    <form onSubmit={handleProblemPost}>
      <Box
        sx={{
          "& .MuiTextField-root, & .MuiButton-root, & .MuiTextareaAutosize-root": {
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
              style={{ margin: "10px" }}
            />
          </Box>
          <Box style={{ marginRight: "50px" }}>
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
              onKeyDown={handleKeyPress}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleIfAnonymousChange}
                  name="Anonymous"
                  checked={ifAnonymous}
                  style={{ marginLeft: "10px" }}
                />
              }
              label="Post anonymously"
            />
          </Box>
        </Box>
        <Button
          variant="outlined"
          type="submit"
          style={{ width: "40%", marginTop: "15px" }}
        >
          Make a post
        </Button>
      </Box>
    </form>
  );

}
