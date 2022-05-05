import {
  IS_DANGEROUS,
  IS_NOT_DANGEROUS,
} from "../NavigationManager/NavigarionManagerConst";

export function GetURL() {
  //   const KEY = "process.env.REACT_APP_NASA_API_KEY" || "DEMO_KEY";
  const KEY = "CJaiG6DoZWhCHtUE471LxsuBpfnXQ6LmBUfZOLQL";

  function TransformDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }

    return date.getFullYear() + "-" + month + "-" + day;
  }

  let date = new Date();
  const start = TransformDate(date);
  date.setDate(date.getDate() + 7);
  const end = TransformDate(date);

  const url =
    "https://api.nasa.gov/neo/rest/v1/feed?start_date=" +
    start +
    "&end_date=" +
    end +
    "&api_key=" +
    KEY;

  return url;
}

export function GetAsteroidsData(data) {
  const asteroidsList = [];

  for (let i in data.near_earth_objects) {
    for (let j in data.near_earth_objects[i]) {
      let asteroid_data = data.near_earth_objects[i][j];
      asteroidsList.push({
        name: asteroid_data.name,
        date: asteroid_data.close_approach_data[0].close_approach_date,
        distance: asteroid_data.close_approach_data[0].miss_distance.kilometers,
        rating: asteroid_data.is_potentially_hazardous_asteroid
          ? IS_DANGEROUS
          : IS_NOT_DANGEROUS,
        size:
          (asteroid_data.estimated_diameter.meters.estimated_diameter_min +
            asteroid_data.estimated_diameter.meters.estimated_diameter_max) /
          2,
      });
    }
  }

  return asteroidsList;
}
