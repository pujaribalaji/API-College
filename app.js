const express = require('express');
const session=require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
const PORT = 3030;


app.use(bodyParser.json());

app.use(
    session({
      secret: "your_session_secret", // Replace with your secret key
      resave: false,
      saveUninitialized: false,
    })
  );

mongoose.connect(process.env.MONGODBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connected to MongoDB");
  });

// Load routes
const routes = require('./routes');
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




