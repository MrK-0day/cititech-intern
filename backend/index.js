require('dotenv').config()
const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const { db } = require('./modules/sqlite3')

app.use(cors())
app.use(bodyParser.json())

const AsyncDBAll = (query) => new Promise((resolve, reject) => {
  db.all(query, (err, rows) => {
    if (err) reject(err)
    resolve(rows)
  })
})

const AsyncDBRun = (query) => new Promise((resolve, reject) => {
  db.run(query, (err, rows) => {
    if (err) reject(err)
    resolve(rows)
  })
})

app.post('/API/createMember', async (req, res) => {
  let { name, email } = req.body
  let T = await AsyncDBRun(`INSERT INTO member(name, email) VALUES ('${name}', '${email}')`)
  res.json(T)
})

app.post('/API/createProject', async (req, res) => {
  let { name, description } = req.body
  let T = await AsyncDBRun(`INSERT INTO project(name, description) VALUES ('${name}', '${description}')`)
  res.json(T)
})

app.post('/API/assignMemberToProject', async (req, res) => {
  let { IDproject, IDmember } = req.body
  let T = await AsyncDBRun(`INSERT INTO job(ID_project, ID_member) VALUES ('${+IDproject}', '${+IDmember}')`)
  res.json(T)
})

app.post('/API/removeMemberFromProject', async (req, res) => {
  let { ID } = req.body
  let T = await AsyncDBRun(`DELETE FROM job WHERE ID_member = ${+ID}`)
  res.json(T)
})

app.get('/API/getProjectDetail/:ID?', async (req, res) => {
  let { ID } = req.params
  let T = await AsyncDBAll(`SELECT j.ID_project, j.ID_member, p.name as namepj, p.description, m.name FROM job j join project p on j.ID_project = p.ID join member m on j.ID_member = m.ID WHERE ID_project = ${+ID}`)
  res.json(T)
})

app.get('/API/getFullProject', async (req, res) => {
  let T = await AsyncDBAll(`SELECT * FROM project`)
  res.json(T)
})

app.get('/API/getFullMember', async (req, res) => {
  let T = await AsyncDBAll(`SELECT * FROM member`)
  res.json(T)
})

app.listen(process.env.PORT || 4000)
