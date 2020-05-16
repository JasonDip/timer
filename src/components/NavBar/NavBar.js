import React from "react";
import styles from "./NavBar.module.css";

import { Layout, Menu } from "antd";
import { NavLink, withRouter } from "react-router-dom";

const { Header } = Layout;

const NavBar = (props) => {
    return (
        <Header className={styles.mainheader}>
            <NavLink to="/">
                <img
                    className={styles.logo}
                    src="hourglass.png"
                    alt="hourglass logo"
                />
            </NavLink>

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
