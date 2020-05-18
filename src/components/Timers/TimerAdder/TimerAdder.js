import React, { useState } from "react";
import { Button, Input, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import styles from "./TimerAdder.module.css";

const TimerAdder = (props) => {
    const defaultTimer = {
        title: "",
        hours: "",
        minutes: "",
        seconds: "",
    };

    const [newTimer, setNewTimer] = useState({ ...defaultTimer });
    const [invalidDuration, setInvalidDuration] = useState(false);

    const changeHandler = (e, key) => {
        const value = e.target.value;
        setNewTimer((timer) => {
            return {
                ...timer,
                [key]: value,
            };
        });
    };

    const addTimerHandler = () => {
        let duration = 0;
        let hours = Number(newTimer.hours) * 1000 * 60 * 60;
        let minutes = Number(newTimer.minutes) * 1000 * 60;
        let seconds = Number(newTimer.seconds) * 1000;
        if (hours) duration += hours;
        if (minutes) duration += minutes;
        if (seconds) duration += seconds;
        if (duration <= 0) {
            setInvalidDuration(true);
            return;
        }
        props.setTimerList((timerList) => [
            ...timerList,
            { title: newTimer.title, duration: duration },
        ]);
        setNewTimer({ ...defaultTimer });
        setInvalidDuration(false);
    };

    return (
        <div className={styles.containerLeft}>
            <h3>Add a Timer</h3>
            <br />
            <label>Title</label>
            <Input
                placeholder="Title"
                value={newTimer.title}
                onChange={(e) => changeHandler(e, "title")}
                type="text"
            />
            <br />

            <label>
                Duration
                {invalidDuration ? (
                    <span style={{ color: "red" }}>
                        {" "}
                        must be greater than 0
                    </span>
                ) : null}
            </label>
            <div className={styles.containerDuration}>
                <Input
                    placeholder="Hours"
                    value={newTimer.hours}
                    onChange={(e) => changeHandler(e, "hours")}
                    type="number"
                />
                <Input
                    placeholder="Minutes"
                    value={newTimer.minutes}
                    onChange={(e) => changeHandler(e, "minutes")}
                    type="number"
                />
                <Input
                    placeholder="Seconds"
                    value={newTimer.seconds}
                    onChange={(e) => changeHandler(e, "seconds")}
                    type="number"
                />
            </div>
            <br />

            <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={addTimerHandler}
            >
                Add
            </Button>
        </div>
    );
};

export default TimerAdder;
