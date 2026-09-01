export async function getTours() {
  try {
    const res = await fetch("/api/tours");
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err.message);
  }
}
