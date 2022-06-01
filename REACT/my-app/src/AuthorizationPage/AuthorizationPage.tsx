import React, { useState, useContext } from "react";
import styles from "../Page.module.css";
import { AsteroidContext } from "../App";
import { SET_USER_DATA, UPDATE_ASTEROIDS_LIST } from "../Reducer/ReducerConst";
import { GetURL, GetAsteroidsData } from "../API/Functions";

export function AuthorizationPage() {
    const { state, dispatch } = useContext(AsteroidContext);

    const [name, setName] = useState("");
    const [key, setKey] = useState("");
    const [rememberUser, setRememberUser] = useState(false);

    function changeName(e: any) {
        setName(e.target.value);
    }

    function changeKey(e: any) {
        setKey(e.target.value);
    }

    function changeRememberUser(e: any) {
        setRememberUser(e.target.checked);
    }

    function submit(e: any) {
        if (name.length < 4 || key.length < 40) {
            alert("Длина имени пользователя или ключа меньше необходимого");
            return;
        }
        if (rememberUser) {
            window.localStorage.setItem("name", name);
            window.localStorage.setItem("key", key);
        }

        dispatch({
            payload: {
                ...state,
                userData: { name: name, key: key },
            },
            type: SET_USER_DATA,
        });

        fetch(GetURL(key))
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
    }
    function quit(e: any) {
        dispatch({
            payload: {
                ...state,
                userData: { name: "DEMO_NAME", key: "DEMO_KEY" },
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
            {state.userData.name !== "DEMO_NAME" &&
            state.userData.key !== "DEMO_KEY" ? (
                <div className={styles.AuthorizationForm}>
                    <button
                        type="button"
                        onClick={quit}
                        className={styles.QuitButton}
                    >
                        Выйти
                    </button>
                </div>
            ) : (
                <div className={styles.AuthorizationForm}>
                    <div>
                        <input
                            type="text"
                            value={name}
                            onChange={changeName}
                            className={styles.TextBox}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={key}
                            onChange={changeKey}
                            className={styles.TextBox}
                        />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            value={rememberUser ? 1 : 0}
                            onChange={changeRememberUser}
                        />
                        Запомнить меня
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={submit}
                            className={styles.SubmitButton}
                        >
                            Войти
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
