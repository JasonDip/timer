import React from "react";
import "./App.css";

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

import { MyComp } from "./components/mycomp";

function App() {
    const { Header, Sider, Content, Footer } = Layout;

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
        {
            title: "Test Title",
        },
    ];

    return (
        <div className="App">
            <Layout className="layout">
                <Header>
                    <img
                        className="logo"
                        src="hourglass.png"
                        alt="hourglass logo"
                    />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={["1"]}
                    >
                        <Menu.Item className="unselectable" key="1">
                            Home
                        </Menu.Item>
                        <Menu.Item className="unselectable" key="2">
                            Alarms
                        </Menu.Item>
                        <Menu.Item className="unselectable" key="3">
                            Settings
                        </Menu.Item>
                        <Menu.Item className="unselectable" key="4">
                            About
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content className={"content"} style={{ padding: "25px" }}>
                    <List
                        style={{
                            overflowY: "scroll",
                            maxHeight: "100%",
                        }}
                        bordered
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src="https://img.favpng.com/17/16/9/alarm-clock-scalable-vector-graphics-icon-png-favpng-HGxKY3v7u1vtVJ3cS2HVb0yBc.jpg" />
                                    }
                                    title={
                                        <a href="https://google.com">
                                            {item.title}
                                        </a>
                                    }
                                    description="test description"
                                />
                            </List.Item>
                        )}
                    />
                </Content>
                <Footer style={{ textAlign: "center" }}>Jason Dip</Footer>
            </Layout>
        </div>
    );
}

export default App;
