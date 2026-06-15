const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
   console.log("middleware hit");

  try {

    const token = req.cookies.token;
     console.log(token,"token")
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    console.log(decoded,"decoded")
    req.user = decoded;

    next();

  } catch (error) {
    console.log("JWT ERROR FULL:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });

  }
};


const isRecruiter = (req, res, next) => {

  if (req.user.role !== "recruiter") {
    return res.status(403).json({
      success: false,
      message: "Recruiter access only",
    });
  }

  next();
};

module.exports = {
  isLoggedIn,
  isRecruiter
}