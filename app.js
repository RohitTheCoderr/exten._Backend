const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const { Db_Connection } = require("./config/Db_Connection");
const { mainRoute } = require("./routes/mainRoute");

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Connect to Database
Db_Connection();

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Backend!");
});

// Routes
app.use('/api/users', mainRoute);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
