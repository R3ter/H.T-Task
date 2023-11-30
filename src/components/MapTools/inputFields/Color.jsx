import { Input, InputLeftAddon, Text } from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
export default ({ title, onchange, defaultValue }) => {
  const [color, setColor] = useState(defaultValue);
  useEffect(() => {
    setColor(defaultValue);
  }, [defaultValue]);
  const ref = useRef(null);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
      onClick={() => {
        ref.current.click();
      }}
    >
      <Text style={{ alignSelf: "center" }} mb="8px">
        {title}
      </Text>
      <div style={{ width: "150px", display: "flex", backgroundColor: color }}>
        <InputLeftAddon
          children={
            <Input
              onChange={(e) => {
                onchange(e);
                setColor(e.target.value);
              }}
              defaultValue={defaultValue}
              type="color"
              size={"xs"}
              style={{
                display: "none",
              }}
              ref={ref}
            ></Input>
          }
        />
        <Text width={"150px"} style={{ alignSelf: "center" }} type="color">
          {color}
        </Text>
      </div>
    </div>
  );
};
