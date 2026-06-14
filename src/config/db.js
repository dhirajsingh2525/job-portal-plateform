const mongoose = require("mongoose");

const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);   

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Mongo Error:", error);
  }
}

module.exports = connectToDB;