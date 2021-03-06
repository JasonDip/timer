import React from "react";
import { Layout, Menu } from "antd";
import { NavLink, withRouter } from "react-router-dom";
import styles from "./NavBar.module.css";

const { Header } = Layout;

const NavBar = (props) => {
    return (
        <Header className={styles.mainheader}>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["/"]}
                selectedKeys={[props.location.pathname]}
            >
                <Menu.Item className="unselectable" key="/">
                    <NavLink to="/">Countdown</NavLink>
                </Menu.Item>

                <Menu.Item className="unselectable" key="/timers">
                    <NavLink to="/timers">Timers</NavLink>
                </Menu.Item>

                <Menu.Item className="unselectable" key="/history">
                    <NavLink to="/history">History</NavLink>
                </Menu.Item>

                <Menu.Item className="unselectable" key="/stopwatch">
                    <NavLink to="/stopwatch">Stopwatch</NavLink>
                </Menu.Item>

                <Menu.Item className="unselectable" key="/settings">
                    <NavLink to="/settings">Settings</NavLink>
                </Menu.Item>

                <Menu.Item className="unselectable" key="/about">
                    <NavLink to="/about">About</NavLink>
                </Menu.Item>
            </Menu>
        </Header>
    );
};

export default withRouter(NavBar);
