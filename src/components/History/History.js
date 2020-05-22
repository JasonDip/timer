import React from "react";
import { Timeline } from "antd";
import styles from "./History.module.css";

const History = (props) => {
    return (
        <div className={styles.container}>
            <Timeline reverse mode="left">
                <Timeline.Item label="MM-DD-YYYY" color="green">
                    Title started (00:00)
                </Timeline.Item>
                <Timeline.Item label="MM-DD-YYYY" color="blue">
                    Title ended (00:00)
                </Timeline.Item>
                <Timeline.Item label="MM-DD-YYYY" color="green">
                    Title started (00:00)
                </Timeline.Item>
                <Timeline.Item label="MM-DD-YYYY" color="red">
                    Title cancelled (00:00)
                </Timeline.Item>
            </Timeline>
        </div>
    );
};

export default History;
