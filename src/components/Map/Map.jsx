import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DeleteIcon } from "@chakra-ui/icons";
import "leaflet/dist/images/marker-shadow.png";

const Map = ({ editableArray, staticArrays, currentChanges, citiesInfo }) => {
  const mapRef = useRef(null);
  const removeable = useRef(false);
  const removeRef = useRef();
  const [clickedPoints, setClickedPoints] = useState(editableArray.locations);

  useEffect(() => {
    if (mapRef.current && editableArray.locations.length > 0) {
      mapRef.current.setView([
        editableArray.locations[0].lat,
        editableArray.locations[0].lng,
        50,
      ]);
    }
  }, [editableArray]);

  const clearMap = () => {
    mapRef.current.eachLayer((layer) => {
      if (
        layer instanceof L.Marker ||
        layer instanceof L.Polyline ||
        layer instanceof L.Polygon
      ) {
        mapRef.current.removeLayer(layer);
      }
    });
  };

  const drawArrays = () => {
    clearMap();
    drawMap(
      clickedPoints,
      true,
      editableArray.available ? editableArray.color : "black"
    );
    staticArrays.forEach((pointsArray) => {
      drawMap(pointsArray.locations, false, pointsArray.color);
    });
  };

  const drawMap = (points, markers = true, color) => {
    points.forEach((point, index) => {
      const { lat, lng } = point;
      if (markers) {
        const marker = L.marker([lat, lng], { draggable: true })
          .addTo(mapRef.current)
          .on("dragstart", onMarkerDragStart) // Use the common function here
          .on("dragend", onMarkerDragEnd);
        point.marker = marker;
      }

      if (index > 0) {
        const prevPoint = points[index - 1];
        const lineCoordinates = [
          [prevPoint.lat, prevPoint.lng],
          [lat, lng],
        ];
        L.polyline(lineCoordinates, { color: color }).addTo(mapRef.current);
      }
    });

    if (points.length > 2) {
      const firstPoint = points[0];
      const lastPoint = points[points.length - 1];
      const firstLastLineCoordinates = [
        [firstPoint.lat, firstPoint.lng],
        [lastPoint.lat, lastPoint.lng],
      ];
      L.polyline(firstLastLineCoordinates, { color: color }).addTo(
        mapRef.current
      );
      const polygonCoordinates = points.map((point) => [point.lat, point.lng]);

      L.polygon(polygonCoordinates, {
        color: color,
        fillColor: color,
        fillOpacity: 0.5,
      }).addTo(mapRef.current);
    }
  };

  const onMarkerDragStart = (e) => {
    removeRef.current.style.display = "flex";
  };

  const onMarkerDragEnd = (e) => {
    removeRef.current.style.display = "none";

    if (removeable.current) {
      setClickedPoints((prevPoints) => {
        clearMap();
        const updatedPoints = prevPoints.filter(
          (point) => point.marker != e.target
        );

        drawArrays();
        return updatedPoints;
      });
      return;
    }
    const { lat, lng } = e.target.getLatLng();

    setClickedPoints((prevPoints) => {
      clearMap();
      const updatedPoints = prevPoints.map((point) =>
        point.marker === e.target ? { ...point, lat, lng } : point
      );

      drawArrays();
      return updatedPoints;
    });
  };

  const onMapClick = (e) => {
    const { lat, lng } = e.latlng;
    addNewPoint(lat, lng);
  };

  const addNewPoint = (lat, lng) => {
    const newPoint = { lat, lng };

    let [closest1, closest2] = [Infinity, Infinity];
    let [c1, c2] = [0, 0];

    clickedPoints.forEach((e, i) => {
      let a = lat - e.lat;
      let b = lng - e.lng;
      let c = Math.sqrt(a * a + b * b);

      if (c < closest1) {
        closest2 = closest1; // Update the second closest
        c2 = c1;

        closest1 = c;
        c1 = i;
      } else if (c < closest2) {
        closest2 = c;
        c2 = i;
      }
    });

    console.log("Closest Points:", c1, c2);

    const marker = L.marker([lat, lng], { draggable: true })
      .addTo(mapRef.current)
      .on("dragstart", onMarkerDragStart)
      .on("dragend", onMarkerDragEnd);

    setClickedPoints((prevPoints) => {
      const updatedPoints = insertElementBetweenIndices(
        prevPoints,
        Math.min(c1, c2),
        {
          lat,
          lng,
          marker,
        }
      );

      // Redraw the map with the new point
      drawArrays();

      return updatedPoints;
    });
  };

  function insertElementBetweenIndices(arr, index1, elementToInsert) {
    const newArray = [
      ...arr.slice(0, index1),
      elementToInsert,
      ...arr.slice(index1),
    ];
    console.log(arr); // This will log the original array
    console.log(newArray); // This will log the new array
    return newArray;
  }

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map("map").setView([51.505, -0.09], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      mapRef.current = map;
      mapRef.current.on("click", onMapClick);
    }

    drawArrays();
  }, [editableArray, clickedPoints, staticArrays]);

  useEffect(() => {
    setClickedPoints(editableArray.locations);
  }, [editableArray]);

  useEffect(() => {
    currentChanges.current = clickedPoints.map((e) => ({
      lat: e.lat,
      lng: e.lng,
    }));
  }, [clickedPoints]);

  useEffect(() => {
    refresh();
    if (editableArray) {
      setClickedPoints(editableArray.locations);
      drawArrays();
    }
  }, [editableArray]);

  const refresh = () => {
    // clearMap();
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div
        style={{ width: "100%", height: "100vh" }}
        id="map"
        className="map"
      ></div>

      <div
        ref={removeRef}
        onMouseEnter={() => {
          removeable.current = true;

          removeRef.current.style.backgroundColor = "rgba(122, 14, 14, 0.8)";
        }}
        onMouseLeave={() => {
          removeable.current = false;
          removeRef.current.style.backgroundColor = "rgba(185, 17, 17, 0.8)";
        }}
        style={{
          display: "none",
          position: "absolute",
          left: "30%",
          transform: "translateX(-30%)",
          top: 10,
          backgroundColor: "rgba(185, 17, 17, 0.8)",
          padding: 20,
          borderRadius: 10,
          zIndex: 1000, // Ensure it is above the map
        }}
      >
        <DeleteIcon style={{ alignSelf: "center", marginRight: "10px" }} />
        <p>drag here to remove the point</p>
        {/* Add your additional content here */}
      </div>
    </div>
  );
};

export default Map;
