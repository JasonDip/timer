import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./App.css";

import CountDown from "./components/CountDown/CountDown";
import NavBar from "./components/NavBar/NavBar";
import Settings from "./components/Settings/Settings";
import About from "./components/About/About";
import Timers from "./components/Timers/Timers";
import Stopwatch from "./components/Stopwatch/Stopwatch";
import {
    defaultTimerList,
    defaultSoundSettings,
    defaultGeneralSettings,
} from "./components/defaults";
import { CLOCK_STATE } from "./components/constants";

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
                                        />
                                    </Route>

                                    <Route path="/stopwatch">
                                        <Stopwatch />
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
