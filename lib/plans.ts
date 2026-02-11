export async function getPlans() {
  const res = await fetch("/api/plan", {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch plans")
  }

  return res.json()
}
