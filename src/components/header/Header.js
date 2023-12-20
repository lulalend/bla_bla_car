import './Header.css';
import {useCheckDriverRights, useGetTrips} from '../../shared/queries';

import {Link} from 'react-router-dom';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import Switch from '@mui/material/Switch';
import {FormControlLabel} from '@mui/material';

export const Header = ({
    isLoggedIn,
    setIsLoggedIn,
    isDriver,
    setIsDriver,
    isDriverRights
}) => {
    const handleLogOut = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('isDriver');
        localStorage.removeItem('isDriverRights');
        setIsLoggedIn(false);
    }

    const handleChange = () => {
        console.log(isDriverRights);
        if( isDriverRights && !isDriver) {
            setIsDriver(true);
            localStorage.setItem('isDriver', 'true');
        }
        if (isDriver) {
            setIsDriver(false);
            localStorage.setItem('isDriver', 'false');
        }
        window.location.reload();
    }

    return (<header>
        <nav>
            {isLoggedIn ? (<>
                <div className='driverSwitch'>
                    <FormControlLabel
                        control={<Switch checked={isDriver} onChange={handleChange} color='warning'/>}
                        label='Водитель'
                    />
                </div>
                <Link
                    to='/login'
                    className='logout'
                    onClick={handleLogOut}
                >
                    <MeetingRoomIcon/>
                    Выход
                </Link>
                <Link
                    to='/feed'
                >
                    Лента
                </Link>
                <Link
                    to='/myFeed'
                >
                    Мои поездки
                </Link>
            </>) : <p>Добро пожаловать, незнакомец!</p>}
        </nav>
    </header>);
}