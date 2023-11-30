import { useEffect, useState } from "react";
import { Input, InputLeftAddon, InputRightAddon, Text } from "@chakra-ui/react";
export default ({ title, onchange, defaultValue }) => {
  const [cost, setCost] = useState(defaultValue);
  useEffect(() => {
    setCost(defaultValue);
  }, [defaultValue]);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ alignSelf: "center" }} mb="8px">
        {title}
      </Text>
      <div style={{ display: "flex" }}>
        <Input
          value={cost}
          onChange={(e) => {
            onchange(e);
            setCost(e.target.value);
          }}
          style={{ width: "100px" }}
          type="number"
        />
        <InputRightAddon children={"ILS"} />
      </div>
    </div>
  );
};
