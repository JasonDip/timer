import React from "react";
import { Tooltip } from "antd";
import {
    CloseCircleFilled,
    PlayCircleFilled,
    PauseCircleFilled,
    QuestionCircleFilled,
    LeftCircleFilled,
} from "@ant-design/icons";
import styles from "./MediaButton.module.css";
import { BUTTON_TYPE } from "../constants";

const MediaButton = (props) => {
    const getIcon = (buttonType) => {
        switch (buttonType) {
            case BUTTON_TYPE.PLAY:
                return <PlayCircleFilled onClick={props.onClickHandler} />;
            case BUTTON_TYPE.PAUSE:
                return <PauseCircleFilled onClick={props.onClickHandler} />;
            case BUTTON_TYPE.RESET:
                return <LeftCircleFilled onClick={props.onClickHandler} />;
            case BUTTON_TYPE.STOP:
                return <CloseCircleFilled onClick={props.onClickHandler} />;
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
