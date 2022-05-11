import React, { useContext } from 'react';
import styles from './NavigationManager.module.css';
import { DISTANCE_KM, DISTANCE_LUNAR } from './NavigarionManagerConst';
import { AsteroidsRender } from '../AsteroidsRender/AsteroidsRender';
import { AsteroidContext } from '../App';
import { UPDATE_ONLY_DANGEROUS, UPDATE_UNITS } from '../Reducer/ReducerConst';

export function NavigationManager() {
    const { state, dispatch } = useContext(AsteroidContext);

    function setOnlyDangerous(event) {
        dispatch({
            payload: event.target.checked,
            type: UPDATE_ONLY_DANGEROUS,
        });
    }

    function setUnitsToKm() {
        dispatch({
            payload: DISTANCE_KM,
            type: UPDATE_UNITS,
        });
    }

    function setUnitsToLunar() {
        dispatch({
            payload: DISTANCE_LUNAR,
            type: UPDATE_UNITS,
        });
    }

    return (
        <div>
            <div className={styles.OnlyDangerous}>
                <input type="checkbox" onChange={setOnlyDangerous} />
                Показать только опасные
            </div>
            <div className={styles.DistanceMode}>
                Расстояние
                <button
                    onClick={setUnitsToKm}
                    className={`${styles.UnitsDefault} ${
                        state.units === DISTANCE_KM
                            ? styles.UnitsActive
                            : styles.UnitsDefault
                    }`}
                >
                    в километрах
                </button>
                ,
                <button
                    onClick={setUnitsToLunar}
                    className={`${styles.UnitsDefault} ${
                        state.units === DISTANCE_LUNAR
                            ? styles.UnitsActive
                            : styles.UnitsDefault
                    }`}
                >
                    в дистанциях до луны
                </button>
            </div>

            <AsteroidContext.Provider value={{ state, dispatch }}>
                <AsteroidsRender />
            </AsteroidContext.Provider>
        </div>
    );
}
