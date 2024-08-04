import React from "react";
import "./EditProfile.css";
import { Box, IconButton, TextField } from "@mui/material";
import { Modal } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 8,
};

function EditeChild({ dob, setDob }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className="birthdate-section" onClick={handleOpen}>
        <text>Edit</text>
      </div>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300, height: 500 }}>
          <div className="text">
            <h2>Edit date of birth</h2>
            <p>
              This can only be changed a few times
              <br /> make sure you enter the age of the <br />
              person using account
            </p>
            <input type="date" onChange={(e) => setDob(e.target.value)} />
            <button
              className="e-button"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function EditProfile({ user, LoggedInUser }) {
  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [dob, setDob] = React.useState("");

  const HandleSave = async () => {
   const editedInfo ={
    name, 
    bio,
    location,
    website,
    dob,
   }
   if(editedInfo){
     await axios.patch(`http://localhost:3001/userUpdate/${user?.email}`, editedInfo)
      setOpen(false);
   }
  };

  return (
    <div>
      <button className="Edit-profile-btn" onClick={() => setOpen(true)} className="Edit-profile-btn">
        Edit profile
      </button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal">
          <div className="header">
            <IconButton
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon />
            </IconButton>
            <h2 className="header-title">Edit Profile</h2>
            <button className="save-btn" onClick={HandleSave}>
              Save
            </button>
          </div>
          <form className="fill-content">
            <TextField
              className="text-field"
              fullWidth
              label="Name"
              is="fullwidth"
              variant="filled"
              onChange={(e) => setName(e.target.value)}
              defaultValue={LoggedInUser[0]?.name ? LoggedInUser[0]?.name : ""}
            />
            <TextField
              className="text-field"
              fullWidth
              label="Bio"
              is="fullwidth"
              variant="filled"
              onChange={(e) => setBio(e.target.value)}
              defaultValue={LoggedInUser[0]?.bio ? LoggedInUser[0]?.bio : ""}
            />
            <TextField
              className="text-field"
              fullWidth
              label="Location"
              is="fullwidth"
              variant="filled"
              onChange={(e) => setLocation(e.target.value)}
              defaultValue={
                LoggedInUser[0]?.Location ? LoggedInUser[0]?.Location : ""
              }
            />
            <TextField
              className="text-field"
              fullWidth
              label="Website"
              is="fullwidth"
              variant="filled"
              onChange={(e) => setWebsite(e.target.value)}
              defaultValue={
                LoggedInUser[0]?.website ? LoggedInUser[0]?.website : ""
              }
            />
          </form>
          <div className="birthdate-section">
            <p>Birth Date</p>
            <p>.</p>
            <EditeChild dob={dob} setDob={setDob} />
          </div>
          <div className="last-section">
            {
              LoggedInUser[0]?.dob?
              <h2>{LoggedInUser[0]?.dob}</h2>:
              <h2>
                {
                  dob? dob : "Add your date of birth"
                }
              </h2>
            }
            <div className="last-btn">
               <h2>Switch to professional</h2>
               <ChevronRightIcon />
            </div>

          </div>
        </Box>
      </Modal>
    </div>
  );
}
