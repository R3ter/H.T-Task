import { useState, useEffect } from "react";
import { Spinner, Text } from "@chakra-ui/react";

export default () => {
  const [city, setCity] = useState();
  const [hasSearched, setSearched] = useState(false);
  const [data, setData] = useState();
  const [info, setInfo] = useState({ city: "", cost: 0, available: true });

  useEffect(() => {
    // Check if the browser supports Geolocation
    if ("geolocation" in navigator) {
      // Get the user's location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          setInfo({ ...info, latitude, longitude });
          setSearched(true);
        },
        (error) => {
          console.error(`Error getting location: ${error.message}`);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []); // Empty dependency array ensures the effect runs once after component mount

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
    return <div>City was not found</div>;
  }
  if (!city) {
    return (
      <div style={{ widht: "100%", height: "500px" }}>
        please allow your location access....
      </div>
    );
  }
  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <Text>you exist in {city.name}</Text>
      {!city.available ? (
        <Text>
          Your regin cant be reached at this moment please try again later
        </Text>
      ) : (
        <Text>delivery costs {city.cost}</Text>
      )}
    </div>
  );
};
