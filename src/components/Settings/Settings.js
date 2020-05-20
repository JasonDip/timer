import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Howl, Howler } from "howler";
import { Modal } from "antd";
import { SoundOutlined } from "@ant-design/icons";

import styles from "./Settings.module.css";
import { SOUNDS, SHOW_IN_TITLE } from "../constants";
import {
    defaultGeneralSettings,
    defaultSoundSettings,
    defaultTimerList,
} from "../defaults";

import { Divider, Select, InputNumber, Switch, Slider, Button } from "antd";
const { Option } = Select;

const Settings = (props) => {
    const [showResetSettingsModal, setShowResetSettingsModal] = useState(false);

    const showInTitleChangeHandler = (value) => {
        props.setGeneralSettings((state) => ({
            ...state,
            showInTitle: value,
        }));
    };

    const soundEnabledChangeHandler = (checked) => {
        props.setSoundSettings((state) => ({
            ...state,
            soundEnabled: checked,
        }));
    };

    const soundClipChangedHandler = (value) => {
        props.setSoundSettings((state) => ({
            ...state,
            soundClip: value,
        }));
    };

    const volumeChangeHandler = (value) => {
        props.setSoundSettings((state) => ({
            ...state,
            volume: value / 100,
        }));
    };

    const ringCountChangeHandler = (value) => {
        props.setSoundSettings((state) => ({
            ...state,
            ringCount: value,
        }));
    };

    const testSoundClickHandler = () => {
        const sound = new Howl({
            src: [`/alarmsounds/${props.soundSettings.soundClip}.mp3`],
        });
        Howler.volume(props.soundSettings.volume);
        sound.play();
    };

    const resetToDefaultClickHandler = () => {
        setShowResetSettingsModal(true);
    };

    const confirmedSettingsReset = () => {
        setShowResetSettingsModal(false);
        props.setSoundSettings({ ...defaultSoundSettings });
        props.setGeneralSettings({ ...defaultGeneralSettings });
        props.setTimerList(JSON.parse(JSON.stringify(defaultTimerList)));
        document.title = "Timer";
        props.history.push("/");
    };

    const soundEnableVal = () => {
        if (!props.soundSettings) {
            return defaultSoundSettings.soundEnabled;
        }
        if (props.soundSettings.soundEnabled === null) {
            return defaultSoundSettings.soundEnabled;
        } else {
            return props.soundSettings.soundEnabled;
        }
    };

    return (
        <div className={styles.settingsContainer}>
            <h3>General Settings</h3>
            <label>Show Timer In Tab Title</label>
            <Select
                defaultValue={
                    (props.generalSettings &&
                        props.generalSettings.showInTitle) ||
                    defaultGeneralSettings.showInTitle
                }
                onChange={showInTitleChangeHandler}
            >
                {Object.values(SHOW_IN_TITLE).map((val) => (
                    <Option value={val}>{val}</Option>
                ))}
            </Select>
            <br />

            <Divider />
            <div style={{ display: "flex" }}>
                <h3 style={{ marginRight: "10px" }}>Sound Settings</h3>
                <Button
                    shape="circle"
                    icon={<SoundOutlined />}
                    onClick={testSoundClickHandler}
                ></Button>
            </div>

            <label>Sound Enabled</label>
            <Switch
                defaultChecked={soundEnableVal()}
                onChange={soundEnabledChangeHandler}
            />
            <br />

            <label>Sound Clip</label>
            <Select
                defaultValue={
                    (props.soundSettings && props.soundSettings.soundClip) ||
                    defaultSoundSettings.soundClip
                }
                disabled={
                    !(
                        props.soundSettings && props.soundSettings.soundEnabled
                    ) || !defaultSoundSettings.soundEnabled
                }
                onChange={soundClipChangedHandler}
            >
                {Object.values(SOUNDS).map((sound) => (
                    <Option value={sound}>{sound}</Option>
                ))}
            </Select>
            <br />

            <label>Volume</label>
            <Slider
                defaultValue={
                    (props.soundSettings && props.soundSettings.volume * 100) ||
                    defaultSoundSettings.volume * 100
                }
                disabled={
                    !(
                        props.soundSettings && props.soundSettings.soundEnabled
                    ) || !defaultSoundSettings.soundEnabled
                }
                onChange={volumeChangeHandler}
            />
            <br />

            <label>Alarm Ring Count</label>
            <InputNumber
                defaultValue={
                    (props.soundSettings && props.soundSettings.ringCount) ||
                    defaultSoundSettings.ringCount
                }
                disabled={
                    !(
                        props.soundSettings && props.soundSettings.soundEnabled
                    ) || !defaultSoundSettings.soundEnabled
                }
                onChange={ringCountChangeHandler}
            />
            <br />

            <Divider />
            {/* TODO show a modal before resetting */}
            <Button type="danger" onClick={resetToDefaultClickHandler}>
                Reset To Default
            </Button>
            <Modal
                centered
                title="Reset to Default"
                visible={showResetSettingsModal}
                okText="Yes"
                onOk={confirmedSettingsReset}
                onCancel={() => setShowResetSettingsModal(false)}
            >
                Are you sure you want to reset all settings and timers?
            </Modal>
        </div>
    );
};

export default withRouter(Settings);
