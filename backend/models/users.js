const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  this.email = this.email.toLowerCase();
  const SALT = 10;
  const hashedPassword = await bcrypt.hash(this.password, SALT);
  this.password = hashedPassword;
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
