import { createContext, useReducer, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./NavigationManager/NavigarionManagerConst";
import { MainPage } from "./MainPage/MainPage";
import { DestroyPage } from "./DestroyPage/DestroyPage";
import { GetURL, GetAsteroidsData } from "./API/Functions";
import { reducer } from "./Reducer/Reducer";
import { DISTANCE_KM } from "./NavigationManager/NavigarionManagerConst";
import { UPDATE_ASTEROIDS_LIST } from "./Reducer/ReducerConst";

const linkStyle = {
  textDecoration: "none",
  color: "black",
  padding: "10px",
};

export const AsteroidContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, {
    asteroidsList: [],
    destroyList: [],
    onlyDangerous: false,
    units: DISTANCE_KM,
  });

  useEffect(() => {
    fetch(GetURL())
      .then((response) =>
        response.json().then((data) => {
          dispatch({
            payload: GetAsteroidsData(data),
            type: UPDATE_ASTEROIDS_LIST,
          });
        })
      )
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <header>
        <Link to={"/"} style={linkStyle}>
          Астероиды
        </Link>
        <Link to={"Destroy"} style={linkStyle}>
          Уничтожение
        </Link>
      </header>
      <AsteroidContext.Provider value={{ state, dispatch }}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="Destroy" element={<DestroyPage />} />
        </Routes>
      </AsteroidContext.Provider>
    </div>
  );
}

export default App;
