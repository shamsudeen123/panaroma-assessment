import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

function CustomDropdown({ input, value, setCallback, menu, error }) {
  return (
    <>
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel>{input}</InputLabel>
        <Select
          value={value}
          onChange={(e) => setCallback(e.target.value)}
          label="Role"
          required
        >
          {menu?.length > 0 &&
            menu?.map((item) => <MenuItem value={item}>{item}</MenuItem>)}
        </Select>
      </FormControl>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

export default CustomDropdown;
