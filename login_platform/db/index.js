import mongoose from "mongoose";

const { DB_HOST, DB_DATABASE } = process.env;

const connectdb = async () => {
  return await mongoose.connect(`mongodb://${DB_HOST}/${DB_DATABASE}`);
};

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true, lowercase: true },
  fullName: { type: String, required: true },
  password: { type: String, required: true },
  contacts: [
    {
      name: { type: String, required: true },
      number: { type: String, required: true },
    },
  ],
});

const User = mongoose.models["User"] || mongoose.model("User", UserSchema);

export { connectdb, User };
