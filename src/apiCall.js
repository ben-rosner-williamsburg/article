const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

export const getArtworks= () => {
  return fetch(`http://api.harvardartmuseums.org/image?apikey=${REACT_APP_API_KEY}`)
  .then((response) => {
    if(response.ok){
      console.log(response)
      return response.json()
    }
  })
  .catch((err => console.error(err)))
}