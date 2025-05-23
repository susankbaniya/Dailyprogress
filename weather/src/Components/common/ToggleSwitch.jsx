import React from "react";
import styles from "./ToggleSwitch.module.css";

const ToggleSwitch = ({ isChecked, onToggle }) => {
  return (
    <input
      type="checkbox"
      className={styles.checkbox}
      checked={isChecked}
      onChange={onToggle}
    />
  );
};

export default ToggleSwitch;
