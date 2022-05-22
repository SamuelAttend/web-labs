import React, { useContext } from "react";
import { AsteroidContext } from "../App";
import { NavigationManager } from "../NavigationManager/NavigationManager";
import styles from "../Page.module.css";

export function AsteroidsPage() {
    const { state, dispatch } = useContext(AsteroidContext);

    return (
        <div className={styles.Page}>
            <div className={styles.Rectangle} />
            <div className={styles.Name}>ARMAGGEDON V</div>
            <div className={styles.Info}>
                Сервис мониторинга и уничтожения астероидов, опасно подлетающих
                к Земле.
            </div>

            <AsteroidContext.Provider value={{ state, dispatch }}>
                <NavigationManager />
            </AsteroidContext.Provider>
            <div className={styles.Quote}>
                2022 © Все права и планета защищены
            </div>
        </div>
    );
}
