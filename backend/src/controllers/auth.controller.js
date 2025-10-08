import { createRequire } from "module"
const require = createRequire(import.meta.url)
const pam = require("authenticate-pam")
const jwt = require("jsonwebtoken")

const SECRET_KEY = "2c2e693a7c007d6b50a3e1ae55d652c8be8aeba0adba9209f3153e8b2d26e74c"

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
