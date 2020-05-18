import React, { useState } from "react";
import moment from "moment";
import { getEndTime, formatMilliseconds } from "../../util";

import { withRouter } from "react-router-dom";
import { List, Avatar, Modal } from "antd";
import { CLOCK_STATE } from "../../CountDown/CountDown";

import styles from "./TimerList.module.css";

const TimerList = (props) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteUuid, setDeleteUuid] = useState("");
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

    const timerDeleteHandler = (e) => {
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
        setDeleteUuid(timer.uuid);
        setShowDeleteModal(true);
    };

    const confirmTimerDeleteHandler = () => {
        props.setTimerList((timerList) => {
            return timerList.filter((el) => el.uuid !== deleteUuid);
        });
        setShowDeleteModal(false);
    };

    return (
        <div className={styles.containerRight}>
            <h3>Select a Timer</h3>
            <List
                className={styles.timerList}
                itemLayout="horizontal"
                dataSource={props.timerList || placeholderData}
                renderItem={(item) => (
                    <List.Item
                        className={styles.timerItem}
                        rowKey={JSON.stringify(item)}
                        actions={[
                            <button onClick={timerDeleteHandler}>DEL</button>,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src="/clock.jpg" />}
                            title={item.title}
                            description={formatMilliseconds(item.duration)}
                            onClick={timerClickHandler}
                        />
                    </List.Item>
                )}
            />
            <Modal
                centered
                title="Delete Timer"
                visible={showDeleteModal}
                okText="Yes"
                onOk={confirmTimerDeleteHandler}
                onCancel={() => setShowDeleteModal(false)}
            >
                Are you sure you want to delete the timer?
            </Modal>
        </div>
    );
};

export default withRouter(TimerList);