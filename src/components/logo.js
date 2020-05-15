import React from "react";
import { useHistory } from "react-router-dom";

export const Logo = (props) => {
    let history = useHistory();
    return (
        <img
            className="logo"
            src="hourglass.png"
            alt="hourglass logo"
            // onClick={() => history.push("/")}
        />
    );
};
