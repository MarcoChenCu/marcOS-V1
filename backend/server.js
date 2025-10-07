import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import { createRequire } from "module"
const require = createRequire(import.meta.url)
const pam = require("authenticate-pam")
const jwt = require("jsonwebtoken")

const SECRET_KEY = "2c2e693a7c007d6b50a3e1ae55d652c8be8aeba0adba9209f3153e8b2d26e74c"


const app = express()
//app.use(cors({ origin: "http://localhost:5173", credentials: true })) //pruebas Ubuntu Desktop
app.use(cors({ origin: true, credentials: true })) // Pruebas Ubuntu Server
app.use(bodyParser.json())

app.post("/api/login", (req, res) => {
  const { user, password } = req.body

  pam.authenticate(user, password, (err) => {
    if (!err) {
      const token = jwt.sign({user}, SECRET_KEY, {expiresIn: "5h"})
      res.json({ success: true, token, user})
    } else {
      res.status(401).json({ success: false, message: "Credenciales incorrectas" })
    }
  })
})

// Middleware para validar token
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(403).json({ message: "Token requerido" })

  const token = authHeader.split(" ")[1]
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token inválido o expirado" })
    req.user = decoded.user
    next()
  })
}

// Ejemplo de ruta protegida
app.get("/api/dashboard", verifyToken, (req, res) => {
  res.json({ message: `Bienvenido ${req.user}, acceso concedido al panel.` })
})

app.listen(3000, () => console.log("✅ Backend corriendo en http://localhost:3000"))

