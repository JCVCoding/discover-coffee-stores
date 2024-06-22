"use server";

import { updateCoffeeStore } from "@/lib/airtable";

export const upvoteAction = async (id: string) => {
  const data = await updateCoffeeStore(id);
};
