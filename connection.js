const mongoose = require("mongoose");

// start editable

// as defined in 'Database Access' on Atlas/Mongo

const dbname = "yoobee";
const username = "ymat";
const password = "Yuki-E2917";

// with backticks
const url = `mongodb+srv://${username}:${password}@mondayreact.bgw3j.mongodb.net/${dbname}?retryWrites=true&w=majority`;

// end editable

// connection start

mongoose.connect(url, {
  useNewUrlParser: true,

  useUnifiedTopology: true,
});

// feedback to let us know we succeeded

mongoose.connection.on("connected", (err, res) => {
  console.log("Success! Connected to MongoDB");
});

// let us know we failed

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to MongoDB ", err);
});

// end connection code
