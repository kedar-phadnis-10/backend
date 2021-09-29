const mongoose = require("mongoose");
const options = {
    reconnectTries: Number.MAX_VALUE,
    poolSize: 10
  };
const dbURI = 'mongodb+srv://ce17b040:abc123456@cluster0.wc7jg.mongodb.net/oneshot?retryWrites=true&w=majority';
mongoose.connect(dbURI, options).then(
    () => {
      console.log("Database connection established!");
    },
    err => {
      console.log("Error connecting Database instance due to: ", err);
    }
  );