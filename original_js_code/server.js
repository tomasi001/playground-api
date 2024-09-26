require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const cors = require("cors");
const colors = require("colors");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's actual domain
    // origin: "https://playground-kappa-lake.vercel.app", // Replace with your frontend's actual domain
  })
);

app.use(express.json()); // Parse incoming JSON requests

// Middleware to log incoming requests
const requestLogger = require("./middlewares/requestLogger");
app.use(requestLogger);

// Routes
const openaiRoutes = require("./routes/openaiRoutes");
app.use("/api/openai", openaiRoutes);

// Start the server
app.listen(port, () => {
  console.log(colors.blue(`Server running on port ${port}`));
});
