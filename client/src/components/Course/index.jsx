import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Course = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { _id, name, description, levels } = state;
  const user = JSON.parse(localStorage.getItem("user"));
  const [allUnlockedCourses, setAllUnlockedCourses] = useState([]);
  const [refresh, setRefresh] = useState([]);

  let unlockedLevels = [];

  for (let i = 0; i < allUnlockedCourses.length; i++) {
    if (allUnlockedCourses[i]["courseName"][0] == _id) {
      unlockedLevels = allUnlockedCourses[i]["unlockedLevels"];
    }
  }
  const handleUnlock = async (item) => {
    const res = await axios.post(
      "http://localhost:8080/api/course/unlockCourse",
      {
        course_id: _id,
        user_id: user._id,
        level_to_unlock: item,
      }
    );
    setRefresh(res.data);
  };

  const navigateToCourse = (level) => {
    navigate("/level", { state: level });
  };

  useEffect(() => {
    const getUnlockedCourses = async () => {
      const res = await axios.post(
        "http://localhost:8080/api/users/getUnlockedCourses",
        {
          email: user.email,
        }
      );

      setAllUnlockedCourses(res.data);
    };
    getUnlockedCourses();
  }, [refresh]);

  return (
    <div className={styles.course_container}>
      Hello this is {name} course and you've to unlock the courses to begin.
      <div>
        {levels?.map((item) => (
          <div className={styles.course_level} key={item}>
            <div>{item}</div>
            {!unlockedLevels.find((type) => type == item) ? (
              <div
                className="btn btn-danger"
                onClick={() => handleUnlock(item)}
              >
                unlock
              </div>
            ) : (
              <div
                className="btn btn-success"
                onClick={() => navigateToCourse(item)}
              >
                Go to course
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;
