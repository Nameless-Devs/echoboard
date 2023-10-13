import { EchoBoardUser } from "@/service/Types";
import { Avatar, Box, Typography } from "@mui/material";

type UserInfoProp = {
  anonymous: boolean;
  user: EchoBoardUser;
  convertedTime: string;
};

// Working in progress #Nate

export const SinglePostUserInfo: React.FC<UserInfoProp> = ({
  anonymous,
  user,
  convertedTime,
}) => {
  const userName = anonymous ? "Anonymous" : user.name;
  const userImage = anonymous ? " " : user.picture;

  return (
    <Box
      sx={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      <Avatar src={userImage} />
      <Box>
        <Typography variant="subtitle1" sx={{ marginBottom: "-5px" }}>
          {userName}
        </Typography>
        <Typography variant="caption" sx={{ color: "gray" }}>
          {convertedTime}
        </Typography>
      </Box>
    </Box>
  );
};
