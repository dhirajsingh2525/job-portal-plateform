const express = require('express');
const app = express();
const userRouter = require("./routes/auth.routes");
const jobRouter = require("./routes/job.routes");
const applicationRouter = require("./routes/application.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://job-portal-frontent-jp15.vercel.app/"
  ],
  credentials: true
}));

// 2. BODY PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. COOKIE PARSER
app.use(cookieParser());


app.use("/api", userRouter);
app.use("/api/job", jobRouter);
app.use("/api/applications", applicationRouter);


module.exports = app;