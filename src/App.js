import React, { useState } from "react";
import "./App.css";

import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect,
    NavLink,
    useHistory,
} from "react-router-dom";

import {
    DatePicker,
    Typography,
    Divider,
    Layout,
    Space,
    Card,
    Menu,
    Breadcrumb,
    Row,
    Col,
    List,
    Avatar,
} from "antd";
import "antd/dist/antd.css";

import { CountDown } from "./components/CountDown";
import NavBar from "./components/NavBar/NavBar";

function App(props) {
    const { Header, Sider, Content, Footer } = Layout;

    const data = [
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
                style={{ overflow: "auto", height: "100%" }}
                // bordered
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

    let history = useHistory();
    const redirectHome = () => {
        history.push("/");
    };

    return (
        <BrowserRouter>
            <div className="App">
                <Layout className="layout">
                    <NavBar />

                    <Content className={"content"} style={{ padding: "25px" }}>
                        <div className="container">
                            <Switch>
                                <Route path="/timers">
                                    {addTimer}
                                    {timerList}
                                </Route>
                                <Route path="/settings">Settings</Route>
                                <Route path="/about">About</Route>
                                <Route path="/">
                                    <CountDown />
                                </Route>
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            </div>
        </BrowserRouter>
    );
}

export default App;
