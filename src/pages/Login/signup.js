import React, { useState } from "react";
import TwitterImage from "../../assets/images/x-logo.png";
import XIcon from "@mui/icons-material/X";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //    const [error, setError] = useState('')
  const navigate = useNavigate();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [signInWithGoogle, GoogleUser,] =
    useSignInWithGoogle(auth);

  if (user || GoogleUser) {
    navigate("/");
    console.log(user);
    console.log(GoogleUser);
  }

  if (error) {
    console.log(error.message);
  }

  if (loading) {
    console.log("loading");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    createUserWithEmailAndPassword(email, password);

    const user = {
      username: username,
      name: name,
      email: email,
    };

    const { data } = axios.post(`http://localhost:3001/register`, user);
    console.log(data);
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };

  return (
    <div className="Signup-container">
      <div className="Image-Container">
        <img className="image" src={TwitterImage} alt="" />
      </div>
      <div container="form-Container">
        <div className="form-box">
          <XIcon className="path" style={{ color: "black" }} />
          <h2 className="Happening">Happening Now.</h2>
          <h3 className="Join twitter">Join Twitter Today</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="username-signup"
              placeholder="@username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              className="name-signup"
              placeholder="Enter Full Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="Email"
              className="email-signup"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="Password"
              className="password-signup"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="btn-login">
              <button type="Submit" className="btn">
                Sign Up
              </button>
            </div>
          </form>
          <hr />
          <div className="google-button">
            <GoogleButton
              className="g-btn"
              type="light"
              onClick={handleGoogleSignIn}
            />
          </div>
          <div>
            Already have an account?
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "blue",
                fontWeight: "200px",
                marginLeft: "15px",
                margintop: "2px",
              }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
