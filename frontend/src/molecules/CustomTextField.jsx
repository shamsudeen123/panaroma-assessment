import { TextField } from "@mui/material";
import React from "react";

function CustomTextField({ label, value, type, setCallback, required }) {
  return (
    <>
      <TextField
        label={label}
        variant="outlined"
        type={type}
        fullWidth
        margin="normal"
        value={value}
        onChange={(e) => setCallback(e.target.value)}
        required={required}
      />
    </>
  );
}

export default CustomTextField;
