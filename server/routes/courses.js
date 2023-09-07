const router = require("express").Router();
const { Course } = require("../models/course");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/getAllCourses", async (req, res) => {
  try {
    const courses = await Course.find();
    return res.status(200).json(courses);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/unlockCourse", async (req, res) => {
  try {
    const { course_id, user_id, level_to_unlock } = req.body;
    const user = await User.findById(user_id);
    const course = await Course.findById(course_id);
    const { unlockedCourses } = user;
    const booli = false;
    for (let i = 0; i < unlockedCourses.length; i++) {
      if (unlockedCourses[i].courseName[0] == course_id) {
        console.log("these are unlocked courses", unlockedCourses[i]);
        // booli = true;
        //   console.log("booliii", booli);
        unlockedCourses[i].unlockedLevels.push(level_to_unlock);
        user.save();
        return res.status(200);
      }
    }

    if (booli == false) {
      unlockedCourses.push({
        unlockedLevels: [level_to_unlock],
        courseName: [course_id],
      });
    }

    console.log(unlockedCourses, course_id, booli);
    user.save();
    res.status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
