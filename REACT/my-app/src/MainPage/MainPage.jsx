import { CardContent } from "../Card/CardContent/CardContent"
import styles from  "./MainPage.module.css"

export function MainPage() {
    const asteroids = [{name: "2022 FQ", date: "3 марта 2056", distance:9331775, rating:"Не опасен", size:9},
    {name: "2021 FQ", date: "12 сентября 2087", distance:100, rating:"Опасен", size:99999}];

    return (<div className={styles.MainPage}>
        <div className={styles.Name}>ARMAGGEDON V</div>
        <div className={styles.Info}>Сервис мониторинга и уничтожения астероидов, опасно подлетающих к Земле.</div>
        <div className={styles.Rectangle}></div>
        <div className={styles.OnlyDangerous}><input type='checkbox'></input>Показать только опасные</div>
        <div className={styles.DistanceMode}>Расстояние <strong>в километрах</strong>, в дистанциях до луны</div>

        {asteroids.map((i)=><div><CardContent name={i.name} date={i.date} distance={i.distance} rating={i.rating} size={i.size}/></div>)}
    </div>)
}