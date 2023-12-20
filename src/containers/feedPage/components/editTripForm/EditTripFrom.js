import './EditTripForm.css';

import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';

export const EditTripForm = ({
    selectedTrip,
    hideEditForm,
    updateTrip,
    isDriver
}) => {
    const [tripDepartLocation, setTripDepartLocation] = useState(selectedTrip.departure_location);
    const [tripArrLocation, setTripArrLocation] = useState(selectedTrip.arrival_location);
    const [tripDate, setTripDate] = useState(selectedTrip.departure_location);
    const [tripSeats, setTripSeats] = useState(selectedTrip.available_seats);
    const [tripDesc, setTripDesc] = useState(selectedTrip.description);
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

    const saveTrip = (e) => {
        e.preventDefault();
        const statusTrip = isDriver ? 'WAITING_PASSENGER' : 'WAITING_DRIVER';
        const requestBody = {
            login: login,
            trip: {
                trip_id: selectedTrip.id,
                tripInfo: {
                    departureLocation: tripDepartLocation,
                    arrivalLocation: tripArrLocation,
                    date: tripDate,
                    availableSeats: tripSeats,
                    desc: tripDesc,
                    // isReplied: selectedTrip.isReplied
                    tripStatus: statusTrip
                }
            }
        }

        updateTrip(requestBody);
    }

    window.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
            hideEditForm();
        }
    });

    return (
        <>
            <form className='editTripForm' onSubmit={saveTrip} action=''>
                <button type='button' className='cancelBtn' onClick={hideEditForm}>
                    <CancelIcon/>
                </button>
                <h2>Редактирование поездки :)</h2>
                <div>
                    <input
                        type='text'
                        name='tripDepartureLocation'
                        className='editFormInput'
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
                        className='editFormInput'
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
                        className='editFormInput'
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
                        className='editFormInput'
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
                        className='editFormInput'
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
            <div className='overlay' onClick={hideEditForm}></div>
        </>
    );
}