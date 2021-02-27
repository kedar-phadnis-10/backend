const mongoose = require("mongoose");
const options = {
    reconnectTries: Number.MAX_VALUE,
    poolSize: 10
  };
const dbURI = 'mongodb+srv://santhosh:UShY7zNJ6jRNxdgy@cluster0.dd3oj.mongodb.net/oneshot?retryWrites=true&w=majority';
mongoose.connect(dbURI, options).then(
    () => {
      console.log("Database connection established!");
    },
    err => {
      console.log("Error connecting Database instance due to: ", err);
    }
  );