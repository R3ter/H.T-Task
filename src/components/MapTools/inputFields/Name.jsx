import { Input, InputLeftAddon, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
export default ({ title, onchange, defaultValue }) => {
  const [name, setName] = useState(defaultValue);
  useEffect(() => {
    setName(defaultValue);
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
          value={name}
          onChange={(e) => {
            onchange(e);
            setName(e.target.value);
          }}
          style={{ width: "150px" }}
          type="text"
        />
      </div>
    </div>
  );
};
