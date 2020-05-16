import React, { Fragment } from "react";
import styles from "./CountDown.module.css";

import { Redirect } from "react-router-dom";

export const CountDown = (props) => {
    return (
        <div className={styles.container}>
            <h2>Title</h2>
            <h1>00:00:00</h1>
            <h5>Time is up at 00:00:00 am</h5>
        </div>
    );
};
