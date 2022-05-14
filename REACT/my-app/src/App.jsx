import React, { createContext, useReducer, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { MainPage } from './MainPage/MainPage';
import { DestroyPage } from './DestroyPage/DestroyPage';
import { AuthorizationPage } from './AuthorizationPage/AuthorizationPage';
import { GetURL, GetAsteroidsData } from './API/Functions';
import { reducer } from './Reducer/Reducer';
import { DISTANCE_KM } from './NavigationManager/NavigarionManagerConst';
import { SET_USER_DATA, UPDATE_ASTEROIDS_LIST } from './Reducer/ReducerConst';

const linkStyle = {
    textDecoration: 'none',
    color: 'black',
    padding: '10px',
};

export const AsteroidContext = createContext();

function App() {
    const [state, dispatch] = useReducer(reducer, {
        asteroidsList: [],
        destroyList: [],
        onlyDangerous: false,
        units: DISTANCE_KM,
        userData: {
            name: window.localStorage.getItem('name') || 'DEMO_NAME',
            key: window.localStorage.getItem('key') || 'DEMO_KEY',
        },
    });

    useEffect(() => {
        if (
            window.localStorage.getItem('name') &&
            window.localStorage.getItem('key')
        ) {
            dispatch({
                payload: {
                    name: window.localStorage.getItem('name'),
                    key: window.localStorage.getItem('key'),
                },
                type: SET_USER_DATA,
            });
        }

        fetch(GetURL(state.userData.key))
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
                <Link to="/" style={linkStyle}>
                    Астероиды
                </Link>
                <Link to="Destroy" style={linkStyle}>
                    Уничтожение
                </Link>
                <Link to="Authorization" style={linkStyle}>
                    Авторизация ({state.userData.name})
                </Link>
            </header>
            <AsteroidContext.Provider value={{ state, dispatch }}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="Destroy" element={<DestroyPage />} />
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
