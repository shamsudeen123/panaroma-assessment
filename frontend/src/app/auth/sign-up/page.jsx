"use client";
import CustomDropdown from "@/molecules/CustomDropdown";
import CustomTextField from "@/molecules/CustomTextField";
import CustomeSnackbar from "@/molecules/CustomeSnackbar";
import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showSnackbar, setSnackbar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (!username || !password) {
      setError("All fields are required");
      return;
    }

    if (username && password) {
      const requestBody = { username, password };
      // api call for sign up
      axios({
        method: "post",
        url: "http://localhost:3000/api/signup",
        data: requestBody,
      })
        .then((response) => {
          // popup toast on success
          setSnackbar(true);
          setMessage("Successfully created!");
          if (response.status === 200)
          // Clear form fields after successful signup
          setUsername("");
          setPassword("");
          setRole("");
          setError("");
          setTimeout(() => {
            window.location.href = "/auth/sign-in"; // if success reiredct to sign in page
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
            SIGN UP
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
          <Button
            sx={{ padding: "10px 0px", margin: "10px 0px" }}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            SIGN UP
          </Button>
        </form>
      </Box>
      {showSnackbar && <CustomeSnackbar {...{ message }} />}
    </Grid>
  );
}

export default SignUp;
