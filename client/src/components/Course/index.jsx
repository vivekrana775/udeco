import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Course = () => {
  const { state } = useLocation();
  const { _id, name, description, levels } = state;
  const user = JSON.parse(localStorage.getItem("user"));
  const [allUnlockedCourses, setAllUnlockedCourses] = useState([]);
  const [help, setHelp] = useState(false);

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

    setTimeout(() => {
      setHelp(!help);
    }, "1000");
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
  }, [help]);

  return (
    <div className={styles.course_container}>
      <div>
        {levels?.map((item) => (
          <div className={styles.course_level} key={item}>
            <div>{item}</div>
            {!unlockedLevels.find((type) => type == item) && (
              <div
                className="btn btn-danger"
                onClick={() => handleUnlock(item)}
              >
                unlock
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;
