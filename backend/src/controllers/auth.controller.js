import { createRequire } from "module"
const require = createRequire(import.meta.url)
const pam = require("authenticate-pam")
const jwt = require("jsonwebtoken")

const SECRET_KEY = process.env.SECRET_KEY || "mi_clave_secreta"

export const login = (req, res) => {
  const { user, password } = req.body

  pam.authenticate(user, password, (err) => {
    if (!err) {
      const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: "5h" })
      res.json({ success: true, token, user })
    } else {
      res.status(401).json({ success: false, message: "Credenciales incorrectas" })
    }
  })
}
