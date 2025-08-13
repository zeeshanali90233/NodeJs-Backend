import { URLs } from "../Models/url.js";

export const RedirectURL = async (req, res) => {
  const { shortId } = req.params;
  try {
    const resUrls = await URLs.find({ _id: shortId });
    const element = resUrls[0];
    console.log(element);

    res.redirect(element.longUrl);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
    });
  }
};
