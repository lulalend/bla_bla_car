import user_icon from '../../assets/person.png';
import password_icon from '../../assets/password.png';
import './Login.css'
import {useLogin} from '../../shared/queries';

import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export const Login = ({
                          setIsLoggedIn,
                          setUsername,
                          setIsDriverRights,
                          setIsDriver
                      }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [status, setStatus] = useState(0);

    const logIn = useLogin();

    const handleLoginChange = e => {
        setLogin(e.target.value);
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }

    const handleLogin = (login, password) => {
        return function(e) {
            e.preventDefault();

            logIn.mutateAsync({
                login: login,
                password: password
            }).then((response) => {
                if(response.is_driver) {
                    setIsDriverRights(true);
                    localStorage.setItem('isDriverRights', 'true');
                }

                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('username', login);

                setUsername(login);
                setIsLoggedIn(true);
                navigate('/feed');
            }).catch(error => {
                console.log(error.code)
                setStatus(error.code);
            });
        }
    }

    console.log(status);

    return (
        <div className='container'>
            <h1 className='login-header'>Вход</h1>
            <div className='underline'></div>

            <form className='inputs' onSubmit={handleLogin(login, password)}>
                <div className='input'>
                    <img src={user_icon} alt='Имя пользователя'/>
                    <input
                        type='text'
                        placeholder='Имя пользователя'
                        onChange={handleLoginChange}
                        name='username'
                        required
                    />
                    {
                        (status === 404) &&
                        <div style={{color: 'red'}}>Пользователь с таким логином не найден :(</div>
                    }
                </div>
                <div className='input'>
                    <img src={password_icon} alt='Пароль'/>
                    <input
                        type='password'
                        placeholder='Пароль'
                        name='password'
                        onChange={handlePasswordChange}
                        required
                    />
                    {
                        (status === 403) &&
                        <div style={{color: 'red'}}>Неверный пароль :(</div>
                    }
                </div>

                <button
                    type='submit'
                    className='submit-container'
                >
                    Войти
                </button>
            </form>
        </div>
    );
}