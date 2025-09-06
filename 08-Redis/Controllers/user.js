import { signJWT, verifyJWT } from "../Utils/jwt.js";
import { connectRedis, getCache, setCache } from "../Utils/redis.js";

export const loginUser = (req, res) => {
  try {
    const user = { name: "Zeeshan Ali", id: "12345" };

    const token = signJWT(user);

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllAdmins = async (req, res) => {
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

    // Try to get admins from cache
    let admins = await getCache("admins");

    if (!admins) {
      console.log("Cache miss - fetching from DB");
      // Simulate DB fetch
      admins = [
        { name: "Admin 1", id: "1" },
        { name: "Admin 2", id: "2" },
      ];
      await setCache("admins", admins, 3600); // cache for 1 hour
    } else {
      console.log("Cache hit - fetched from Redis");
    }

    res.status(200).json({ admins });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
