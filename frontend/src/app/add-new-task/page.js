"use client";
import CustomDropdown from "@/molecules/CustomDropdown";
import CustomTextField from "@/molecules/CustomTextField";
import CustomeSnackbar from "@/molecules/CustomeSnackbar";
import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function AddEmployee() {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showSnackbar, setSnackbar] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    // setting state for edit functionality
    if (queryParams.get("taskName")) {
      let taskNames = queryParams.get("taskName");
      setTaskName(taskNames);
      setDescription(queryParams.get("description"));
      setDueDate(queryParams.get("dueDate"));
      setStatus(queryParams.get("status"));
    }
  }, []);

  // handling on submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    if (!taskName || !description || !status || !dueDate) {
      setError("All fields are required");
      return;
    }

    if (taskName && description && status && dueDate) {
      const requestBody = { taskName, description, status, dueDate };
      // create employee section
      if (!queryParams.get("taskName")) {
        // api call for create emp
        axios({
          method: "post",
          url: "http://localhost:3000/api/addTask",
          data: requestBody,
        })
          .then((response) => {
            // popup toast on sucess
            setSnackbar(true);
            setMessage("Task added successfully!");
            if (response.status === 200)
              setTimeout(() => {
                window.location.href = "/task-listing"; // on success redirect to listing page
              }, 2000);
          })
          .catch((error) => {
            // popup toast on failure
            setSnackbar(true);
            setMessage("something went wrong!");
          });
      }
      // update emp section
      else if (queryParams.get("taskName")) {
        // api call for update emp
        axios({
          method: "put",
          url:
            "http://localhost:3000/api/updateTask/" + queryParams.get("id"),
          data: requestBody,
        })
          .then((response) => {
            // popup toast on failure
            setSnackbar(true);
            setMessage("Task details updated successfully!");
            if (response.status === 200)
              setTimeout(() => {
                window.location.href = "/task-listing"; // on success redirect to listing page
              }, 2000);
          })
          .catch((error) => {
            // popup toast on failure
            setSnackbar(true);
            setMessage("Something went wrong!");
          });
      }
    }
    // Clear form fields after successful signup
    setTaskName("");
    setDescription("");
    setDueDate("");
    setStatus("");
    setError("");
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
            ADD NEW TASK
          </Typography>
          <CustomTextField
            label="Task Name"
            type="text"
            value={taskName}
            setCallback={setTaskName}
            required={true}
          />
          <CustomTextField
            label="Description"
            type="type"
            value={description}
            setCallback={setDescription}
            required={true}
          />
          <CustomTextField
            label="Due Date"
            type="date"
            value={dueDate}
            setCallback={setDueDate}
            required={true}
          />
          <CustomDropdown
            {...{
              input: "Status",
              value: status,
              setCallback: setStatus,
              menu: [
                "Completed",
                "In progress"
              ],
              error,
            }}
          />
          <Button
            sx={{ padding: "10px 0px" }}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            ADD NEW TASK
          </Button>
        </form>
      </Box>
      {showSnackbar && <CustomeSnackbar {...{ message }} />}
    </Grid>
  );
}

export default AddEmployee;
