const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  levels: [String], // Store levels (e.g., 'beginner', 'intermediate', 'advanced')
});

const Course = mongoose.model("course", courseSchema);

module.exports = { Course };
