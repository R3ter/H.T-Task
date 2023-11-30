// AllFields.jsx
import Color from "./Color";
import Name from "./Name";
import Cost from "./Cost";
import { Text } from "@chakra-ui/react";

import SubmitItems from "../SubmitItems/SubmitItems";

export default ({
  onSave,
  onCancel,
  onDelete,
  currentChanges,
  defaultValues,
}) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        gap: 20,
        flexDirection: "column",
      }}
    >
      {currentChanges.current && (
        <>
          <Color
            defaultValue={defaultValues.color}
            onchange={(e) => {
              currentChanges.current.color = e.target.value;
            }}
            title={"Color: "}
          />
          <Name
            defaultValue={defaultValues.name}
            onchange={(e) => {
              currentChanges.current.name = e.target.value;
            }}
            title={"Name: "}
          />
          <Cost
            defaultValue={defaultValues.cost}
            onchange={(e) => {
              console.log(e);
              currentChanges.current.cost = e.target.value;
            }}
            title="Cost: "
          />
          {defaultValues.locations.length == 0 && (
            <Text color={"darkseagreen"}>
              No points found on the map!<br></br> Click on map and then save to
              add point.
            </Text>
          )}
          <SubmitItems
            onDelete={onDelete}
            onSave={onSave}
            onCancel={onCancel}
          />
        </>
      )}
    </div>
  );
};
