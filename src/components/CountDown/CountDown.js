import React from "react";
import styles from "./CountDown.module.css";

import MediaButton, { BUTTON_TYPE } from "./MediaButton/MediaButton";
import { Button, message } from "antd";

export const CLOCK_STATE = {
    RUNNING: "Running",
    PAUSED: "Paused",
    STOPPED: "Stopped",
};

const CountDown = (props) => {
    function stopHandler() {
        message.config({ top: 150 });
        message.info("Timer Stopped");
        props.setClockState(CLOCK_STATE.STOPPED);
    }

    function playHandler() {
        console.log("play pressed");
        props.setClockState(CLOCK_STATE.RUNNING);
    }

    function pauseHandler() {
        console.log("pause pressed");
        props.setClockState(CLOCK_STATE.PAUSED);
    }

    function restartHandler() {
        console.log("restart pressed");
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
            // TODO: set handler to go to timer page
            buttons = <Button type="primary">Select a Timer</Button>;
            break;
        default:
            break;
    }

    return (
        <div className={styles.container}>
            <h1>Title</h1>
            <h2>00:00:00</h2>

            <h4>Time is up at 00:00:00 am</h4>
            {buttons}

            {/* TODO: For test only, remove later */}
            <div className={styles.mediaBox}>
                test buttons
                <MediaButton
                    buttonType={BUTTON_TYPE.RESTART}
                    onClickHandler={restartHandler}
                />
                <MediaButton
                    buttonType={BUTTON_TYPE.STOP}
                    onClickHandler={stopHandler}
                />
                <MediaButton
                    buttonType={BUTTON_TYPE.PLAY}
                    onClickHandler={playHandler}
                />
                <MediaButton
                    buttonType={BUTTON_TYPE.PAUSE}
                    onClickHandler={pauseHandler}
                />
            </div>
        </div>
    );
};

export default CountDown;
