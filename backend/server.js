// backend/server.js
import express from "express"
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("Servidor backend funcionando 🚀")
})

app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000")
})
