import React, { useState } from "react";
import styles from "../styles.module.css";

const Card = ({ item }) => {
  const { name, description } = item;
  return (
    <div className={styles.card_container}>
      <div>{name}</div>
      <div>{description}</div>
    </div>
  );
};

export default Card;
