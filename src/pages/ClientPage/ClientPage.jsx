import { useState, useEffect } from "react";
import { Spinner, Text, Button, WrapItem } from "@chakra-ui/react";

export default () => {
  const [city, setCity] = useState();
  const [hasSearched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState();
  const [info, setInfo] = useState({ city: "", cost: 0, available: true });

  const askForLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          setInfo({ ...info, latitude, longitude });
          setSearched(true);
        },
        (error) => {
          console.error(`Error getting location: ${error.message}`);
          setError("Error getting location");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setError("Geolocation is not supported by this browser.");
    }
  };
  useEffect(() => {}, []);

  useEffect(() => {
    fetch("https://h-t-apps-backend-task.onrender.com/").then(
      async (response) => {
        const data = await response.json();
        console.log(data);
        setData(data);
      }
    );
  }, []);
  function isPointInsideRegion(point, regionPoints) {
    let inside = false;

    for (
      let i = 0, j = regionPoints.length - 1;
      i < regionPoints.length;
      j = i++
    ) {
      const xi = regionPoints[i].lat;
      const yi = regionPoints[i].lng;
      const xj = regionPoints[j].lat;
      const yj = regionPoints[j].lng;

      const intersect =
        yi > point.lng !== yj > point.lng &&
        point.lat < ((xj - xi) * (point.lng - yi)) / (yj - yi) + xi;

      if (intersect) {
        inside = !inside;
      }
    }

    return inside;
  }

  useEffect(() => {
    if (data) {
      data.forEach((city) => {
        const isInside = isPointInsideRegion(
          { lat: info.latitude, lng: info.longitude },
          city.locations
        );
        if (isInside) {
          setCity(city);
        }
      });
    }
  }, [data, info]);
  if (!city && hasSearched) {
    return (
      <div>
        The administration didn't to include your region as a designated
        delivery area.
      </div>
    );
  }
  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {error}
      </div>
      <Button
        width={"100%"}
        maxWidth={400}
        marginBottom={100}
        height={50}
        onClick={askForLocation}
        colorScheme="red"
      >
        Delivery
      </Button>
      {city && (
        <div>
          <Text>you exist in {city.name}</Text>
          {!city.available ? (
            <Text>
              Your regin cant be reached at this moment please try again later
              (admin has set ur regin as unavailable)
            </Text>
          ) : (
            <Text>delivery costs {city.cost}</Text>
          )}
        </div>
      )}
    </div>
  );
};
