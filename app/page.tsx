import Banner from "@/components/banner.client";
import Card from "@/components/card.server";
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import { CoffeeStoreType } from "@/types";

async function getData() {
  return await fetchCoffeeStores();
}

export default async function Home() {
  const coffeeStores = await getData();
  return (
    <div className="mb-56">
      <main className="mx-auto mt-10 max-w-6xl px-4">
        <Banner buttonText="View stores nearby" />
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
