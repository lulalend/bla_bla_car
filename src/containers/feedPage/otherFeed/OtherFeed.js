import '../Feed.css';
import {FeedCard} from '../components/feedCard/FeedCard';
import {AddTripForm} from '../components/addTripForm/AddTripForm';
import {useCreateTrip, useGetTrips, useReplyToTrip} from '../../../shared/queries';

import {useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export const OtherFeed = ({
    isDriver
}) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const login = localStorage.getItem('username');
    const statuses = isDriver ? ['WAITING_PASSENGER'] : ['WAITING_DRIVER'];

    const {data, isError, error, isPending, isFetching} =
        useGetTrips({
            login: login,
            trip_statuses_to_show: statuses,
            include_owner_trips: false
        });
    const replyMutation = useReplyToTrip();
    const addMutation = useCreateTrip();

    if (isError)
        return (<h1>{error.message}</h1>);
    if (isPending)
        return (<h1>Загружаю данные...</h1>);

    const trips = data;
    if (!trips.length) {
        return (<h1>Нет поездок...</h1>);
    }

    const addNewTrip = newTrip => {
        addMutation.mutate(newTrip);
        setShowAddForm(false);
    }

    const replyToTrip = feedTrip => {
        // тут ещё сначала должно всплыть модальное окно, в котором спрашивается инфа по поездке
        const requestBody = {
            login: login,
            trip_id: feedTrip.id
        }
        replyMutation.mutate(requestBody);
    }

    const feedTrips = trips.map((item) => {
        const tripInfo = item.trip_info;
        return (
            <FeedCard
                key={item.trip_id}
                departure_location={tripInfo.departure_location}
                arrival_location={tripInfo.arrival_location}
                date={tripInfo.date}
                available_seats={tripInfo.available_seats}
                description={tripInfo.description}
                // isReplied={item.isReplied}
                functionBtn={() => replyToTrip(item)}
                textBtn={'Откликнуться'}
                seeReplies={false}
            />
        );
    });

    const tripsOpacity = isFetching ? 0.5 : 1;

    return (
        <div className='feedPage'>
            {showAddForm && (
                <AddTripForm
                    hideAddForm={() => setShowAddForm(false)}
                    addNewTrip={addNewTrip}
                    isDriver={isDriver}
                />
            )}

            <h1>Поездки</h1>
            <button
                type='button'
                className='blackBtn'
                onClick={() => setShowAddForm(true)}
            >
                Создать поездку
            </button>

            {isFetching && <CircularProgress className='preloader'/>}

            <div className='trips' style={{opacity: tripsOpacity}}>
                {feedTrips}
            </div>
        </div>
    );
}