export const getArtworks= () => {
  return fetch("https://api.harvardartmuseums.org/image?apikey=cdb37194-c28a-4ccd-a118-a1bb0fda602d")
  .then((response) => {
    if(response.ok){
      console.log(response)
      return response.json()
    }
  })
  .catch((err => console.error(err)))
}