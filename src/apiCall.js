const API_KEY = process.env.REACT_APP_NEWS_KEY;

export const getArtworks= () => {
  return fetch(`https://api.harvardartmuseums.org/image?apikey=${API_KEY}`)
  .then((response) => {
    if(response.ok){
      console.log(response)
      return response.json()
    }
  })
  .catch((err => console.error(err)))
}