import { Badge, styled } from "@mui/material";

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    bottom: 0, // Position the badge at the bottom
    right: 0, // Position the badge at the right
    transform: "none",
  },
}));
