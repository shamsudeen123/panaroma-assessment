"use client";
import CustomTextField from "@/molecules/CustomTextField";
import CustomeSnackbar from "@/molecules/CustomeSnackbar";
import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function SignIn() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showSnackbar, setSnackbar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation and authentication logic
    if (username && password) {
      const requestBody = { username, password };
      // api for sign in
      axios({
        method: "post",
        url: "http://localhost:3000/api/signin",
        data: requestBody,
      })
        .then((response) => {
          // popup toast on success
          setSnackbar(true);
          setMessage("Successfully logged in!");
          localStorage.setItem("token", response.data.accessToken); // setting access token to local storage
          localStorage.setItem("role", response.data.user.role); // setting user role to local storage
          if (response.status === 200)
            setTimeout(() => {
              window.location.href = "/task-listing"; // if success redirect to listing page
            }, 2000);
        })
        .catch((error) => {
          // popup toast on failure
          setSnackbar(true);
          setMessage("Something went wrong!");
        });
    }
  };

  return (
    <Grid
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          maxHeight: 500,
          padding: 10,
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3);",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography
            variant="h5"
            sx={{ display: "flex", justifyContent: "center", fontWeight: 600 }}
          >
            SIGN IN
          </Typography>
          <CustomTextField
            label="Username"
            type="text"
            value={username}
            setCallback={setUsername}
            required={true}
          />
          <CustomTextField
            label="Password"
            type="password"
            value={password}
            setCallback={setPassword}
            required={true}
          />
          <Typography
            variant="span"
            onClick={() => (window.location.href = "/auth/sign-up")}
            sx={{ margin: "10px 0px", cursor: "pointer", color: "#1976d2" }}
          >
            Create New User
          </Typography>
          <Button
            sx={{ padding: "10px 0px", margin: "10px 0px" }}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            SIGN IN
          </Button>
        </form>
      </Box>
      {showSnackbar && <CustomeSnackbar {...{ message }} />}
    </Grid>
  );
}

export default SignIn;
