import Cookie from "cookies";
import argon2 from "argon2";
import { User, connectdb } from "../../db";

const COOKIE_SECRET = process.env.COOKIE_SECRET;

const handler = async (req, res) => {
  try {
    if (req.method !== "POST")
      return res.status(405).json({ error: "Method not allowed" });
    const { userName, password } = req.body;
    await connectdb();

    const user = await User.findOne({ userName: userName });

    if (user) {
      const isValidPassword = await argon2.verify(user.password, password);
      if (isValidPassword) {
        const cookies = new Cookie(req, res, { keys: [COOKIE_SECRET] });
        cookies.set("userName", userName, { signed: true });
        cookies.set("fullName", user.fullName, { signed: true });
        return res.status(200).json({
          userName: userName,
          fullName: user.fullNamem,
          contacts: user.contacts,
        });
      }
    }
    return res
      .status(401)
      .json({ error: "username/password combination doesn't match" });
  } catch (e) {
    console.error(e);
  }
};

export default handler;
