import React, { useState } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Layout, List, Avatar } from "antd";
import "antd/dist/antd.css";
import "./App.css";

import CountDown, { CLOCK_STATE } from "./components/CountDown/CountDown";
import NavBar from "./components/NavBar/NavBar";
import TimerAdder from "./components/TimerAdder/TimerAdder";
import TimerList from "./components/TimerList/TimerList";
import Settings from "./components/Settings/Settings";
import About from "./components/About/About";

function App(props) {
    const [selectedTimer, setSelectedTimer] = useState(null);
    //const [clockState, setClockState] = useState(CLOCK_STATE.STOPPED);
    const [clockState, setClockState] = useState(CLOCK_STATE.PAUSED);

    const { Content } = Layout;

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
                                        />
                                    </Route>

                                    <Route path="/timers">
                                        <TimerAdder />
                                        <TimerList />
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
