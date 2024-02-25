import { ActionTypes } from './actionTypes';
import { GlobalState, GlobalStateAction, TimeZoneType } from "../types";

export const initialState: GlobalState = {
    selectedTimeZones: [],
    selectedDate: new Date().toUTCString(),
    baseTime: new Date().toUTCString(),
    theme: 'light',
};

export const globalStateReducer = (state: GlobalState, action: GlobalStateAction) => {
    switch (action.type) {
        case ActionTypes.ADD_TIME_ZONE:
            return {
                ...state,
                selectedTimeZones: [...state.selectedTimeZones, action.payload as TimeZoneType],
            };
        case ActionTypes.DELETE_TIME_ZONE:
            return {
                ...state,
                selectedTimeZones: state.selectedTimeZones.filter(tz => tz.id !== (action.payload as TimeZoneType)?.id),
            };
        case ActionTypes.CHANGE_DATE:
            return {
                ...state,
                selectedDate: action.payload as string,
            };
        case ActionTypes.CHANGE_THEME:
            return {
                ...state,
                theme: (state.theme === "light" ? "dark" : "light") as "light" | "dark",
            };
        case ActionTypes.REVERSE_TIME_ZONES:
            return {
                ...state,
                selectedTimeZones: [...state.selectedTimeZones].reverse(),
            };
        case ActionTypes.CHANGE_TIME:
            return {
                ...state,
                baseTime: action.payload as string,
            };
        case ActionTypes.CHANGE_ORDER: {
            return {
                ...state,
                selectedTimeZones: action.payload as TimeZoneType[],
            };
        }
        default:
            return state;
    }
};
