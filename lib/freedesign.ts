import { FreedesignResponse } from "@/models/Freedesign";

const BASE_URL = "http://embmart.soon.it/product/freedesign.php";

export async function fetchFreeDesigns(
  page: number = 1,
  limit: number = 10
): Promise<FreedesignResponse> {
  const url = `${BASE_URL}?page=${page}&limit=${limit}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // Disable cache if you want fresh data
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch free designs");
  }

  return res.json();
}
