import React from "react";
import { withRouter } from "react-router-dom";
import { List, Avatar } from "antd";
import { CLOCK_STATE } from "../CountDown/CountDown";

import styles from "./TimerList.module.css";

const TimerList = (props) => {
    const placeholderData = [];

    const timerClickHandler = (e) => {
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
        props.setSelectedTimer(JSON.parse(target.getAttribute("rowKey")));
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
