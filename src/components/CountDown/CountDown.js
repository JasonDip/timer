import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import styles from "./CountDown.module.css";

import MediaButton, { BUTTON_TYPE } from "./MediaButton/MediaButton";
import { Button, message, Modal } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";

export const CLOCK_STATE = {
    RUNNING: "Running",
    PAUSED: "Paused",
    STOPPED: "Stopped",
};

const CountDown = (props) => {
    const [showModal, setShowModal] = useState(false);

    function stopHandler() {
        setShowModal(true);
    }

    function confirmStopHandler() {
        message.config({ top: 150 });
        message.info("Timer Stopped");
        props.setClockState(CLOCK_STATE.STOPPED);
        setShowModal(false);
    }

    function playHandler() {
        props.setClockState(CLOCK_STATE.RUNNING);
    }

    function pauseHandler() {
        props.setClockState(CLOCK_STATE.PAUSED);
    }

    function restartHandler() {
        props.setClockState(CLOCK_STATE.RUNNING);
    }

    let buttons;
    switch (props.clockState) {
        case CLOCK_STATE.RUNNING:
            buttons = (
                <div className={styles.mediaBox}>
                    <MediaButton
                        buttonType={BUTTON_TYPE.RESTART}
                        onClickHandler={restartHandler}
                    />
                    <MediaButton
                        buttonType={BUTTON_TYPE.PAUSE}
                        onClickHandler={pauseHandler}
                    />
                    <MediaButton
                        buttonType={BUTTON_TYPE.STOP}
                        onClickHandler={stopHandler}
                    />
                </div>
            );
            break;
        case CLOCK_STATE.PAUSED:
            buttons = (
                <div className={styles.mediaBox}>
                    <MediaButton
                        buttonType={BUTTON_TYPE.RESTART}
                        onClickHandler={restartHandler}
                    />
                    <MediaButton
                        buttonType={BUTTON_TYPE.PLAY}
                        onClickHandler={playHandler}
                    />
                    <MediaButton
                        buttonType={BUTTON_TYPE.STOP}
                        onClickHandler={stopHandler}
                    />
                </div>
            );
            break;
        case CLOCK_STATE.STOPPED:
            buttons = (
                <Button
                    type="primary"
                    onClick={() => props.history.push("/timers")}
                    icon={<DoubleRightOutlined />}
                >
                    Select a Timer
                </Button>
            );
            break;
        default:
            break;
    }

    return (
        <div className={styles.container}>
            {props.selectedTimer ? (
                <React.Fragment>
                    {/* TODO: need to output the current timer */}
                    <h1>Title</h1>
                    <h2>00:00:00</h2>

                    <h3>Time is up at 00:00:00 am</h3>
                </React.Fragment>
            ) : null}
            {buttons}
            <Modal
                centered
                title="Stop Timer"
                visible={showModal}
                okText="Yes"
                onOk={confirmStopHandler}
                onCancel={() => setShowModal(false)}
            >
                Are you sure you want to stop the timer?
            </Modal>
        </div>
    );
};

export default withRouter(CountDown);
