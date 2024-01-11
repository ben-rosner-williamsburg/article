const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

export const getArtworks = () => {
  return fetch(`https://api.harvardartmuseums.org/object?apikey=${REACT_APP_API_KEY}&size=20`)
  .then((response) => {
    if(response.ok){
      console.log(response)
      return response.json()
    }
  })
  .catch((err => console.error(err)))
}