import React, { useEffect } from "react";
import styles from "./Stopwatch.module.css";
import { BUTTON_TYPE, STOPWATCH_STATE } from "../constants";
import MediaButton from "../MediaButton/MediaButton";
import { formatMilliseconds } from "../util";

const Stopwatch = (props) => {
    const resetHandler = () => {
        props.setStopwatchState(STOPWATCH_STATE.PAUSED);
        props.setStopwatchTime(0);
    };

    const playHandler = () => {
        props.setStopwatchState(STOPWATCH_STATE.RUNNING);
    };

    const pauseHandler = () => {
        props.setStopwatchState(STOPWATCH_STATE.PAUSED);
    };

    /*  stopwatch logic  */
    const {
        stopwatchState,
        setStopwatchTime,
        setStopwatchInterval,
        stopwatchInterval,
    } = props;
    useEffect(() => {
        if (stopwatchState === STOPWATCH_STATE.RUNNING && !stopwatchInterval) {
            let interval = setInterval(() => {
                setStopwatchTime((time) => {
                    return time + 1000;
                });
            }, 1000);
            setStopwatchInterval(interval);
        } else if (
            stopwatchState === STOPWATCH_STATE.PAUSED &&
            stopwatchInterval
        ) {
            clearInterval(stopwatchInterval);
            setStopwatchInterval(null);
        }
    }, [
        stopwatchState,
        setStopwatchTime,
        stopwatchInterval,
        setStopwatchInterval,
    ]);

    let buttons;
    switch (props.stopwatchState) {
        case STOPWATCH_STATE.RUNNING:
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
                </div>
            );
            break;
        case STOPWATCH_STATE.PAUSED:
        default:
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
                </div>
            );
            break;
    }

    return (
        <div className={styles.container}>
            <h1>{props.stopwatchState}</h1>
            <h2>{formatMilliseconds(props.stopwatchTime)}</h2>
            {buttons}
        </div>
    );
};

export default Stopwatch;
