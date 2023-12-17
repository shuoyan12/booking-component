import AgeGroupSelect from "./component/AgeGroupSelect";

import { Box, Button } from "@mui/material";
import PriceInput from "./component/PirceInput";
import { useEffect, useState } from "react";
import getNumberGroup from "./util/ageHelper";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const DEFAULT_SETTING = {
  price: "0",
  ageGroup: [0, 20],
};

function AgeGroupPriceList({ onChange }) {
  const [priceSettings, setPriceSettings] = useState([DEFAULT_SETTING]);
  const [numberInterval, setNumberInterval] = useState({
    overlap: [],
    notInclude: DEFAULT_SETTING.ageGroup,
  });

  const addSetting = () => {
    setPriceSettings([...priceSettings, DEFAULT_SETTING]);
  };

  const removeSetting = (index) => {
    const newList = [...priceSettings];
    newList.splice(index, 1);
    setPriceSettings(newList);
  };

  const editSetting = (index, param) => {
    const newList = [...priceSettings];
    newList[index] = { ...newList[index], ...param };

    setPriceSettings(newList);
  };

  useEffect(() => {
    const newPriceSettings = [];
    const settings = [];

    priceSettings.forEach((newSetting) => {
      let price = Number(newSetting.price);

      settings.push({ ...newSetting, price });
      newPriceSettings.push(newSetting.ageGroup);
    });

    onChange(settings);
    setNumberInterval(getNumberGroup(newPriceSettings));
  }, [onChange, priceSettings]);

  return (
    <Box>
      {priceSettings.map((setting, index) => (
        <Box key={index}>
          {index > 0 && <hr />}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4>價格設定 - {index + 1}</h4>
            {index > 0 && (
              <Button
                color="error"
                startIcon={<CloseIcon />}
                onClick={() => removeSetting(index)}
              >
                移除
              </Button>
            )}
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <AgeGroupSelect
              ageGroup={setting.ageGroup}
              setAgeGroup={(ageGroup) => editSetting(index, { ageGroup })}
              overlaps={numberInterval.overlap}
            />
            <PriceInput
              price={setting.price}
              setPrice={(price) => editSetting(index, { price })}
            />
          </Box>
        </Box>
      ))}
      <Box sx={{ textAlign: "left" }}>
        <Button
          onClick={addSetting}
          disabled={numberInterval?.notInclude?.length === 0}
          startIcon={<AddIcon />}
          sx={{ color: "#2eb2a7" }}
        >
          新增價格設定
        </Button>
      </Box>
    </Box>
  );
}

export default AgeGroupPriceList;
