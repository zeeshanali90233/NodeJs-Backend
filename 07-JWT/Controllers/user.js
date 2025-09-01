import { signJWT, verifyJWT } from "../Utils/jwt.js";

export const loginUser = (req, res) => {
  try {
    const user = { name: "Zeeshan Ali", id: "12345" };

    const token = signJWT(user);

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllAdmins = (req, res) => {
  try {
    // Verify JWT

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = verifyJWT(token);
    if (!decoded) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const admins = [
      { name: "Admin 1", id: "1" },
      { name: "Admin 2", id: "2" },
    ];

    res.status(200).json({ admins });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
