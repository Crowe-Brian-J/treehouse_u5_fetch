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
// To DRY up code
const fetchData = (url) => {
  return fetch(url)
    .then(checkStatus)
    .then((res) => res.json())
    .catch((err) => console.log('Looks like there was a problem', err))
}

Promise.all([
  fetchData('https://dog.ceo/api/breed/affenpinscher/images/random'),
  fetchData('https://dog.ceo/api/breeds/list')
]).then((data) => {
  const randomImage = data[0].message
  const breedList = data[1].message

  generateImage(randomImage)
  generateOptions(breedList)
})

// ------------------------------------------
//  POST DATA
// ------------------------------------------
//
const postData = (e) => {
  e.preventDefault()
  const name = document.getElementById('name').value
  const comment = document.getElementById('comment').value

  fetch('https://jsonplaceholder.typicode.com/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, comment })
  })
    .then(checkStatus)
    .then((res) => res.json())
    .then((data) => console.log(data))
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
select.addEventListener('change', fetchBreedImage)
card.addEventListener('click', fetchBreedImage)
form.addEventListener('submit', postData)
