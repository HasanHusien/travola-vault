export async function getTour(slug) {
  try {
    const res = await fetch(`/api/tour/${slug}`);
    const data = await res.json();

    // console.log(data);
    return data;
  } catch (err) {
    console.error(err.message);
  }
}
