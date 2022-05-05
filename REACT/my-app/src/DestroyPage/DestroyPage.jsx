import styles from "../Page.module.css";
import { useContext } from "react";
import { NavigationManager } from "../NavigationManager/NavigationManager";
import { AsteroidContext } from "../App";

export function DestroyPage() {
  const { state, dispatch } = useContext(AsteroidContext);

  return (
    <div className={styles.Page}>
      <div className={styles.Name}>ARMAGGEDON V</div>
      <div className={styles.Info}>
        Сервис мониторинга и уничтожения астероидов, опасно подлетающих к Земле.
      </div>
      <div className={styles.Rectangle}></div>

      <AsteroidContext.Provider value={{ state, dispatch }}>
        <NavigationManager />
      </AsteroidContext.Provider>
      <div className={styles.Quote}>2022 © Все права и планета защищены</div>
    </div>
  );
}
