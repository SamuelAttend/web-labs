import { GlobalContent } from "../App";
import {
    SET_USER_DATA,
    UPDATE_ASTEROIDS_LIST,
    UPDATE_DESTROY,
    UPDATE_ONLY_DANGEROUS,
    UPDATE_UNITS,
} from "./ReducerConst";

export type ReducerAction = { type: string; payload: GlobalContent };

export function reducer(
    state: GlobalContent,
    action: ReducerAction
): GlobalContent {
    switch (action.type) {
        case UPDATE_ASTEROIDS_LIST:
            return {
                ...state,
                asteroidsList: action.payload.asteroidsList,
            };

        case UPDATE_UNITS:
            return { ...state, units: action.payload.units };

        case UPDATE_ONLY_DANGEROUS:
            return { ...state, onlyDangerous: action.payload.onlyDangerous };

        case UPDATE_DESTROY:
            return {
                ...state,
                destroyList: [
                    ...state.destroyList,
                    action.payload.destroyList[0],
                ],
            };
        case SET_USER_DATA:
            return {
                ...state,
                userData: action.payload.userData,
            };

        default:
            throw new Error();
    }
}
