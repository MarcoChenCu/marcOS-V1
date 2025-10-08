import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import authRoutes from "./src/routes/auth.routes.js"
import dashboardRoutes from "./src/routes/dashboard.routes.js"

const app = express()

// CORS (ajusta origen si lo deseas)
app.use(cors({ origin: true, credentials: true }))
app.use(bodyParser.json())

// Rutas API
app.use("/api", authRoutes)
app.use("/api", dashboardRoutes)

// Middleware para 404
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint no encontrado" })
})

export default app
