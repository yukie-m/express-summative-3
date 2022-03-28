const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbname = "summativeThree";
    const username = "ymat";
    const password = "Yuki-E2917";

    // with backticks
    const url = `mongodb+srv://${username}:${password}@mondayreact.bgw3j.mongodb.net/${dbname}?retryWrites=true&w=majority`;

    const conn = await mongoose.connect(url);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
