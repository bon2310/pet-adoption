const template = document.querySelector("#pet-card-template")
const wrapper = document.createDocumentFragment()


async function start() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast")
  const weatherData = await weatherPromise.json()
  const ourTemperature = weatherData.properties.periods[0].temperature
  document.querySelector("#temperature-output").textContent = ourTemperature

  console.log(ourTemperature)
}

start()

async function petsArea() {
  const petsPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json")
  const petsData = await petsPromise.json()
  console.log(petsData)
  petsData.forEach(pet => {
    const clone = template.content.cloneNode(true)

    clone.querySelector("h3").textContent = pet.name
    clone.querySelector("p.pet-description").textContent = pet.description
    clone.querySelector("p.pet-age").textContent = createAgeText(pet.birthYear)

    clone.querySelector("img").src = pet.photo

    wrapper.appendChild(clone)
    console.log(pet.photo)
  })

  document.querySelector(".list-of-pets").appendChild(wrapper)
}

petsArea()

function createAgeText(birthYear) {
  const currentYear = new Date().getFullYear()
  const age = currentYear - birthYear

  if (age == 1) return "1 Year old"
  if (age == 0) return "Less than a Year Old"
  return `${age} Years Old`
}