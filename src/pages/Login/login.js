import React, { useState } from "react";
import TwitterImage from "../../assets/images/x-logo.png";
import XIcon from "@mui/icons-material/X";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //    const [error, setError] = useState('')
   const navigate = useNavigate();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

    const [signInWithGoogle, GoogleUser, GoogleLoading, GoogleError] =
    useSignInWithGoogle(auth);

  if (user || GoogleUser) {
    navigate("/")
    console.log(user);
    console.log(GoogleUser);
  }

  if (error || GoogleError) {
    console.log(error.message);
  }

  if (loading || GoogleLoading) {
    console.log("loading");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    signInWithEmailAndPassword(email, password);
  };
   
  const handleGoogleSignIn = () => {
    signInWithGoogle()
  };

  return (
    <div className="login-container">
      <div className="Image-Container">
        <img className="image" src={TwitterImage} alt="" />
      </div>
      <div container="form-Container">
          <div className="form-box">
        <XIcon />
        <h2 className="heading"> Happening Now.</h2>
        <h3 className="heading1">What Happening</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="Email"
            className="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="Password"
            className="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="btn-login">
            <button type="Submit" className="btn">
              Login
            </button>
          </div>
        </form>
          </div>
        <hr />
          <div className="google-button">
            <GoogleButton
              className="g-btn"
              type="light"
              onClick={handleGoogleSignIn}
            />
          </div>
          <div>
            Don't have account?
            <Link
              to="/SignUp"
              style={{
                textDecoration: "none",
                color: "blue",
                fontWeight: "200px",
                marginLeft: "15px",
                margintop: "2px",
              }}
            >
              Sign Up
            </Link>
          </div>
      </div>
    </div>
  );
};

export default Login;
