const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userShema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userShema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hassPass = await bcrypt.hash(this.password, salt);

    this.password = hassPass;
    next();
  } catch (error) {
    return next(error);
  }
});

userShema.methods.comparePassword = async function (candidatePass) {
  try {
    const isMatch = await bcrypt.compare(candidatePass, this.password);
    return isMatch;
  } catch (error) {
    return error;
  }
};

const User = mongoose.model("User", userShema);

module.exports = User;
