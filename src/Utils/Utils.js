export const getData = (url) => fetch(url)
    .then(response => response.json())
    .catch((error) => {
      console.error(error)
    })
