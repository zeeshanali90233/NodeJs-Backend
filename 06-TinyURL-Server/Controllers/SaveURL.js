import { URLs } from "../Models/url.js";

export const SaveURL = async (req, res) => {
  const { longUrl } = req.body;
  try {
    const newURL = new URLs({ longUrl: longUrl });
    const savedRef = await newURL.save();
    const shortURLId = savedRef._id;
    const shortURL = `http://localhost:5050/url/${shortURLId}`;
    res.status(200).json({
      ok: true,
      shortURL: shortURL,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
    });
  }
};
