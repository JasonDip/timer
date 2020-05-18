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
        title: "test",
        duration: 1000,
        uuid: uuid(),
    },
];

export const defaultSoundSettings = {
    soundEnabled: true,
    soundClip: "ding",
    volume: 0.3,
    ringCount: 3,
};

export const defaultGeneralSettings = {
    showInTitle: SHOW_IN_TITLE.COUNTDOWN,
};