import React from "react";
import { Button, Tooltip } from "antd";
import { Popconfirm, message, Modal } from "antd";
import {
    CloseCircleFilled,
    PlayCircleFilled,
    PauseCircleFilled,
    QuestionCircleFilled,
    LeftCircleFilled,
} from "@ant-design/icons";
import styles from "./MediaButton.module.css";

export const BUTTON_TYPE = {
    PAUSE: "Pause",
    PLAY: "Play",
    STOP: "Stop",
    RESTART: "Restart",
};

const MediaButton = (props) => {
    const getIcon = (buttonType) => {
        switch (buttonType) {
            case BUTTON_TYPE.PLAY:
                return <PlayCircleFilled onClick={props.onClickHandler} />;
            case BUTTON_TYPE.PAUSE:
                return <PauseCircleFilled onClick={props.onClickHandler} />;
            case BUTTON_TYPE.RESTART:
                return <LeftCircleFilled onClick={props.onClickHandler} />;
            case BUTTON_TYPE.STOP:
                return (
                    // <Popconfirm
                    //     title="Stop the timer?"
                    //     onConfirm={props.onClickHandler}
                    //     okText="Yes"
                    //     cancelText="No"
                    // >
                    //     <CloseCircleFilled />
                    // </Popconfirm>
                    <CloseCircleFilled onClick={props.onClickHandler} />
                );
            default:
                return <QuestionCircleFilled />;
        }
    };

    let icon = getIcon(props.buttonType);

    return (
        <Tooltip
            placement="bottom"
            title={props.buttonType}
            className={styles.MediaButton}
        >
            {icon}
        </Tooltip>
    );
};

export default MediaButton;
