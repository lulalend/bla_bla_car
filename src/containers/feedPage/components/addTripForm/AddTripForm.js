import './AddTripForm.css';

import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';

export const AddTripForm = ({
    hideAddForm,
    addNewTrip,
    isDriver
}) => {
    const [tripDepartLocation, setTripDepartLocation] = useState('');
    const [tripArrLocation, setTripArrLocation] = useState('');
    const [tripDate, setTripDate] = useState('');
    const [tripSeats, setTripSeats] = useState('');
    const [tripDesc, setTripDesc] = useState('');
    const login = localStorage.getItem('username');

    const handleTripDepartLocation = (e) => {
        setTripDepartLocation(e.target.value);
    }
    const handleTripArrLocation = (e) => {
        setTripArrLocation(e.target.value);
    }
    const handleTripDate = (e) => {
        setTripDate(e.target.value);
    }
    const handleTripSeats = (e) => {
        setTripSeats(e.target.value);
    }
    const handleTripDescChange = (e) => {
        setTripDesc(e.target.value);
    }

    const createTrip = (e) => {
        e.preventDefault();
        const statusTrip = isDriver ? 'WAITING_PASSENGER' : 'WAITING_DRIVER';
        const request = {
            login: login,
            tripInfo: {
                departureLocation: tripDepartLocation,
                arrivalLocation: tripArrLocation,
                date: tripDate,
                availableSeats: tripSeats,
                desc: tripDesc,
                // isReplied: false,
                tripStatus: statusTrip
            }
        }

        addNewTrip(request);
    }

    window.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
            hideAddForm();
        }
    });

    return (
        <>
            <form className='addTripForm' onSubmit={createTrip} action=''>
                <button type='button' className='cancelBtn' onClick={hideAddForm}>
                    <CancelIcon/>
                </button>
                <h2>Создание поездки :)</h2>
                <div>
                    <input
                        type='text'
                        name='tripDepartureLocation'
                        className='addFormInput'
                        placeholder='Город отправления'
                        value={tripDepartLocation}
                        onChange={handleTripDepartLocation}
                        required
                    />
                </div>
                <div>
                    <input
                        type='text'
                        name='tripArrivalLocation'
                        className='addFormInput'
                        placeholder='Город прибытия'
                        value={tripArrLocation}
                        onChange={handleTripArrLocation}
                        required
                    />
                </div>
                <div>
                    <input
                        type='date'
                        name='tripDate'
                        className='addFormInput'
                        placeholder='Дата'
                        value={tripDate}
                        onChange={handleTripDate}
                        required
                    />
                </div>
                <div>
                    <input
                        type='number'
                        name='tripSeats'
                        className='addFormInput'
                        placeholder='Количество мест'
                        value={tripSeats}
                        min='0'
                        max='30'
                        onChange={handleTripSeats}
                        required
                    />
                </div>
                <div>
                    <textarea
                        name='tripDescription'
                        className='addFormInput'
                        rows='4'
                        placeholder='Описание'
                        value={tripDesc}
                        onChange={handleTripDescChange}
                    />
                </div>
                <div>
                    <button
                        type='submit'
                        className='blackBtn'
                    >
                        Готово
                    </button>
                </div>
            </form>
            <div className='overlay' onClick={hideAddForm}></div>
        </>
    );
}