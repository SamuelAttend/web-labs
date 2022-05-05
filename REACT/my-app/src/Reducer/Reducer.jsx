import {
  UPDATE_ASTEROIDS_LIST,
  UPDATE_DESTROY,
  UPDATE_ONLY_DANGEROUS,
  UPDATE_UNITS,
} from "./ReducerConst";

export function reducer(state, action) {
  switch (action.type) {
    case UPDATE_ASTEROIDS_LIST:
      return {
        ...state,
        asteroidsList: action.payload,
      };

    case UPDATE_UNITS:
      return { ...state, units: action.payload };

    case UPDATE_ONLY_DANGEROUS:
      return { ...state, onlyDangerous: action.payload };

    case UPDATE_DESTROY:
      return { ...state, destroyList: [...state.destroyList, action.payload] };

    default:
      throw new Error();
  }
}
