import {Navigate} from 'react-router-dom';
import {Login} from '../../containers/loginPage/Login';

export const PublicRoute = ({
    isLoggedIn,
    setIsLoggedIn,
    setUsername,
    setIsDriverRights,
}) => {
    return (
        isLoggedIn ? <Navigate to='/'/>
            : <Login
                setIsLoggedIn={setIsLoggedIn}
                setUsername={setUsername}
                setIsDriverRights={setIsDriverRights}
            />
    );
}