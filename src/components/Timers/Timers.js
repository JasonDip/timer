import React from "react";
import TimerAdder from "./TimerAdder/TimerAdder";
import TimerList from "./TimerList/TimerList";
import styles from "./Timers.module.css";

const Timers = (props) => {
    return (
        <div className={styles.timerContainer}>
            <TimerAdder setTimerList={props.setTimerList} />
            <TimerList
                timerList={props.timerList}
                setTimerList={props.setTimerList}
                setSelectedTimer={props.setSelectedTimer}
                setActiveTimer={props.setActiveTimer}
                setClockState={props.setClockState}
                setTimerEndTime={props.setTimerEndTime}
                intervalId={props.intervalId}
                setIntervalId={props.setIntervalId}
                setTimerHistory={props.setTimerHistory}
            />
        </div>
    );
};

export default Timers;
