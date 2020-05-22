import React from "react";
import { Timeline } from "antd";
import {
    CheckCircleOutlined,
    PlayCircleOutlined,
    CloseCircleOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";
import styles from "./History.module.css";

const History = (props) => {
    return (
        <div className={styles.container}>
            <h3 style={{ textAlign: "center", paddingBottom: "20px" }}>
                Timer History
            </h3>
            <Timeline className={styles.slowAnimation} reverse mode="left">
                <Timeline.Item
                    label="MM-DD-YYYY"
                    color="green"
                    dot={<PlayCircleOutlined />}
                >
                    Title (00:00) - Start
                </Timeline.Item>
                <Timeline.Item
                    label="MM-DD-YYYY"
                    color="blue"
                    dot={<CheckCircleOutlined />}
                >
                    Title (00:00) - End
                </Timeline.Item>
                <Timeline.Item
                    label="MM-DD-YYYY"
                    color="green"
                    dot={<PlayCircleOutlined />}
                >
                    Title (00:00) - Start
                </Timeline.Item>
                <Timeline.Item
                    label="MM-DD-YYYY"
                    color="red"
                    dot={<CloseCircleOutlined />}
                >
                    Title (00:00) - Cancel
                </Timeline.Item>
                <Timeline.Item
                    label="MM-DD-YYYY"
                    color="grey"
                    dot={<ClockCircleOutlined />}
                >
                    Title (00:00) - Running
                </Timeline.Item>
            </Timeline>
        </div>
    );
};

export default History;
