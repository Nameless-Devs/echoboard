import { Badge, styled } from "@mui/material";

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    bottom: 0,
    right: 0,
    transform: "none",
  },
}));
