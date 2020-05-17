import React from "react";
import moment from "moment";
import { getEndTime } from "../util";

import { withRouter } from "react-router-dom";
import { List, Avatar } from "antd";
import { CLOCK_STATE } from "../CountDown/CountDown";

import styles from "./TimerList.module.css";

const TimerList = (props) => {
    const placeholderData = [];
    const timerClickHandler = (e) => {
        // bubble up to the menu-item-div that is holding the timer object
        let target = e.target;
        let tryCount = 5;
        while (!target.hasAttribute("rowKey")) {
            target = target.parentElement;
            tryCount--;
            if (tryCount <= 0) {
                console.log("Couldn't find rowKey.");
                return;
            }
        }
        let timer = JSON.parse(target.getAttribute("rowKey"));
        // clear previous interval if currently running
        if (props.intervalId) {
            clearInterval(props.intervalId);
            props.setIntervalId(null);
        }
        // set state to run timer
        props.setSelectedTimer(timer);
        props.setActiveTimer(timer);
        props.setTimerEndTime(getEndTime(moment(), timer.duration));
        props.setClockState(CLOCK_STATE.RUNNING);
        props.history.push("/");
    };

    return (
        <div className={styles.containerRight}>
            <List
                className={styles.timerList}
                itemLayout="horizontal"
                dataSource={props.timerList || placeholderData}
                renderItem={(item) => (
                    <List.Item className={styles.timerItem}>
                        <List.Item.Meta
                            rowKey={JSON.stringify(item)}
                            avatar={<Avatar src="/clock.jpg" />}
                            title={item.title}
                            description={item.duration}
                            onClick={timerClickHandler}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default withRouter(TimerList);
