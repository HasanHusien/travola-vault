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

export async function getTours() {
  try {
    const res = await fetch('/api/tours');
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err.message);
  }
}
