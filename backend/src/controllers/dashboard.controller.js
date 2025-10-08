import jwt from "jsonwebtoken"

const SECRET_KEY = "2c2e693a7c007d6b50a3e1ae55d652c8be8aeba0adba9209f3153e8b2d26e74c"

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(403).json({ message: "Token requerido" })

  const token = authHeader.split(" ")[1]
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token inválido o expirado" })
    req.user = decoded.user
    next()
  })
}

export const dashboard = (req, res) => {
  res.json({ message: `Bienvenido ${req.user}, acceso concedido al panel.` })
}
