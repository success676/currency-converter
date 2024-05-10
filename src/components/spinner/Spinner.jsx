import { Spin } from "antd";
import React from "react";
import styles from "./Spinner.module.css";

const Spinner = ({ size = "large" }) => {
    return <Spin className={styles.root} size={size} />;
};

export default Spinner;
