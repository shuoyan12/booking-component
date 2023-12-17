import { TextField, Box, FormHelperText, Button } from "@mui/material";
import addComma from "../util/priceHelper";

function PriceInput({ price, setPrice }) {
  const handleInputChange = (event) => {
    const rawInput = event.target.value;
    const sanitizedInput = rawInput.replace(/[^\d.]/g, "");

    setPrice(sanitizedInput);
  };

  return (
    <Box className={"container"}>
      <Box className="inputLabel">
        <span>入住費用（每人每晚）</span>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Button
          disabled
          variant="outlined"
          sx={{
            background: "#ebe7e7",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            "&.Mui-disabled": {
              color: "#494747",
              fontWeight: "bold",
              borderRight: 0,
            },
          }}
        >
          TWD
        </Button>
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            },
          }}
          value={addComma(price)}
          onChange={handleInputChange}
          placeholder="請輸入費用"
          error={!price}
        />
      </Box>
      {!price && (
        <FormHelperText sx={{ color: "red" }}>不可以為空白</FormHelperText>
      )}
      <div style={{ textAlign: "right" }}>
        <p>輸入0表示免費</p>
      </div>
    </Box>
  );
}

export default PriceInput;
