const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {

    const updatedData = { ...req.body };

    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(
        updatedData.password,
        10
      );
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
      }
    ).select("-password");

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.getMe = async (req, res) => {
  
  try {

    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("appliedJobs", "name company education role resume")
      
    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.logoutUser = (req, res) => {

  res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
});

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};