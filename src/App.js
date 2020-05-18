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

    // TODO: if generalSettings is null, check if localStorage has saved data
    if (!generalSettings) {
    }

    // TODO: if no saved generalSettings, set defaultGeneralSettings and save to localStorage
    useEffect(() => {
        if (true) {
            setGeneralSettings(defaultGeneralSettings);
        }
    }, []);

    // TODO: if soundSettings is null, check if localStorage has saved data
    if (!soundSettings) {
    }

    // TODO: if no saved sound settings, set default sound settings and save to localStorage
    useEffect(() => {
        if (true) {
            setSoundSettings(defaultSoundSettings);
        }
    }, []);

    // TODO: if timerList is null, check if localStorage has saved data
    if (!timerList) {
    }

    // TODO: if localStorage doesnt have saved timers, then set defaults and save to localStorage
    useEffect(() => {
        if (true) {
            // TODO - fix if condition
            setTimerList(defaultTimerList);
        }
    }, []);

    // TODO: add useeffect for saving timerlist to localstorage when changed

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
