import React, { useState } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Layout, List, Avatar } from "antd";
import "antd/dist/antd.css";
import "./App.css";

import CountDown, { CLOCK_STATE } from "./components/CountDown/CountDown";
import NavBar from "./components/NavBar/NavBar";

function App(props) {
    const [selectedTimer, setSelectedTimer] = useState(null);
    //const [clockState, setClockState] = useState(CLOCK_STATE.STOPPED);
    const [clockState, setClockState] = useState(CLOCK_STATE.PAUSED);

    const { Content } = Layout;

    const data = [
        {
            title: "Test Title",
        },
        {
            title: "Test Title",
        },
        {
            title: "Test Title",
        },
        {
            title: "Test Title",
        },
        {
            title: "Test Title",
        },
        {
            title: "Test Title",
        },
        {
            title: "Test Title",
        },
        {
            title: "Test Title",
        },
        {
            title: "Test Title",
        },
        {
            title: "Test Title",
        },
        {
            title: "Test Title",
        },
        {
            title: "Test Title",
        },
        {
            title: "Test Title",
        },
        {
            title: "Test Title",
        },
    ];

    const addTimer = <div className="item-left">Timers</div>;

    const timerList = (
        <div className="item-right">
            <List
                className="alarmList"
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <Avatar src="https://img.favpng.com/17/16/9/alarm-clock-scalable-vector-graphics-icon-png-favpng-HGxKY3v7u1vtVJ3cS2HVb0yBc.jpg" />
                            }
                            title={
                                <a href="https://google.com">{item.title}</a>
                            }
                            description="test description"
                        />
                    </List.Item>
                )}
            />
        </div>
    );

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
                                        {addTimer}
                                        {timerList}
                                    </Route>
                                    <Route path="/settings">Settings</Route>
                                    <Route path="/about">About</Route>
                                    <Route path="/">
                                        <CountDown
                                            clockState={clockState}
                                            setClockState={setClockState}
                                            selectedTimer={selectedTimer}
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
