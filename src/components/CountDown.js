import React, { Fragment } from "react";
import "./CountDown.css";

export const CountDown = (props) => {
    return (
        <div className="container">
            <h2>Title</h2>
            <h1>00:00:00</h1>
            <h6>Time is up at 00:00:00 am</h6>
        </div>
    );
};
