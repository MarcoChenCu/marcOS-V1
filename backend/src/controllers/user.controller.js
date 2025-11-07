import { runCommandSafe } from "../services/userExec.service.js";

export const getUsers = async (req, res) => {
  try {
    const output = await runCommandSafe("list");
    const lines = output.trim().split("\n");

    // Procesar cada línea del formato /etc/passwd
    const users = lines.map(line => {
      const parts = line.split(":");
      return {
        username: parts[0],
        uid: parseInt(parts[2]),
        name: parts[4] || "",
        home: parts[5],
        shell: parts[6],
      };
    });

    // Filtrar solo usuarios "humanos" (UID >= 1000)
    const filtered = users.filter(u => u.uid >= 1000);

    res.json({ success: true, users: filtered });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener usuarios del sistema",
      output: error.message,
    });
  }
};

//Crear usuario
export const createUser = async (req, res) => {
  try {
    const { username, name, password } = req.body

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Usuario y contraseña son requeridos'
      })
    }

    const comment = name || username

    // Crear usuario
    await runCommandSafe('create-user', [comment, '-s', '/bin/bash', username])

    // Establecer contraseña usando stdin
    await runCommandSafe('set-password', [], `${username}:${password}\n`)

    res.json({
      success: true,
      message: `Usuario ${username} creado correctamente`
    })
  } catch (error) {
    console.error('Error al crear usuario:', error)
    res.status(500).json({
      success: false,
      message: 'Error al crear usuario',
      output: error.message
    })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { username } = req.body

    if (!username || typeof username !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Debe proporcionar un nombre de usuario válido.'
      })
    }

    // Protección básica: evitar borrar root o el usuario actual del sistema
    const protectedUsers = ['root', 'daemon', 'bin', 'sys', 'sync', 'nobody','marcos']
    if (protectedUsers.includes(username)) {
      return res.status(403).json({
        success: false,
        message: `No se permite eliminar el usuario protegido: ${username}`
      })
    }

    // Confirmar que el usuario existe antes de intentar eliminarlo
    const userExists = await runCommandSafe('check-user', [username])
    if (!userExists.includes(username)) {
      return res.status(404).json({
        success: false,
        message: `El usuario "${username}" no existe en el sistema.`
      })
    }

    // Ejecutar eliminación segura
    const output = await runCommandSafe('delete-user', [username])

    res.json({
      success: true,
      message: `Usuario "${username}" eliminado correctamente.`,
      output
    })
  } catch (error) {
    console.error('Error al eliminar usuario:', error)
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el usuario.',
      output: error.message
    })
  }
}







