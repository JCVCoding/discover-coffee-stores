import { MapBoxType } from "@/types";
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: `${process.env.UNSPLASH_ACCESS_KEY}`,
});

const getListOfCoffeeStorePhotos = async () => {
  return await unsplash.search
    .getPhotos({
      query: "coffee shop",
      page: 1,
      perPage: 10,
    })
    .then((result) => {
      if (result.errors) {
        console.error("Error retrieving a photo", result.errors);
      } else {
        const photos = result.response.results || [];
        return photos.map((photo) => photo.urls.small);
      }
    });
};

const transformCoffeeData = (
  idx: number,
  result: MapBoxType,
  photos: Array<string>
) => {
  return {
    id: result.id,
    address: result.properties?.address || "",
    name: result.text,
    imgUrl: photos.length > 0 ? photos[idx] : "",
  };
};

export const fetchCoffeeStores = async () => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/coffee.json?limit=6&proximity=-122.43759184772618%2C37.76127174005592&access_token=${process.env.MAPBOX_API}`
    );
    const data = await response.json();
    const photos = await getListOfCoffeeStorePhotos();
    return data.features.map((result: MapBoxType, idx: number) =>
      transformCoffeeData(idx, result, photos!)
    );
  } catch (error) {
    console.error("Error while fetching coffee stores:", error);
  }
};

export const fetchCoffeeStore = async (id: string, queryId: string) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${id}.json?proximity=ip&access_token=${process.env.MAPBOX_API}`
    );
    const data = await response.json();
    const photos = await getListOfCoffeeStorePhotos();
    const coffeeStore = data.features.map((result: MapBoxType, idx: number) =>
      transformCoffeeData(parseInt(queryId), result, photos!)
    );
    return coffeeStore.length > 0 ? coffeeStore[0] : {};
  } catch (error) {
    console.error("Error while fetching coffee stores:", error);
  }
};
