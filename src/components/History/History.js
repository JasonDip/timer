import React from "react";
import { Timeline, Button } from "antd";
import {
    CheckCircleOutlined,
    PlayCircleOutlined,
    CloseCircleOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";

import { HISTORY_STATE, CLOCK_STATE } from "../constants";
import { formatMilliseconds } from "../util";
import styles from "./History.module.css";

const History = (props) => {
    // need to create all timeline items here due to bug in antd
    // cannot create Timeline.Item components separately
    let items = props.timerHistory.map((history) => {
        let color;
        let icon;
        switch (history.state) {
            case HISTORY_STATE.START:
                color = "blue";
                icon = <PlayCircleOutlined />;
                break;
            case HISTORY_STATE.FINISH:
                color = "green";
                icon = <CheckCircleOutlined />;
                break;
            case HISTORY_STATE.STOP:
                color = "red";
                icon = <CloseCircleOutlined />;
                break;
            default:
                color = "grey";
                icon = <ClockCircleOutlined />;
                break;
        }
        return (
            <Timeline.Item label={history.time} color={color} dot={icon}>
                {history.title} ({history.duration}){" - "}
                {history.state}
            </Timeline.Item>
        );
    });

    // add additional item if the timer is currently running/paused
    let activeItem;
    if (
        props.clockState === CLOCK_STATE.RUNNING ||
        props.clockState === CLOCK_STATE.PAUSED
    ) {
        activeItem = (
            <Timeline.Item
                label={props.activeTimer.time || " "}
                color="grey"
                dot={<ClockCircleOutlined />}
            >
                {props.activeTimer.title} (
                {formatMilliseconds(props.activeTimer.duration)}){" - "}
                {props.clockState}
            </Timeline.Item>
        );
    } else {
        activeItem = null;
    }

    let clearClickHandler = () => {
        props.setTimerHistory([]);
    };

    return (
        <div className={styles.container}>
            <h3 style={{ textAlign: "center" }}>Timer History</h3>
            <Button
                danger
                style={{
                    textAlign: "center",
                    width: "auto",
                }}
                onClick={clearClickHandler}
            >
                Clear
            </Button>
            <Timeline
                style={{ paddingTop: "20px", width: "100%" }}
                reverse
                mode="left"
            >
                {items}
                {activeItem}
            </Timeline>
        </div>
    );
};

export default History;
