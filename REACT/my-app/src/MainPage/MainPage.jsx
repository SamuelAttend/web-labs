import React, { useEffect, useState } from "react";
import { CardContent } from "../Card/CardContent/CardContent"
import styles from  "./MainPage.module.css"

function TransformDate(date)
{
    let day = date.getDate();
    let month = date.getMonth();
    if (day < 10)
    {
        day = '0' + day;
    }
    if (month < 10)
    {
        month = '0' + month;
    }

    return date.getFullYear() + '-' + month + '-' + day;
}

function GetURL()
{
    let KEY = process.env.REACT_APP_NASA_API_KEY;
    if (!KEY)
    {
        KEY = "DEMO_KEY";
    }
    KEY = "DEMO_KEY";

    let date = new Date();
    const start = TransformDate(date);
    date.setDate(date.getDate() + 5);
    const end = TransformDate(date);

    const url = ('https://api.nasa.gov/neo/rest/v1/feed?start_date=' + start + '&end_date=' + end + '&api_key=' + KEY);

    return url;
}

function GetAsteroidsData(data)
{
    const asteroids = [];

    for (let i in data.near_earth_objects)
    {
        for (let j in data.near_earth_objects[i])
        {
            let asteroid_data = data.near_earth_objects[i][j];
            asteroids.push({
                name: asteroid_data.name,
                date: asteroid_data.close_approach_data[0].close_approach_date,
                distance: asteroid_data.close_approach_data[0].miss_distance.kilometers,
                rating: (asteroid_data.is_potentially_hazardous_asteroid ? "Опасен" : "Не опасен"),
                size: (asteroid_data.estimated_diameter.meters.estimated_diameter_min + asteroid_data.estimated_diameter.meters.estimated_diameter_max) / 2
            });
        }
    }

    return asteroids;
}

export function MainPage() {
    const [asteroids, setAsteroids] = useState([
        {
            name: "Loading...",
            date: "Loading...",
            distance: "Loading...",
            rating: "Loading...",
            size: "Loading..."
        }
    ]);

    useEffect(() => {fetch(GetURL())
        .then((response) => response.json()
        .then((data) => {setAsteroids(GetAsteroidsData(data));}))
        .catch((error) => console.log(error))}, []);
    
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