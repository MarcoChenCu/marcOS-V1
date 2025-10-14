import { exec } from "child_process";

export const runCommand = (req, res) => {
  const { command } = req.body;
  if (!command) return res.status(400).json({ error: "No command provided" });

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.json({ error: stderr || error.message });
    }
    res.json({ output: stdout });
  });
};
