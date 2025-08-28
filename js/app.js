const select = document.getElementById('breeds')
const card = document.querySelector('.card')
const form = document.querySelector('form')

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
// Set image from fetch
const generateImage = (data) => {
  const html = `
  <img src='${data}' alt>
  <p>Click to view images of ${select.value}s</p>
  `
  card.innerHTML = html
}

// Create list of dog breeds
const generateOptions = (data) => {
  const options = data
    .map(
      (item) => `
      <option value='${item}'>${item}</option>
    `
    )
    .join('')
  select.innerHTML = options
}

// Get correct breed image from select
const fetchBreedImage = () => {
  const breed = select.value
  const img = card.querySelector('img')
  const p = card.querySelector('p')

  fetchData(`https://dog.ceo/api/breed/${breed}/images/random`).then((data) => {
    img.src = data.message
    img.alt = breed
    p.textContent = `Click to view more ${breed}s`
  })
}

// Check response status
const checkStatus = (response) => {
  if (response.ok) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
const fetchData = (url) => {
  return fetch(url)
    .then(checkStatus)
    .then((res) => res.json())
    .catch((err) => console.log('Looks like there was a problem', err))
}

// Get random image from dog.ceo
fetchData('https://dog.ceo/api/breeds/image/random').then((data) =>
  generateImage(data.message)
)

// Get breeds list from dog.ceo
fetchData('https://dog.ceo/api/breeds/list').then((data) =>
  generateOptions(data.message)
)

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
select.addEventListener('change', fetchBreedImage)
card.addEventListener('click', fetchBreedImage)

// ------------------------------------------
//  POST DATA
// ------------------------------------------
