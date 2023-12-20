import React from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  Box,
  Button,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { ButtonInfo, UserResponseData } from "@/service/Types";
import "../app/styles/AccountMenu.css";
import { ENDPOINTS } from "@/service/config";
import { useRouter } from "next/navigation";
import MenuIcon from '@mui/icons-material/Menu';

type AccountMenuProps = {
  buttons: ButtonInfo[];
  user: UserResponseData
}

export const AccountMenu: React.FC<AccountMenuProps> = ({
  user, 
  buttons,
}
) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box className="account-menu__flex-container">
        <Box className="account-menu__avatar-container">
          <Tooltip title="Account settings" className="account-menu__tooltip">
            <IconButton
              onClick={handleClick}
              size="small"
              className="account-menu__icon-button"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <MenuIcon fontSize="large" sx={{ color: "white" }}/>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          className="account-menu"
          MenuListProps={{ className: "account-menu__list" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "center" }}
        >
          <MenuItem
            className="account-menu__link"
            sx={{justifyContent: "right"}}
            onClick={() => router.push("/userProfile")}
          >
            <Avatar src={user.picture}/> Profile
          </MenuItem>
          {buttons.map((button, index) => (
            <MenuItem 
            key={index} 
            color="inherit" 
            sx={{justifyContent: "right"}} 
            onClick={() => router.push(button.link)}>
              {button.label}
            </MenuItem>
          ))}
          <Divider />
          <MenuItem
            className="account-menu__link"
            onClick={() => (window.location.href = ENDPOINTS.LOGOUT)}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};
