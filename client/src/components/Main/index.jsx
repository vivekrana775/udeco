import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import Card from "./components/Card";
const Main = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getAllCourses = async () => {
      const res = await axios.get(
        "http://localhost:8080/api/course/getAllCourses"
      );
      setCourses(res.data);
    };

    getAllCourses();
  }, []);

  console.log(courses);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Udeco</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className={styles.main_card_container}>
        {courses?.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default Main;
