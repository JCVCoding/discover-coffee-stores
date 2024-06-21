"use client";

import { useState } from "react";

type PositionType = {
  coords: { latitude: number; longitude: number };
};

const useTrackLocation = () => {
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const [longLat, setLongLat] = useState("");
  const [locationErrorMessage, setLocationErrorMessage] = useState("");

  function success(position: PositionType) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setIsFindingLocation(false);
    setLocationErrorMessage("");
    setLongLat(`${longitude},${latitude}`);
    console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
  }

  function error() {
    setIsFindingLocation(false);
    setLocationErrorMessage("Unable to retrieve your location");
    console.error("Unable to retrieve your location");
  }

  const handleTrackLocation = () => {
    if (!navigator.geolocation) {
      setLocationErrorMessage("Geolocation is not supported by your browser");
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      setLocationErrorMessage("");
      setIsFindingLocation(true);
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return {
    handleTrackLocation,
    isFindingLocation,
    locationErrorMessage,
    longLat,
  };
};

export default useTrackLocation;
