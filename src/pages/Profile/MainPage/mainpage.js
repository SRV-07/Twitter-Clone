import React, { useEffect, useState } from "react";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useNavigate } from "react-router-dom";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AddLinkIcon from '@mui/icons-material/AddLink';
import "./MainPage.css";
import useLoggedInUser from "../../../hooks/useLoggedInUser";
import Post from "../../Feed/Post/post";
import axios from "axios";
import EditProfile from "../EditProfile/Editprofile";

const MainPage = ({ user }) => {
  const Navigate = useNavigate();
  const [loggedInUser] = useLoggedInUser();
  const [isLoading, setIsLoading] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/userPost?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, [posts, user?.email]);

  const username = user?.email?.split("0")[0];
  const handleUploadCoverImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);

    
      axios.post(
        "https://api.imgbb.com/1/upload?key=8afa7d50e47aece739407705ef00214b",
        formData
      )
      .then((res) => {
        const url = res.data.data.display_url
        const userCoverImage ={
          email: user?.email,
          coverImage: url
        }
        setIsLoading(false);
        if (url) {
          axios.patch(`http://localhost:3001/userUpdate/${user?.email}`,userCoverImage)
       }
      })
  };

  const handleUploadProfileImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);
      axios.post(
        "https://api.imgbb.com/1/upload?key=8afa7d50e47aece739407705ef00214b",
        formData
      )
      .then((res) => {
        const url = res.data.data.display_url;
        const userProfileImage = {
          email: user?.email,
          ProImage : url
        }
        setIsLoading(false);
        if (url) {
           axios.patch(`http://localhost:3001/userUpdate/${user?.email}`,userProfileImage)
        }
      })
  };

  return (
    <div>
      <KeyboardReturnIcon
        className="arrow_icon"
        onClick={() => {
          Navigate("/");
        }}
      />
      <h4 className="heading-4">{username}</h4>
      <div className="mainProfile">
        <div className="profile-bio">
          {
            <div>
              <div className="coverImageContainer">
                <img
                  src={
                    loggedInUser[0]?.coverImage
                      ? loggedInUser[0]?.coverImage
                      : "https://pixabay.com/vectors/avatar-icon-placeholder-profile-3814049/"
                  }
                  alt=""
                  className="coverImage"
                />
                <div className="hoverCoverImage">
                  <label htmlFor="image" className="imageIcon" />
                  <CenterFocusWeakIcon />
                  <div className="imageIcon_tweetButton">
                    <h1>Hello</h1>
                    <input
                      type="file"
                      id="image"
                      className=""
                      onChange={handleUploadCoverImage}
                    />
                  </div>
                </div>
              </div>
              <div className="avatar-img">
                <div className="avatarContainer">
                  <img
                    src={
                      loggedInUser[0]?.profileImage
                        ? loggedInUser[0]?.profileImage
                        : "https://pixabay.com/vectors/avatar-icon-placeholder-profile-3814049/"
                    }
                    alt=""
                    className="coverImage"
                  />
                <div className="hoverAvatarImage">
                  <div className="imageIcon_tweetButton">
                    <label htmlFor="profileImage" className="imagination">
                      <CenterFocusWeakIcon className="photoIcon" />
                    </label>
                    <div className="imageIcon_tweetButton">
                      <input
                        type="file"
                        id="profileImage"
                        className="imageInput"
                        onChange={handleUploadProfileImage}
                      />
                    </div>
                  </div>
                </div>
                </div>

                <div className="userInfo">
                  <div>
                    <h3 className="heading-3">
                      {loggedInUser[0]?.name ? loggedInUser[0]?.name : user && user?.displayName}
                    </h3>
                    <p className="usernameSection">@{username}</p>
                    </div>
                      <EditProfile user={user} LoggedInUser={loggedInUser} />
                    <div className="infoContainer">
                      {loggedInUser[0]?.bio ? loggedInUser[0]?.bio : ""}
                      <div className="locationAndLink">
                        {loggedInUser[0]?.location? <p className="subInfo"><MyLocationIcon />{loggedInUser[0]?.location}</p> : ''}
                        {loggedInUser[0]?.website? <p className="subInfo"><AddLinkIcon />{loggedInUser[0]?.website}</p> : ''}
                        </div>
                    </div>
                    <h4 className="tweetsText">Tweets</h4>
                    <hr />
                </div>
                {
                    posts.map(p =><Post id={p._id} p={p} />)
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default MainPage;
