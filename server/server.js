const express = require('express')
const path = require('path')
const morgan = require('morgan')
const fs = require('fs')
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT
const clientUrl = process.env.clientUrl

const app = express()

const getPath = filename => path.join(__dirname, 'public', `${filename}.html`)

app.use(express.static(path.join(__dirname, 'public')))

app.use(morgan(':method :url :status'))

app.use(express.json())


app.use(
  cors({
    methods: ['GET', 'POST'],
    origin: [clientUrl]
  })
)




app.get('/getUsers', (req, res) => {
  try {
    const users = fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf-8')
    res.json(users)
  } catch (error) {
    console.log('Ошибка при получении пользователей', error)
    res.send('Ошибка при получении пользователей', error)
  }
})


app.post('/addUser', (req, res) => {
  try {
    const user = req.body
    const users = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf-8')
    )
    users.push(user)
    fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(users))
    res.send(`Пользователь ${user} успешно добавлен`)
  } catch (error) {
    console.log('Ошибка при добавлении пользователя', error)
    res.send('Ошибка при добавлении пользователя', error)
  }
})

app.get('/search', (req, res) => {
  const query = req.query.query

  const users = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf-8')
  )

  const user = users.find((nameUser) => {
    return nameUser.name === query
  })



  res.json({ user })

})







app.use((req, res) => {
  res.status(404).sendFile(getPath('404'))
})

app.listen(PORT, () => {
  console.log(`server is listening port: ${PORT}`)
})