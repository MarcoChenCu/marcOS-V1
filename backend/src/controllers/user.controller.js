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
    const { username, name, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Usuario y contraseña son requeridos" });
    }

    // Crear usuario con home, shell y nombre completo
    //const cmdCreate = `create-user -m -c "${name || username}" -s /bin/bash ${username}`;
    const createUser = [name || username, '-s', '/bin/bash', username];
    const res = await runCommandSafe('create-user', createUser);

    // Establecer la contraseña
    //const cmdPass = `echo "${username}:${password}" | set-password`;
    const setPassword = [`${username}:${password}`, '|', 'set-password'];
    await runCommandSafe('set-password', setPassword);

    res.json({
      success: true,
      message: `Usuario ${username} creado correctamente`,
      output: res
    });

  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear usuario",
      output: error.message
    });
  }
};



