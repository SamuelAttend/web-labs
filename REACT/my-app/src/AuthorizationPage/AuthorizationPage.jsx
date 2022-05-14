import React, { useState, useContext } from 'react';
import styles from '../Page.module.css';
import { AsteroidContext } from '../App';
import { SET_USER_DATA, UPDATE_ASTEROIDS_LIST } from '../Reducer/ReducerConst';
import { GetURL, GetAsteroidsData } from '../API/Functions';

export function AuthorizationPage() {
    const { state, dispatch } = useContext(AsteroidContext);
    const [name, setName] = useState('');
    const [key, setKey] = useState('');
    const [rememberUser, setRememberUser] = useState(false);

    function changeName(e) {
        setName(e.target.value);
    }

    function changeKey(e) {
        setKey(e.target.value);
    }

    function changeRememberUser(e) {
        setRememberUser(e.target.checked);
    }

    function submit(e) {
        if (rememberUser) {
            window.localStorage.setItem('name', name);
            window.localStorage.setItem('key', key);
        }

        dispatch({
            payload: {
                name,
                key,
            },
            type: SET_USER_DATA,
        });

        fetch(GetURL(key))
            .then((response) =>
                response.json().then((data) => {
                    dispatch({
                        payload: GetAsteroidsData(data),
                        type: UPDATE_ASTEROIDS_LIST,
                    });
                })
            )
            .catch((error) => console.log(error));
    }
    function quit(e) {
        dispatch({
            payload: {
                name: 'DEMO_NAME',
                key: 'DEMO_KEY',
            },
            type: SET_USER_DATA,
        });

        window.localStorage.clear();
    }

    return (
        <div className={styles.Page}>
            <div className={styles.Rectangle} />
            <div className={styles.Name}>ARMAGGEDON V</div>
            <div className={styles.Info}>
                Это приложение делает запрос в API NASA. Для авторизации
                необходим специальный ключ
            </div>
            {state.userData.name !== 'DEMO_NAME' &&
            state.userData.key !== 'DEMO_KEY' ? (
                <div>
                    <div>{state.userData.name}</div>
                    <button type="button" onClick={quit}>
                        Выйти
                    </button>
                </div>
            ) : (
                <div>
                    <div>
                        <input type="text" value={name} onChange={changeName} />
                    </div>
                    <div>
                        <input type="text" value={key} onChange={changeKey} />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value={rememberUser}
                            onChange={changeRememberUser}
                        />
                        Запомнить меня
                    </div>
                    <div>
                        <button type="button" onClick={submit}>
                            Войти
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
