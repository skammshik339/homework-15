const searchInput = document.querySelector('.searchInput')
const list = document.querySelector('.list')
const addButton = document.querySelector('.addButton')
const inputName = document.querySelector('.inputName')
const inputAge = document.querySelector('.inputAge')
const inputCity = document.querySelector('.inputCity')
const inputSurname = document.querySelector('.inputSurname')
const searchButton = document.querySelector('.searchButton')

const getDataFunction = async url => {
  const getData = async url => {
    const res = await fetch(url)
    const json = await res.json()
    return json
  }

  try {
    const data = await getData(url)
    return data
  } catch (error) {
    console.log(`Произошла ошибка в getData, ${error.message}`)
  }
}

const postDataFunction = async (url, nameobj, surnameobj, ageobj, cityobj) => {
  const postData = async (url, obj) => {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
    const json = await res.text()
    return json
  }

  try {

    const obj = { name: nameobj, surname: surnameobj, age: ageobj, city: cityobj }
    const data = await postData(url, obj)

    return data

  } catch (error) {
    console.log(`Произошла ошибка в postData, ${error.message}`)
  }
}


window.addEventListener('load', async () => {
  const data = JSON.parse(await getDataFunction('http://localhost:3000/getUsers'))
  data.forEach(user => {
    list.insertAdjacentHTML(
      `beforeend`,
      `<li>${user.surname} ${user.name} Возраст: ${user.age} лет Город: ${user.city}</li>`
    )
  })
})

addButton.addEventListener('click', async () => {
  const name = inputName.value
  const surname = inputSurname.value
  const age = inputAge.value
  const city = inputCity.value


  await postDataFunction('http://localhost:3000/addUser', name, surname, age, city)
  location.reload()
})

searchButton.addEventListener('click', async () => {
  const req = searchInput.value
  const data = await getDataFunction(`http://localhost:3000/search?query=${req}`)
  console.log(data)



})






