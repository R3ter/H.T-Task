// EditMapPage component
import { useEffect, useRef, useState } from "react";
import Map from "../../components/Map/Map";
import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import getUniqueRandomColor from "./../../functions/getColor";
import { useToast } from "@chakra-ui/react";
import MapTools from "../../components/MapTools/MapTools";
import AllFields from "../../components/MapTools/inputFields/AllFields";
import Color from "../../components/MapTools/inputFields/Color";
import "./style.css";

export default () => {
  const toast = useToast();
  const [citiesInfo, setCitiesInfo] = useState([
    {
      available: true,
      name: "jerusalem",
      color: "#561fbd53",
      cost: 1010,
      locations: [
        { lat: 51.53256182151333, lng: -0.10625839233398439 },
        { lat: 51.522309273255594, lng: -0.06746292114257814 },
        { lat: 51.49292721420453, lng: -0.05630493164062501 },
        { lat: 51.51707531179727, lng: -0.13904571533203128 },
      ],
    },
    {
      cost: 550,
      name: "shufat",
      color: "#c5792152",
      locations: [
        { lat: 52.13256182151331, lng: -0.1002585920339841 },
        { lat: 52.12230927325551, lng: -0.0604625210425781 },
        { lat: 52.19292721420455, lng: -0.05030453104062505 },
        { lat: 52.11707531179727, lng: -0.13004551503203128 },
      ],
    },
  ]);

  const [selectedCity, setCity] = useState(0);
  const currentChanges = useRef(citiesInfo[selectedCity]);

  return (
    <div className="EditMapPage">
      {citiesInfo.length != 0 && (
        <Map
          citiesInfo={citiesInfo}
          currentChanges={currentChanges}
          editableArray={citiesInfo[selectedCity]}
          staticArrays={citiesInfo.filter((e, i) => i !== selectedCity)}
        />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
          height: "100vh",
          width: "100%",
        }}
      >
        <Box
          height={"50px"}
          style={{ display: "flex", gap: 20, margin: "20px" }}
        >
          <Button
            width={"100%"}
            colorScheme="green"
            onClick={() => {
              setCitiesInfo([
                ...citiesInfo,
                {
                  name: "new regin",
                  color: getUniqueRandomColor(),
                  cost: 0,
                  available: true,
                  locations: [],
                },
              ]);
              setCity(citiesInfo.length);
            }}
          >
            <AddIcon />
            <Text>Add Regin</Text>
          </Button>
        </Box>
        <MapTools
          open={[selectedCity]}
          citiesInfo={citiesInfo}
          ontoggle={(number, value) => {
            console.log(number);
            setCitiesInfo((e) =>
              e.map((e, i) =>
                i == number ? { ...e, available: !e.available } : e
              )
            );
          }}
          onclick={(e) => {
            setCity(e);
          }}
          content={
            <AllFields
              defaultValues={citiesInfo[selectedCity]}
              selectedCity={selectedCity}
              currentChanges={currentChanges}
              onCancel={() => {
                setCitiesInfo((old) =>
                  citiesInfo.map((city, i) => {
                    if (i === selectedCity) {
                      return { ...city };
                    }
                    return city;
                  })
                );
              }}
              onDelete={() => {
                setCitiesInfo((e) => {
                  return e.filter((e, i) => i != selectedCity);
                });
                setCity(0);
              }}
              onSave={() => {
                setCitiesInfo((old) =>
                  citiesInfo.map((city, i) => {
                    if (i === selectedCity) {
                      return {
                        ...city,
                        locations: currentChanges.current,
                        ...currentChanges.current,
                      };
                    }
                    return city;
                  })
                );
                toast({
                  title: "Data updated.",
                  description:
                    citiesInfo[selectedCity].name +
                    " data was updated successfully",
                  status: "success",
                  position: "top",
                  duration: 4000,

                  isClosable: true,
                });
              }}
            />
          }
        />
      </div>
    </div>
  );
};
