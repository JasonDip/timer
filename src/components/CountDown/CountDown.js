import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { Howl, Howler } from "howler";
import { Button, message, Modal, Result } from "antd";
import { DoubleRightOutlined, LikeOutlined } from "@ant-design/icons";

import MediaButton from "../MediaButton/MediaButton";
import { CLOCK_STATE, BUTTON_TYPE } from "../constants";
import { getEndTime, formatMilliseconds } from "../util";
import styles from "./CountDown.module.css";

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
        document.title = "Timer";
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
    const {
        clockState,
        intervalId,
        setActiveTimer,
        setIntervalId,
        history,
        generalSettings,
    } = props;
    useEffect(() => {
        if (clockState === CLOCK_STATE.RUNNING && !intervalId) {
            let interval = setInterval(() => {
                setActiveTimer((state) => {
                    // switch back to main page if time is up
                    if (state.duration <= 0) {
                        history.push("/");
                    }

                    return {
                        ...state,
                        duration: state.duration - 1000,
                    };
                });
            }, 1000);
            setIntervalId(interval);
        } else if (clockState !== CLOCK_STATE.RUNNING && intervalId) {
            if (intervalId) {
                clearTimeout(intervalId);
                setIntervalId(null);
            }
        }
    }, [
        clockState,
        intervalId,
        setActiveTimer,
        setIntervalId,
        history,
        generalSettings,
    ]);

    /*  timer finished logic  */
    const { activeTimer, setClockState } = props;
    const {
        soundSettings,
        setAlarmRingCount,
        setPlayAlarm,
        playAlarm,
        setAlarmIntervalId,
        alarmIntervalId,
    } = props;
    useEffect(() => {
        if (activeTimer && activeTimer.duration <= 0) {
            setClockState(CLOCK_STATE.FINISHED);
            clearTimeout(intervalId);
            setIntervalId(null);
            setActiveTimer(null);
            setPlayAlarm(true);
            setAlarmRingCount(soundSettings.ringCount);
        }
    }, [
        activeTimer,
        setClockState,
        intervalId,
        setIntervalId,
        setActiveTimer,
        soundSettings,
        setAlarmRingCount,
        setPlayAlarm,
    ]);

    /*  play sound  */
    useEffect(() => {
        if (!soundSettings) return;
        if (!soundSettings.soundEnabled) return;

        if (playAlarm && !alarmIntervalId) {
            // setup the new Howl
            const sound = new Howl({
                src: [`/alarmsounds/${soundSettings.soundClip}.mp3`],
            });
            // change global volume
            Howler.volume(soundSettings.volume);
            // play the sound
            let intervalId = setInterval(() => {
                if (playAlarm) {
                    sound.play();
                    setAlarmRingCount((count) => {
                        return count - 1;
                    });
                }
            }, soundSettings.timeBetweenRings);
            setAlarmIntervalId(intervalId);
        }
    }, [
        playAlarm,
        alarmIntervalId,
        soundSettings,
        setAlarmIntervalId,
        setAlarmRingCount,
    ]);

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
