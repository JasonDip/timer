import React from "react";
import { Tooltip } from "antd";
import { MehOutlined, GithubOutlined } from "@ant-design/icons";

import styles from "./About.module.css";

const About = (props) => {
    return (
        <div className={styles.aboutContainer}>
            <h3>Timer</h3>
            <p>
                Timer is an app for keeping track of time to boost productivity
                and focus. The default configuration is based on the Pomodoro
                Technique, but custom timers can be set in the Timers page.
            </p>
            <h3>Pomodoro Technique</h3>
            <p>
                The Pomodoro Technique is a time management system which breaks
                down work time into intervals followed by breaks. The steps are
                as follows:
                <ol>
                    <li>
                        Plan the work that needs to be done. It is recommended
                        to create objectives.
                    </li>
                    <li>
                        Set the timer for a work interval (about 25 minutes).
                        This work time should be uninterrupted.
                    </li>
                    <li>
                        After a work interval, take a short break (about 5
                        minutes).
                    </li>
                    <li>
                        Repeat until you have done 4 work intervals. Instead of
                        taking a short break, take a longer one (about 20
                        minutes).
                    </li>
                </ol>
                More information can be found
                <a
                    target="_blank"
                    href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
                    rel="noopener noreferrer"
                >
                    <span> here</span>
                </a>
                .
            </p>
            <div className={styles.contactGroup}>
                <Tooltip placement="top" title={"Jason Dip"}>
                    <a
                        target="_blank"
                        href="https://www.jasondip.com/"
                        rel="noopener noreferrer"
                        className={styles.contactIcon}
                    >
                        <MehOutlined />
                    </a>
                </Tooltip>

                <Tooltip placement="top" title={"GitHub"}>
                    <a
                        target="_blank"
                        href="https://github.com/JasonDip"
                        rel="noopener noreferrer"
                        className={styles.contactIcon}
                    >
                        <GithubOutlined />
                    </a>
                </Tooltip>
            </div>
        </div>
    );
};

export default About;
