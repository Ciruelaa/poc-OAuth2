import argon2 from "argon2";
import { connectdb, User } from "../../db";

const handler = async (req, res) => {
  try {
    if (req.method !== "POST")
      return res.status(405).json({ error: "Method not allowed" });
    const { userName = "", fullName, password, contacts } = req.body;
    await connectdb();
    const hashPassword = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      hashLength: 50,
    });
    const cleanUserName = userName
      .toLowerCase()
      .replace(/\./g, "")
      .replace(/\-/g, "");
    const newUser = new User({
      userName: cleanUserName,
      fullName,
      password: hashPassword,
      contacts,
    });

    await newUser.save();

    res.status(200).json({ userName: cleanUserName, fullName, contacts });
  } catch (e) {
    console.error(e);
    res.status(500).json({ description: e });
  }
};

export default handler;
