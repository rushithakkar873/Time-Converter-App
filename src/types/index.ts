import { ActionTypes } from "../context/actionTypes";

export type GlobalState = {
    selectedTimeZones: TimeZoneType[];
    selectedDate: string;
    baseTime: string;
    theme: 'light' | 'dark';
}

export type GlobalStateAction = {
    type: ActionTypes;
    payload?: TimeZoneType | TimeZoneType[] | string | 'light' | 'dark'; 
}

export type TimeZoneType = {
    id: string;
    name: string;
    abbreviation: string;
    offset: string;
};

export type TimeDisplayProps = {
    timeZone: TimeZoneType;
};

export type TimeSliderProps = {
    rangeValue: number;
    handleRangeValueChange: (value: number) => void;
};