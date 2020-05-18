import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styles from "./CountDown.module.css";
import moment from "moment";
import { getEndTime } from "../util";

import MediaButton, { BUTTON_TYPE } from "./MediaButton/MediaButton";
import { Button, message, Modal, Result } from "antd";
import { DoubleRightOutlined, LikeOutlined } from "@ant-design/icons";

export const CLOCK_STATE = {
    RUNNING: "Running",
    PAUSED: "Paused",
    STOPPED: "Stopped",
    FINISHED: "Finished",
};

const CountDown = (props) => {
    const [showStopModal, setShowStopModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);

    function stopHandler() {
        setShowStopModal(true);
    }

    function confirmStopHandler() {
        message.config({ top: 150, duration: 1.5 });
        message.info("Timer Stopped");
        props.setClockState(CLOCK_STATE.STOPPED);
        props.setActiveTimer(null);
        setShowStopModal(false);
    }

    function playHandler() {
        props.setClockState(CLOCK_STATE.RUNNING);
        props.setTimerEndTime(getEndTime(moment(), props.activeTimer.duration));
    }

    function pauseHandler() {
        props.setClockState(CLOCK_STATE.PAUSED);
    }

    function resetHandler() {
        setShowResetModal(true);
    }

    function confirmResetHandler() {
        props.setActiveTimer(props.selectedTimer);
        props.setClockState(CLOCK_STATE.PAUSED);
        message.config({ top: 150, duration: 1.5 });
        message.info("Timer Reset");
        setShowResetModal(false);
    }

    function formatMilliseconds(milliseconds) {
        let hours = Math.floor(milliseconds / (1000 * 60 * 60));
        let minutes = Math.floor(milliseconds / (1000 * 60)) - hours * 60;
        let seconds = milliseconds / 1000 - hours * 60 * 60 - minutes * 60;

        let time = "";
        if (hours > 0) {
            time = time.concat(hours.toString().padStart(2, "0"), ":");
        }
        time = time.concat(
            minutes.toString().padStart(2, "0"),
            ":",
            seconds.toString().padStart(2, "0")
        );

        return time;
    }

    /*  determine what buttons are displayed based on the clock's state  */
    let buttons;
    switch (props.clockState) {
        case CLOCK_STATE.RUNNING:
            buttons = (
                <div className={styles.mediaBox}>
                    <MediaButton
                        buttonType={BUTTON_TYPE.RESET}
                        onClickHandler={resetHandler}
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
                        buttonType={BUTTON_TYPE.RESET}
                        onClickHandler={resetHandler}
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
        case CLOCK_STATE.FINISHED:
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

    /*  timer finished logic  */
    const { activeTimer, setClockState } = props;
    useEffect(() => {
        if (activeTimer && activeTimer.duration <= 0) {
            setClockState(CLOCK_STATE.FINISHED);
            clearTimeout(intervalId);
            setIntervalId(null);
            setActiveTimer(null);
        }
    }, [activeTimer, setClockState, intervalId, setIntervalId, setActiveTimer]);

    return (
        <div className={styles.container}>
            {props.activeTimer ? (
                <React.Fragment>
                    <h1>{props.activeTimer.title}</h1>
                    <h2>{formatMilliseconds(props.activeTimer.duration)}</h2>
                    {props.clockState === CLOCK_STATE.RUNNING ? (
                        <h3>Ends at {props.timerEndTime}</h3>
                    ) : null}
                </React.Fragment>
            ) : null}
            {props.clockState === CLOCK_STATE.FINISHED ? (
                <Result
                    icon={<LikeOutlined />}
                    title={`${props.selectedTimer.title} ended at ${props.timerEndTime}!`}
                />
            ) : null}
            {buttons}
            <Modal
                centered
                title="Stop Timer"
                visible={showStopModal}
                okText="Yes"
                onOk={confirmStopHandler}
                onCancel={() => setShowStopModal(false)}
            >
                Are you sure you want to stop the timer?
            </Modal>
            <Modal
                centered
                title="Reset Timer"
                visible={showResetModal}
                okText="Yes"
                onOk={confirmResetHandler}
                onCancel={() => setShowResetModal(false)}
            >
                Are you sure you want to reset the timer?
            </Modal>
        </div>
    );
};

export default withRouter(CountDown);
