const router = require("express").Router();
const { Course } = require("../models/course");
const bcrypt = require("bcrypt");

router.get("/getAllCourses", async (req, res) => {
  try {
    const courses = await Course.find();
    return res.status(200).json(courses);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
