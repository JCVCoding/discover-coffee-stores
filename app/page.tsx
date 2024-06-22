import Card from "@/components/card.server";
import NearbyCoffeeStores from "@/components/nearby-coffee-stores.client";
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import { CoffeeStoreType } from "@/types";
import { Metadata } from "next";
import { getDomain } from "@/utils";

async function getData() {
  const SF_LongLat = "-122.43759184772618%2C37.76127174005592";
  return await fetchCoffeeStores(SF_LongLat, 6);
}

export const metadata: Metadata = {
  title: "Coffee Connoisseur",
  description: "Allows you to discover local coffee shops near you",
  metadataBase: getDomain(),
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const coffeeStores = await getData();
  return (
    <div className="mb-56">
      <main className="mx-auto mt-10 max-w-6xl px-4">
        <NearbyCoffeeStores />
        <div className="mt-20">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            San Francisco Stores
          </h2>
        </div>
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
      </main>
    </div>
  );
}
