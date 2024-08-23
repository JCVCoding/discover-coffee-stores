"use client";
import Card from "./card.server";
import Banner from "./banner.client";
import useTrackLocation from "@/hooks/use-track-location";

import { CoffeeStoreType } from "@/types";
import { useEffect, useState } from "react";

const NearbyCoffeeStores = () => {
  const {
    handleTrackLocation,
    isFindingLocation,
    longLat,
    locationErrorMessage,
  } = useTrackLocation();

  const [coffeeStores, setCoffeeStores] = useState(() => {
    const storedStores = sessionStorage.getItem("coffeeStores");
    console.log(storedStores);
    return storedStores ? JSON.parse(storedStores) : [];
  });

  const handleOnClick = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    async function coffeeStoresByLocation() {
      if (longLat) {
        try {
          const limit = 10;
          const response = await fetch(
            `/api/getCoffeeStoresByLocation?longLat=${longLat}&limit=${limit}`
          );
          const coffeeStores = await response.json();
          setCoffeeStores(coffeeStores);
          sessionStorage.setItem("coffeeStores", JSON.stringify(coffeeStores));
        } catch (error) {
          console.error(error);
        }
      }
    }
    coffeeStoresByLocation();
    console.log(coffeeStores);
  }, [longLat]);

  return (
    <>
      <Banner
        buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
        handleOnClick={handleOnClick}
      />
      {locationErrorMessage && <p>Error: {locationErrorMessage}</p>}
      {coffeeStores.length > 0 && (
        <>
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Stores Near Me
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
            {coffeeStores.map((store: CoffeeStoreType, idx: number) => (
              <Card
                key={`${store.name}-${store.id}}`}
                name={store.name}
                imgUrl={store.imgUrl}
                href={`/coffee-store/${store.id}?id=${idx}`}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default NearbyCoffeeStores;
