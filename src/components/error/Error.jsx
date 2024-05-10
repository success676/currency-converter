import { Alert } from "antd";
import React from "react";
import styles from "./Error.module.css";

const Error = ({ description, onClose }) => {
    return (
        <Alert
            className={styles.root}
            message="Error"
            type="error"
            closable
            onClose={onClose}
            description={description}
        />
    );
};

export default Error;
