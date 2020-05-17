import React from "react";

import { List, Avatar } from "antd";

import styles from "./TimerList.module.css";

const data = [
    {
        title: "Test Title",
    },
    {
        title: "Test Title",
    },
    {
        title: "Test Title",
    },
    {
        title: "Test Title",
    },
    {
        title: "Test Title",
    },
    {
        title: "Test Title",
    },
    {
        title: "Test Title",
    },
    {
        title: "Test Title",
    },
    {
        title: "Test Title",
    },
    {
        title: "Test Title",
    },
    {
        title: "Test Title",
    },
    {
        title: "Test Title",
    },
    {
        title: "Test Title",
    },
    {
        title: "Test Title",
    },
];

const TimerList = (props) => {
    return (
        <div className={styles.containerRight}>
            <List
                className="alarmList"
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="/clock.jpg" />}
                            title={
                                <a href="https://google.com">{item.title}</a>
                            }
                            description="test description"
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default TimerList;
