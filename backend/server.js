import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

const app = express()

// 🔧 Permitir solicitudes desde el frontend
app.use(cors({
  origin: "http://localhost:5173", // o el puerto real donde corre tu Vue
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("Servidor backend funcionando 🚀")
})

app.listen(3000, () => {
  console.log("Servidor backend escuchando en http://localhost:3000")
})
