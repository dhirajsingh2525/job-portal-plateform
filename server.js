require("dotenv").config()
const app = require("./src/app");
const connectToDB = require("./src/config/db");

connectToDB();
console.log(process.env.JWT_SECRET);

app.listen(5000, ()=>{
    console.log("server is running on port 3000")
})