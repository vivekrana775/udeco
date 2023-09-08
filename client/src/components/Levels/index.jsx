import React from "react";
import styles from "./styles.module.css";
import { useLocation } from "react-router-dom";
const Levels = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <div className={styles.level_container}>
      Congratulation you've unlocked the {state} Level . Now its time to improve
      your skills
    </div>
  );
};

export default Levels;
