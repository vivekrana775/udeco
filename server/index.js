require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");
const mongoose = require("mongoose");

// middlewares
app.use(express.json());
app.use(cors());

const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));
// routes

app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/course", courseRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
