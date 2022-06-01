import { createContext, useReducer, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { AsteroidsPage } from "./AsteroidsPage/AsteroidsPage";
import { AuthorizationPage } from "./AuthorizationPage/AuthorizationPage";
import { GetURL, GetAsteroidsData } from "./API/Functions";
import { reducer, ReducerAction } from "./Reducer/Reducer";
import { DISTANCE_KM } from "./NavigationManager/NavigarionManagerConst";
import { SET_USER_DATA, UPDATE_ASTEROIDS_LIST } from "./Reducer/ReducerConst";

const linkStyle = {
    textDecoration: "none",
    color: "black",
    padding: "10px",
};

export type Asteroid = {
    name: string;
    date: string;
    distance: number;
    rating: string;
    size: number;
};

export type GlobalContent = {
    asteroidsList: Asteroid[];
    destroyList: Asteroid[];
    onlyDangerous: boolean;
    units: string;
    userData: {
        name: string;
        key: string;
    };
};

export const GlobalState: GlobalContent = {
    asteroidsList: [],
    destroyList: [],
    onlyDangerous: false,
    units: DISTANCE_KM,
    userData: {
        name: window.localStorage.getItem("name") || "DEMO_NAME",
        key: window.localStorage.getItem("key") || "DEMO_KEY",
    },
};

export const AsteroidContext = createContext({
    state: GlobalState,
    dispatch: (value: ReducerAction) => {},
});

function App() {
    // const [state, dispatch] = useReducer(reducer, {
    //     asteroidsList: [],
    //     destroyList: [],
    //     onlyDangerous: false,
    //     units: DISTANCE_KM,
    //     userData: {
    //         name: window.localStorage.getItem("name") || "DEMO_NAME",
    //         key: window.localStorage.getItem("key") || "DEMO_KEY",
    //     },
    // });

    const [state, dispatch] = useReducer(reducer, GlobalState);

    useEffect(() => {
        const lsname = window.localStorage.getItem("name");
        const lskey = window.localStorage.getItem("key");

        if (lsname && lskey) {
            dispatch({
                payload: {
                    ...state,
                    userData: { name: lsname, key: lskey },
                },
                type: SET_USER_DATA,
            });
        }

        fetch(GetURL(state.userData.key))
            .then((response) =>
                response.json().then((data) => {
                    dispatch({
                        payload: {
                            ...state,
                            asteroidsList: GetAsteroidsData(data),
                        },
                        type: UPDATE_ASTEROIDS_LIST,
                    });
                })
            )
            .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <header>
                <Link to="/" style={linkStyle}>
                    Asteroids
                </Link>
                <Link to="Destroy" style={linkStyle}>
                    Уничтожение
                </Link>
                <Link to="Authorization" style={linkStyle}>
                    Авторизация ({state.userData.name})
                </Link>
            </header>
            <AsteroidContext.Provider
                value={{ state: state, dispatch: dispatch }}
            >
                <Routes>
                    <Route path="/" element={<AsteroidsPage />} />
                    <Route path="Destroy" element={<AsteroidsPage />} />
                    <Route
                        path="Authorization"
                        element={<AuthorizationPage />}
                    />
                </Routes>
            </AsteroidContext.Provider>
        </div>
    );
}

export default App;
