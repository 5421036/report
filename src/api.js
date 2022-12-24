export async function fetchImages(Figure) {
    const response = await fetch(
      `https://www.amiiboapi.com/api/amiibo/?name=${Figure}`
    );
    const data = await response.json();
    return data.amiibo;
  }
