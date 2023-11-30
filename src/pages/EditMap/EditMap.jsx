import { useEffect, useRef, useState } from "react";
import Map from "../../components/Map/Map";
import { Box, Button, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import getUniqueRandomColor from "./../../functions/getColor";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import MapTools from "../../components/MapTools/MapTools";
import AllFields from "../../components/MapTools/inputFields/AllFields";
import Color from "../../components/MapTools/inputFields/Color";
import "./style.css";

export default () => {
  const toast = useToast();

  const [citiesInfo, setCitiesInfo] = useState();
  const currentChanges = useRef();
  useEffect(() => {
    fetch("https://h-t-apps-backend-task.onrender.com/").then(
      async (response) => {
        const data = await response.json();
        setCitiesInfo(data.data);
        currentChanges.current = data.data[selectedCity];
      }
    );
  }, []);
  console.log(citiesInfo);
  const [selectedCity, setCity] = useState(0);
  if (!citiesInfo) {
    return <div></div>;
  }
  return (
    <div className="EditMapPage">
      {citiesInfo.length !== 0 && (
        <Map
          citiesInfo={citiesInfo}
          currentChanges={currentChanges}
          editableArray={citiesInfo[selectedCity]}
          staticArrays={citiesInfo.filter((e, i) => i !== selectedCity)}
        />
      )}

      <div className="editMapContentContainer">
        <Box className="buttonContainer">
          <Button
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
            <Text>Add Region</Text>
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
                setCitiesInfo((old) => {
                  const newArr = citiesInfo.map((city, i) => {
                    if (i === selectedCity) {
                      return {
                        ...city,
                        locations: currentChanges.current,
                        ...currentChanges.current,
                      };
                    }
                    return city;
                  });
                  axios
                    .post("https://h-t-apps-backend-task.onrender.com/", {
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                      },
                      data: newArr,
                    })
                    .then(function (response) {
                      console.log(response);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                  return newArr;
                });
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
