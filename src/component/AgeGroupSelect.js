import {
  Box,
  Select,
  MenuItem,
  ButtonGroup,
  Button,
  FormHelperText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { generateArray } from "../util/ageHelper";

function AgeGroupSelect({ ageGroup, setAgeGroup, overlaps }) {
  const [startAge, endAge] = ageGroup;
  const [error, setError] = useState(false);
  const options = generateArray(0, 20);

  const handleStartChange = (e) => {
    setAgeGroup([e.target.value, ageGroup[1]]);
  };

  const handleEndChange = (e) => {
    setAgeGroup([ageGroup[0], e.target.value]);
  };
  useEffect(() => {
    if (overlaps.length === 0) setError(false);

    const errorCheckList = overlaps?.map((overlap) => {
      const [start, end] = overlap;
      if (
        (startAge >= start && startAge <= end) ||
        (endAge >= start && endAge <= end)
      )
        return true;
      else return false;
    });
    setError(errorCheckList.includes(true));
  }, [endAge, overlaps, startAge]);

  return (
    <Box className="container">
      <Box className={"inputLabel"}>
        <span>年齡</span>
      </Box>
      <ButtonGroup variant="text" aria-label="text button group">
        <Select
          sx={{
            minWidth: "120px",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
          value={startAge}
          onChange={handleStartChange}
          fullWidth
          error={error}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option} disabled={option > endAge}>
              {option}
            </MenuItem>
          ))}
        </Select>

        <Button
          disabled
          variant="outlined"
          sx={{
            background: "#ebe7e7",
            borderRadius: 0,
            "&.Mui-disabled": {
              color: "#494747",
              fontWeight: "bold",
              borderLeft: 0,
              borderRight: "0 !important",
            },
          }}
        >
          ~
        </Button>

        <Select
          sx={{
            minWidth: "120px",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          value={endAge}
          onChange={handleEndChange}
          size="large"
          fullWidth
          error={error}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option} disabled={option < startAge}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </ButtonGroup>
      {error && (
        <FormHelperText sx={{ color: "red" }}>
          年齡區間不可以重疊
        </FormHelperText>
      )}
    </Box>
  );
}

export default AgeGroupSelect;
