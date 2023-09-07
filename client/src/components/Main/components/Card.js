import React, { useState } from "react";
import styles from "../styles.module.css";
import { Link, useNavigate } from "react-router-dom";

const Card = ({ item }) => {
  const navigate = useNavigate();
  const { name, description } = item;

  const handleNavigation = () => {
    navigate("/course", { state: item });
  };
  return (
    <div className={styles.card_container} onClick={() => handleNavigation()}>
      <div>{name}</div>
      <div>{description}</div>
    </div>
  );
};

export default Card;
