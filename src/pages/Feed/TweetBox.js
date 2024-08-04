import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import "./TweetBox.css";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

function TweetBox() {
  const [post, setPost] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [loggedInUser] = useLoggedInUser();
  // console.log(loggedInUser)
  const [user] = useAuthState(auth)
  const email = user?.email;

  const userProfilePic = loggedInUser[0]?.profileImage
    ? loggedInUser[0]?.profileImage: "https://pixabay.com/vectors/avatar-icon-placeholder-profile-3814049/";

  const handleUploadImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);

    axios
      .post(
        "https://api.imgbb.com/1/upload?key=8afa7d50e47aece739407705ef00214b",
        formData
      )
      .then((res) => {
        setImageURL(res.data.data.display_url);
        console.log(res.data.data.display_url);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleTweet = (e) => {
    e.preventDefault();
   if (user.providerData[0].providerId==="password"){
    fetch(`http://localhost:3001/loggedInUser?email=${email}`)
    .then((res) => res.json())
    .then((data) => {
      setName(data[0]?.name);
      setUsername(data[0]?.username)
    })

    }
    else{
      setName(user?.displayName)
      // setUsername(email?.split)('@'[0])
    }
     if(name) {
      const userPost = {
        profilePhoto: userProfilePic,
        post:post,
        photo: imageURL,
        username: username,
        name: name,
        email: email
  };
    // console.log(userPost);
    setPost('')
    setImageURL('')
    fetch(`http://localhost:3001/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userPost),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    }
  };

  return (
    <div className="tweetBox">
      <form onSubmit={handleTweet}>
        <div className="tweetBox_input">
          <Avatar src={userProfilePic} />
          <input
            type="text"
            placeholder="What's Happening?"
            onChange={(e) => setPost(e.target.value)}
            value={post}
            required
          />
        </div>
        <div className="imageIcon_tweetButton">
          <label htmlFor="image" className="imageIcon">
            {isLoading ? (
              <p>Uploading images</p>
            ) : (
              <p>{imageURL ? "image uploaded" : <AddPhotoAlternateIcon />}</p>
            )}
          </label>
          <input
            type="file"
            id="image"
            className="imageInput"
            onChange={handleUploadImage}
          />
          <Button className="tweetBox_tweetButton" type="submit">
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TweetBox;
