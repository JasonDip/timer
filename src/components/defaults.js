import { v4 as uuid } from "uuid";
import { SHOW_IN_TITLE } from "./constants";

export const defaultTimerList = [
    {
        title: "Working",
        duration: 1500000,
        uuid: uuid(),
    },
    {
        title: "Short Break",
        duration: 300000,
        uuid: uuid(),
    },
    {
        title: "Long Break",
        duration: 1200000,
        uuid: uuid(),
    },
];

export const defaultTimerHistoryItem = {
    title: "",
    duration: 0,
    time: "",
    state: "",
};

export const defaultGeneralSettings = {
    showInTitle: SHOW_IN_TITLE.COUNTDOWN,
};

export const defaultSoundSettings = {
    soundEnabled: true,
    soundClip: "ding",
    volume: 0.3,
    ringCount: 3,
    timeBetweenRings: 100,
};
