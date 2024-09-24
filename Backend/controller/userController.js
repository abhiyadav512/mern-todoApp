const { genrateToken } = require("../middlewares/jwt");
const User = require("../models/userModle");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ username, email, password });

    const response = await newUser.save();

    const payload = {
      id: response._id,
      username: response.username,
    };

    const token = genrateToken(payload);

    res.status(200).json({ response: response, token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password); // Ensure this method exists in your User model
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    const payload = {
      id: user._id,
      username: user.username,
    };

    const token = genrateToken(payload);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
