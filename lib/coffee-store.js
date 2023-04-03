import { createApi } from "unsplash-js"

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_COFFEE_STORE_API_KEY,
})

const getUnsplashCoffeStores = async (query, limit = 10) => {
  const photos = await unsplash.search.getPhotos({
    query: query,
    page: 2,
    perPage: limit,
  })
  // console.log({ photos })
  return photos
}

const getUrlForCoffeeStores = (latlong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`
}

// FETCH COFFEE STORE FROM FOUR SQUARE API AND PHOTOS FROM UNSPLASH
export const fetchCoffeeStores = async (
  latlong = "27.71114774018791,85.31723572096077",
  limit = 6
) => {
  console.log("entered", { fetchCoffeeStores })
  // get data from unsplash
  const {
    response: { results: photos },
  } = await getUnsplashCoffeStores("coffee shop", 40)
  console.log({ photos })
  // get data from four square
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_COFFEE_STORE_API_KEY,
    },
  }
  let data
  try {
    const response = await fetch(
      getUrlForCoffeeStores(latlong, "coffee stores", limit),
      options
    )

    data = await response.json()
  } catch (error) {
    console.log(error.message)
  }
  return data.results.map((store, index) => {
    return {
      id: store.fsq_id,
      name: store.name,
      address: store.location.address || null,
      neighborhood:
        (store.location.neighborhood &&
          store.location.neighborhood.length[0]) ||
        null,
      imgUrl: photos.length > 0 ? photos[index]["urls"]["regular"] : null,
    }
  })
}
