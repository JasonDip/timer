import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styles from "./CountDown.module.css";
import moment from "moment";

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
        message.config({ top: 150, duration: 1.5 });
        message.info("Timer Stopped");
        props.setClockState(CLOCK_STATE.STOPPED);
        props.setActiveTimer(null);
        setShowModal(false);
    }

    function playHandler() {
        props.setClockState(CLOCK_STATE.RUNNING);
    }

    function pauseHandler() {
        props.setClockState(CLOCK_STATE.PAUSED);
    }

    function restartHandler() {
        props.setActiveTimer(props.selectedTimer);
        props.setClockState(CLOCK_STATE.PAUSED);
    }

    function formatMilliseconds() {}

    function getEndTime() {
        let time = moment();

        return time.format("MMM DD, YYYY - hh:mm:ss A");
    }

    /*  determine what buttons are displayed based on the clock's state  */
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

    /*  timer countdown logic  */
    const { clockState, intervalId, setActiveTimer, setIntervalId } = props;
    useEffect(() => {
        if (clockState === CLOCK_STATE.RUNNING && !intervalId) {
            console.log("creating interval");
            let interval = setInterval(() => {
                console.log("running interval");
                setActiveTimer((state) => ({
                    ...state,
                    duration: state.duration - 1000,
                }));
            }, 1000);
            setIntervalId(interval);
        } else if (clockState !== CLOCK_STATE.RUNNING && intervalId) {
            console.log("cancel interval");
            if (intervalId) {
                clearTimeout(intervalId);
                setIntervalId(null);
            }
        }
    }, [clockState, intervalId, setActiveTimer, setIntervalId]);

    return (
        <div className={styles.container}>
            {props.activeTimer ? (
                <React.Fragment>
                    <h1>{props.activeTimer.title}</h1>
                    <h2>{props.activeTimer.duration}</h2>

                    {/* TODO need to set alarm end */}
                    <h3>Time is up at {getEndTime()}</h3>
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
