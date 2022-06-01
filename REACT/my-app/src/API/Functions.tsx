import {
    IS_DANGEROUS,
    IS_NOT_DANGEROUS,
} from "../NavigationManager/NavigarionManagerConst";

export function GetURL(KEY: any) {
    function TransformDate(date: any) {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        if (day < 10) {
            day = `0${day}`;
        }
        if (month < 10) {
            month = `0${month}`;
        }

        return `${date.getFullYear()}-${month}-${day}`;
    }

    const date = new Date();
    const start = TransformDate(date);
    date.setDate(date.getDate() + 7);
    const end = TransformDate(date);

    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${KEY}`;

    return url;
}

export function GetAsteroidsData(data: any) {
    const asteroidsList = [];

    for (const i in data.near_earth_objects) {
        for (const j in data.near_earth_objects[i]) {
            const asteroidData = data.near_earth_objects[i][j];
            asteroidsList.push({
                name: asteroidData.name,
                date: asteroidData.close_approach_data[0].close_approach_date,
                distance:
                    asteroidData.close_approach_data[0].miss_distance
                        .kilometers,
                rating: asteroidData.is_potentially_hazardous_asteroid
                    ? IS_DANGEROUS
                    : IS_NOT_DANGEROUS,
                size:
                    (asteroidData.estimated_diameter.meters
                        .estimated_diameter_min +
                        asteroidData.estimated_diameter.meters
                            .estimated_diameter_max) /
                    2,
            });
        }
    }

    return asteroidsList;
}
