import React, { useState, useEffect } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Layout } from "antd";
import "antd/dist/antd.css";
import "./App.css";

import CountDown, { CLOCK_STATE } from "./components/CountDown/CountDown";
import NavBar from "./components/NavBar/NavBar";
import TimerAdder from "./components/TimerAdder/TimerAdder";
import TimerList from "./components/TimerList/TimerList";
import Settings from "./components/Settings/Settings";
import About from "./components/About/About";

function App(props) {
    const [timerList, setTimerList] = useState(null);
    const [selectedTimer, setSelectedTimer] = useState(null);
    const [activeTimer, setActiveTimer] = useState(null);
    const [clockState, setClockState] = useState(CLOCK_STATE.STOPPED);
    const [intervalId, setIntervalId] = useState(null);

    const { Content } = Layout;

    // TODO: if timerList is null, check if localStorage has saved data

    // TODO: if localStorage doesnt have saved timers, then set defaults and save to localStorage
    useEffect(() => {
        if (true) {
            // TODO - fix if condition
            setTimerList([
                {
                    title: "Working",
                    duration: 1500000,
                },
                {
                    title: "Short Break",
                    duration: 300000,
                },
            ]);
        }
    }, []);

    return (
        <BrowserRouter>
            <div className="App">
                <Layout className="layout">
                    <NavBar />
                    <div className="main">
                        <Content className={"content"}>
                            <div className="container">
                                <Switch>
                                    <Route exact path="/">
                                        <CountDown
                                            clockState={clockState}
                                            setClockState={setClockState}
                                            selectedTimer={selectedTimer}
                                            setSelectedTimer={setSelectedTimer}
                                            activeTimer={activeTimer}
                                            setActiveTimer={setActiveTimer}
                                            intervalId={intervalId}
                                            setIntervalId={setIntervalId}
                                        />
                                    </Route>

                                    <Route path="/timers">
                                        <TimerAdder
                                            setTimerList={setTimerList}
                                        />
                                        <TimerList
                                            timerList={timerList}
                                            setTimerList={setTimerList}
                                            setSelectedTimer={setSelectedTimer}
                                            setActiveTimer={setActiveTimer}
                                            setClockState={setClockState}
                                        />
                                    </Route>

                                    <Route path="/settings">
                                        <Settings />
                                    </Route>

                                    <Route path="/about">
                                        <About />
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
