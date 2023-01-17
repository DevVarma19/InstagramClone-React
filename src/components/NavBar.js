import React from "react";
import Auth from "./Auth";
import { useState } from "react";
import { auth } from "../firebase";
import Button from "@mui/material/Button";

function NavBar( {user, setUser} ) {

    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);

  return (
    <div>
      <Auth
        open={open}
        setOpen={setOpen}
        openSignIn={openSignIn}
        setOpenSignIn={setOpenSignIn}
        user={user}
        setUser={setUser}
      />

      <div className="app__header">
        <img
          src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
          className="app_headerImage"
        />
        {user ? (
          <Button onClick={() => auth.signOut()}>Log Out</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
