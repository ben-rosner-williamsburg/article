const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

export const getArtworks = () => {
  return fetch(`https://api.harvardartmuseums.org/object?apikey=${REACT_APP_API_KEY}&hasimage=1&classification=Paintings&size=21&sort`)
  .then((response) => {
    if(response.ok){
      return response.json()
    }
  })
  .catch((err => console.error(err)))
}

export const getArtwork = (id) => {
  return fetch(`https://api.harvardartmuseums.org/object?apikey=${REACT_APP_API_KEY}&id=${id}`)
  .then((response) => {
    if(response.ok){
      return response.json()
    }
  })
  .catch((err => console.error(err)))
}