"use client";
import { tableRowdata } from "@/constants/table";
import CustomTable from "@/molecules/CustomTable";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import CustomeSnackbar from "@/molecules/CustomeSnackbar";
import { useDispatch, useSelector } from "react-redux";
import { getTaskList } from "@/redux/taskListSlice";

function TaskListing() {
  const [employeeList, setEmployeeList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showSnackbar, setSnackbar] = useState(false);
  const [taskStatus, setTaskStatus] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    // on mount emp list api will called
    getEmployeeList();
  }, [pageNumber, taskStatus]);

  // function for handling edit feature
  const handleEditClick = (row) => {
      window.location.href =
        "/add-new-task?taskName=" +
        row.taskName +
        "&description=" +
        row.description +
        "&dueDate=" +
        row.dueDate +
        "&status=" +
        row.status +
        "&id=" +
        row.id;
  };

  // function for handling delete feature
  const handleDeleteClick = (id) => {
      setLoading(true);
      // api call for delete an employee from list
      axios({
        method: "delete",
        url: "http://localhost:3000/api/deleteTask/" + id,
      })
        .then((response) => {
          // popup toast on success
          setSnackbar(true);
          setMessage("Successfully deleted task!");
          setLoading(false);
          if (response) getEmployeeList(); // once after delete success emp list api will be called
        })
        .catch(() => {
          // popup toast on failure
          setSnackbar(true);
          setMessage("Something went wrong!");
        });
  };

  const getEmployeeList = () => {
    // setLoading(true);
    // api for emp list view
    const url = `http://localhost:3000/api/taskList?page=${pageNumber}&status=${taskStatus}`
    dispatch(getTaskList(url));
  };

  const handlePageChange = (event, page) => {
    setPageNumber(page); // setting pagination page value
  };

  const handleLogout = () => {
    localStorage.clear(); // will clear entire local storage items
    window.location.href = "/auth/sign-in"; // once after clearing will redirect to sign in page
  };

  const handleTaskStatus = (event) => {
    setTaskStatus(event.target.value);
  };

  const employeeListing = useSelector((state) => state.taskReducer.taskList);

  useEffect(() => {
    setEmployeeList(employeeListing);
  }, [employeeListing])

  console.log(employeeList, "inisde employee list");

  return (
    <Grid
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        padding: 4,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
          Task Listview
        </Typography>
        <Box>
          <FormControl sx={{width: 200, marginRight: "5px"}}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={taskStatus}
              label="Status"
              onChange={handleTaskStatus}
            >
              <MenuItem value="In progress">In progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            LOG OUT
          </Button>
          <Link href="/add-new-task">
            <Button variant="contained" color="primary" sx={{ ml: 2 }}>
              Add New Task
            </Button>
          </Link>
        </Box>
      </Box>
      {isLoading && <CircularProgress />}
      {employeeList?.length > 0 ? (
        <CustomTable
          {...{ employeeList, handleEditClick, handleDeleteClick }}
        />
      ) : (
        <Typography variant="h4" sx={{ m: 10 }}>
          No Data Found
        </Typography>
      )}
      <Pagination
        sx={{ mt: 2 }}
        count={10}
        color="primary"
        onChange={handlePageChange}
      />
      {showSnackbar && <CustomeSnackbar {...{ message }} />}
    </Grid>
  );
}

export default TaskListing;
