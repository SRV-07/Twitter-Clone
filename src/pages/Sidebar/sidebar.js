import React, { useState } from "react";
import "./sidebar.css";
import XIcon from "@mui/icons-material/X";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BookmarkIcon from "@mui/icons-material/Bookmark";
// import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ListIcon from "@mui/icons-material/List";
// import { Search } from "@mui/icons-material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import CustomLinks from "./CustomLinks";
import useLoggedInUser from "../../hooks/useLoggedInUser";

const Sidebar = ({ handleLogOut, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [loggedInUser] = useLoggedInUser();

  const userProfilePic = loggedInUser[0]?.profileImage
    ? loggedInUser[0]?.profileImage
    : "https://pixabay.com/vectors/avatar-icon-placeholder-profile-3814049/";

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const result = user?.email?.split("@")[0];

  return (
    <div className="sidebar">
      <XIcon className="sidebar_xicon" />
      <CustomLinks to="/feed">
        <SidebarOption active Icon={HomeIcon} text="Home" />
      </CustomLinks>
      <CustomLinks to="/explore">
        <SidebarOption active Icon={SearchIcon} text="Explore" />
      </CustomLinks>
      <CustomLinks to="/Notification">
        <SidebarOption active Icon={NotificationsIcon} text="Notification" />
      </CustomLinks>
      <CustomLinks to="/Bookmarks">
        <SidebarOption active Icon={BookmarkIcon} text="BookMark" />
      </CustomLinks>
      <CustomLinks to="/Messages">
        <SidebarOption active Icon={MailOutlineIcon} text="Message" />
      </CustomLinks>
      <CustomLinks to="/Profile">
        <SidebarOption active Icon={PermIdentityIcon} text="Profile" />
      </CustomLinks>
      <CustomLinks to="/Lists">
        <SidebarOption active Icon={ListIcon} text="Lists" />
      </CustomLinks>
      <CustomLinks to="/More">
        <SidebarOption active Icon={MoreHorizIcon} text="More" />
      </CustomLinks>

      <Button variant="outlined" className="sidebar_tweet">
        Tweet
      </Button>
      

      <div className="Profile_info">
        <Avatar src={userProfilePic}></Avatar>
        <div className="user_info">
          <h4>
            {
              loggedInUser[0]?.name
              ? loggedInUser[0]?.name
              : user && user[0]?.displayName 
            }
          </h4>
          <h5>@{result}</h5>
        </div>
        <IconButton
          size="small"
          sx={{ ml: 2 }}
          aria-controls={openMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHorizIcon />{" "}
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onclick={handleClose}
          onClose={handleClose}
        >
          <MenuItem className="profile_info1">
          <Avatar src={userProfilePic} />
            <div className="user_info">
            <h4>
            {
              loggedInUser[0]?.name
              ? loggedInUser[0]?.name
              : user && user[0]?.displayName 
            }
          </h4>
          <h5>@{result}</h5>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>Add an existing account</MenuItem>
          <MenuItem onClick={handleLogOut}>Log out @{result}</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
