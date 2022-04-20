import React, { useEffect, useState } from "react";
import { CardContent } from "../Card/CardContent/CardContent"
import styles from  "./MainPage.module.css"

function GenerateAsteroids()
{
    const monthNames = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ]

    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZa';

    const asteroids = [];

    for (let i = 0; i < 10; i++)
    {
        const name = new Date(100000000000 + Math.random()*10000000000000).getFullYear() + ' ' + charSet[(Math.random()*25).toFixed(0)] + charSet[(Math.random()*25).toFixed(0)]
        const date = new Date(10000000000000 + Math.random()*10000000000000);
        const year = date.getFullYear();
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const distance = (1000000 + Math.random()*10000000000000).toFixed(0);
        const rating = Math.random() < 0.5 ? 'Опасен' : 'Не опасен';
        const size = (10 + Math.random()*1200).toFixed(0);

        asteroids.push({
            name: name,
            date: day + ' ' + month + ' ' + year + ' года',
            distance: distance,
            rating: rating,
            size: size
        })
    }

    return asteroids;
}

export function MainPage() {
    const [asteroids, setAsteroids] = useState(GenerateAsteroids())
    
    const [onlyDangerous, setOnlyDangerous] = useState(false);
    const onlyDangerousOnChange = () => {
        setOnlyDangerous(!onlyDangerous);
    }

    const [units, setUnits] = useState('км');
    const unitsToKm = () => {
        setUnits('км');
    }
    const unitsToMoons = () => {
        setUnits('лун');
    }

    function passDistance(distance)
    {
        return (units === 'км' ? distance : (distance/384400).toFixed(0)) + ' ' + units;
    }

    return (<div className={styles.MainPage}>
        <div className={styles.Name}>ARMAGGEDON V</div>
        <div className={styles.Info}>Сервис мониторинга и уничтожения астероидов, опасно подлетающих к Земле.</div>
        <div className={styles.Rectangle}></div>
        <div className={styles.OnlyDangerous}><input type='checkbox' value={onlyDangerous} onChange={onlyDangerousOnChange}></input>Показать только опасные</div>
        <div className={styles.DistanceMode}>Расстояние
            <button onClick={unitsToKm} className={styles.UnitsDefault + ' ' + (units === 'км' ? styles.UnitsActive : styles.UnitsDefault)}>в километрах</button>,
            <button onClick={unitsToMoons} className={styles.UnitsDefault + ' ' + (units === 'лун' ? styles.UnitsActive : styles.UnitsDefault)}>в дистанциях до луны</button>
        </div>
        {onlyDangerous === true ? asteroids.filter((i)=>i.rating==='Опасен').map((i)=><div><CardContent name={i.name} date={i.date} distance={passDistance(i.distance)} rating={i.rating} size={i.size}/></div>)
        :
        asteroids.map((i)=><div><CardContent name={i.name} date={i.date} distance={passDistance(i.distance)} rating={i.rating} size={i.size}/></div>)}
        <div className={styles.Quote}>
            2022 © Все права и планета защищены
        </div>
    </div>)
}