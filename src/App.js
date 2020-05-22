import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./App.css";

import NavBar from "./components/NavBar/NavBar";
import CountDown from "./components/CountDown/CountDown";
import Timers from "./components/Timers/Timers";
import History from "./components/History/History";
import Stopwatch from "./components/Stopwatch/Stopwatch";
import Settings from "./components/Settings/Settings";
import About from "./components/About/About";
import {
    defaultTimerList,
    defaultSoundSettings,
    defaultGeneralSettings,
} from "./components/defaults";
import {
    CLOCK_STATE,
    STOPWATCH_STATE,
    SHOW_IN_TITLE,
} from "./components/constants";
import { formatMilliseconds } from "./components/util";

function App(props) {
    /*  state for countdown timer  */
    const [timerList, setTimerList] = useState(null);
    const [selectedTimer, setSelectedTimer] = useState(null);
    const [activeTimer, setActiveTimer] = useState(null);
    const [timerEndTime, setTimerEndTime] = useState(null);
    const [clockState, setClockState] = useState(CLOCK_STATE.STOPPED);
    const [intervalId, setIntervalId] = useState(null); // intervalId for the countdown

    /*  state for playing alarm sound  */
    const [playAlarm, setPlayAlarm] = useState(false);
    const [alarmIntervalId, setAlarmIntervalId] = useState(null); // intervalId for the alarm sound repeating
    const [alarmRingCount, setAlarmRingCount] = useState(null);

    /*  state for timer history  */
    const [timerHistory, setTimerHistory] = useState([]);

    /*  state for stopwatch  */
    const [stopwatchState, setStopwatchState] = useState(
        STOPWATCH_STATE.PAUSED
    );
    const [stopwatchTime, setStopwatchTime] = useState(0);
    const [stopwatchInterval, setStopwatchInterval] = useState(null);

    /*  state for settings  */
    const [generalSettings, setGeneralSettings] = useState(null);
    const [soundSettings, setSoundSettings] = useState(null);

    const { Content } = Layout;

    /*  get saved data from localStorage  */
    useEffect(() => {
        // get generalSettings from localStorage or default
        let genSet = localStorage.getItem("generalSettings");
        if (genSet) {
            setGeneralSettings(JSON.parse(genSet));
        } else {
            setGeneralSettings(defaultGeneralSettings);
            localStorage.setItem(
                "generalSettings",
                JSON.stringify(defaultGeneralSettings)
            );
        }
        // get soundSettings from localStorage or default
        let soundSet = localStorage.getItem("soundSettings");
        if (soundSet) {
            setSoundSettings(JSON.parse(soundSet));
        } else {
            setSoundSettings(defaultSoundSettings);
            localStorage.setItem(
                "soundSettings",
                JSON.stringify(defaultSoundSettings)
            );
        }
        // get timerList from localStorage or default
        let timersLocal = localStorage.getItem("timerList");
        if (timersLocal) {
            setTimerList(JSON.parse(timersLocal));
        } else {
            setTimerList(defaultTimerList);
            localStorage.setItem("timerList", JSON.stringify(defaultTimerList));
        }
    }, []);

    /*  save changes to generalSettings  */
    useEffect(() => {
        localStorage.setItem(
            "generalSettings",
            JSON.stringify(generalSettings)
        );
    }, [generalSettings]);

    /*  save changes to soundSettings  */
    useEffect(() => {
        localStorage.setItem("soundSettings", JSON.stringify(soundSettings));
    }, [soundSettings]);

    /*  save changes to timerList  */
    useEffect(() => {
        localStorage.setItem("timerList", JSON.stringify(timerList));
    }, [timerList]);

    /*  stop alarm sound after the amount specified in options  */
    useEffect(() => {
        if (alarmRingCount <= 0) {
            clearInterval(alarmIntervalId);
            setAlarmIntervalId(null);
            setPlayAlarm(false);
        }
    }, [alarmRingCount, alarmIntervalId]);

    /*  show countdown or stopwatch in title  */
    useEffect(() => {
        // show countdown in title
        if (
            generalSettings &&
            generalSettings.showInTitle === SHOW_IN_TITLE.COUNTDOWN &&
            (clockState === CLOCK_STATE.RUNNING ||
                clockState === CLOCK_STATE.FINISHED)
        ) {
            if (activeTimer) {
                document.title = formatMilliseconds(activeTimer.duration);
            } else {
                document.title = "!! Time Up !!";
            }
        }
        // show stopwatch in title
        else if (
            generalSettings &&
            generalSettings.showInTitle === SHOW_IN_TITLE.STOPWATCH &&
            stopwatchState === STOPWATCH_STATE.RUNNING
        ) {
            document.title = formatMilliseconds(stopwatchTime);
        }
        // show normal title
        else {
            document.title = "Timer";
        }
    }, [
        generalSettings,
        activeTimer,
        clockState,
        stopwatchState,
        stopwatchTime,
    ]);

    return (
        <BrowserRouter>
            <div className="App">
                <Layout className="layout">
                    <NavBar />
                    <div className="main">
                        <Content className={"content"}>
                            <div className="container">
                                <Switch>
                                    <Route path="/timers">
                                        <Timers
                                            timerList={timerList}
                                            setTimerList={setTimerList}
                                            setSelectedTimer={setSelectedTimer}
                                            setActiveTimer={setActiveTimer}
                                            setClockState={setClockState}
                                            setTimerEndTime={setTimerEndTime}
                                            intervalId={intervalId}
                                            setIntervalId={setIntervalId}
                                            setTimerHistory={setTimerHistory}
                                        />
                                    </Route>

                                    <Route path="/history">
                                        <History
                                            timerHistory={timerHistory}
                                            setTimerHistory={setTimerHistory}
                                            clockState={clockState}
                                            activeTimer={activeTimer}
                                        />
                                    </Route>

                                    <Route path="/stopwatch">
                                        <Stopwatch
                                            stopwatchState={stopwatchState}
                                            setStopwatchState={
                                                setStopwatchState
                                            }
                                            stopwatchTime={stopwatchTime}
                                            setStopwatchTime={setStopwatchTime}
                                            stopwatchInterval={
                                                stopwatchInterval
                                            }
                                            setStopwatchInterval={
                                                setStopwatchInterval
                                            }
                                            generalSettings={generalSettings}
                                        />
                                    </Route>

                                    <Route path="/settings">
                                        <Settings
                                            generalSettings={generalSettings}
                                            setGeneralSettings={
                                                setGeneralSettings
                                            }
                                            soundSettings={soundSettings}
                                            setSoundSettings={setSoundSettings}
                                            setTimerList={setTimerList}
                                            setTimerHistory={setTimerHistory}
                                            setClockState={setClockState}
                                            setSelectedTimer={setSelectedTimer}
                                            setActiveTimer={setActiveTimer}
                                        />
                                    </Route>

                                    <Route path="/about">
                                        <About />
                                    </Route>

                                    <Route path="/">
                                        <CountDown
                                            clockState={clockState}
                                            setClockState={setClockState}
                                            selectedTimer={selectedTimer}
                                            setSelectedTimer={setSelectedTimer}
                                            activeTimer={activeTimer}
                                            setActiveTimer={setActiveTimer}
                                            intervalId={intervalId}
                                            setIntervalId={setIntervalId}
                                            timerEndTime={timerEndTime}
                                            setTimerEndTime={setTimerEndTime}
                                            generalSettings={generalSettings}
                                            soundSettings={soundSettings}
                                            playAlarm={playAlarm}
                                            setPlayAlarm={setPlayAlarm}
                                            alarmIntervalId={alarmIntervalId}
                                            setAlarmIntervalId={
                                                setAlarmIntervalId
                                            }
                                            alarmRingCount={alarmRingCount}
                                            setAlarmRingCount={
                                                setAlarmRingCount
                                            }
                                            setTimerHistory={setTimerHistory}
                                        />
                                    </Route>
                                </Switch>
                            </div>
                        </Content>
                    </div>
                </Layout>
            </div>
        </BrowserRouter>
    );
}

export default App;
