import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import authRoutes from "./src/routes/auth.routes.js"
import dashboardRoutes from "./src/routes/dashboard.routes.js"
import systemRoutes from "./src/routes/system.routes.js"
import processRoutes from "./src/routes/process.routes.js"
import execRoutes from "./src/routes/exec.routes.js";
import updateRoutes from "./src/routes/update.routes.js";
import appRoutes from "./src/routes/app.routes.js";
const app = express()

// CORS (ajusta origen si lo deseas)
app.use(cors({ origin: '*', credentials: true }))
app.use(bodyParser.json())

// Rutas API
app.use("/api", authRoutes)
app.use("/api", dashboardRoutes)
app.use("/api", systemRoutes)
app.use("/api", processRoutes)
app.use("/api", execRoutes);
app.use("/api", updateRoutes);
app.use("/api", appRoutes);

// Middleware para 404
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint no encontrado" })
})

export default app
