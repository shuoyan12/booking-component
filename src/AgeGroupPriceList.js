import AgeGroupSelect from "./component/AgeGroupSelect";

import { Box, Button } from "@mui/material";
import PriceInput from "./component/PirceInput";
import { useEffect, useState } from "react";
import getNumberIntervals from "./util/ageHelper";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const DEFAULT_SETTING = {
  key: new Date().getTime(),
  price: "0",
  ageGroup: [0, 20],
};
function AgeGroupPriceList({ onChange }) {
  const [priceSettings, setPriceSettings] = useState([DEFAULT_SETTING]);
  const [numberInterval, setNumberInterval] = useState({
    overlap: [],
    notInclude: [0, 20],
  });

  const addSetting = () => {
    const setting = {
      ...DEFAULT_SETTING,
      key: new Date().getTime(),
    };
    setPriceSettings([...priceSettings, setting]);
  };

  const removeSetting = (key) => {
    setPriceSettings(priceSettings.filter((set) => set.key !== key));
  };

  const editPriceSetting = (index, price) => {
    const newList = [...priceSettings];
    newList[index] = { ...newList[index], price };

    setPriceSettings(newList);
  };

  const editAgeGroupSetting = (index, ageGroup) => {
    const newList = [...priceSettings];
    newList[index] = { ...newList[index], ageGroup };

    setPriceSettings(newList);
  };

  useEffect(() => {
    const newPriceSettings = priceSettings.map(
      (newSetting) => newSetting.ageGroup
    );
    onChange(priceSettings);
    setNumberInterval(getNumberIntervals(newPriceSettings));
  }, [priceSettings]);

  return (
    <Box>
      {priceSettings.map((setting, index) => (
        <Box key={setting.key}>
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
                onClick={() => removeSetting(setting.key)}
              >
                移除
              </Button>
            )}
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <AgeGroupSelect
              ageGroup={setting.ageGroup}
              setAgeGroup={(ageGroup) => editAgeGroupSetting(index, ageGroup)}
              overlaps={numberInterval.overlap}
            />
            <PriceInput
              price={setting.price}
              setPrice={(price) => editPriceSetting(index, price)}
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
