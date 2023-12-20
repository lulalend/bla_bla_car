import '../Feed.css';
import {FeedCard} from '../components/feedCard/FeedCard';
import {AddTripForm} from '../components/addTripForm/AddTripForm';
import {EditTripForm} from '../components/editTripForm/EditTripFrom';
import {RepliesForm} from '../components/replies/RepliesForm';
import {useCreateTrip, useGetTrips, useUpdateTrip} from '../../../shared/queries';

import {useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export const OwnFeed = ({
                            isDriver
                        }) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState({});
    const login = localStorage.getItem('username');
    const statuses = ['WAITING_PASSENGER', 'WAITING_DRIVER'];

    const {data, isError, error, isPending, isFetching} =
        useGetTrips({
            login: login,
            trip_statuses_to_show: statuses,
            include_owner_trips: true
        });
    const updateMutation = useUpdateTrip();
    const createMutation = useCreateTrip();

    if (isError)
        return (<h1>{error.message}</h1>);
    if (isPending)
        return (<h1>Загружаю данные...</h1>);

    const trips = data;
    if (!trips.length) {
        return (<h1>Нет поездок...</h1>);
    }

    const addNewTrip = newTrip => {
        createMutation.mutate(newTrip);
        setShowAddForm(false);
    }

    const updateTrip = trip => {
        updateMutation.mutate(trip);
        setShowEditForm(false);
    }

    const editFeedPost = (trip) => {
        setSelectedTrip(trip);
        setShowEditForm(true);
    }

    const showTripReplies = (trip) => {
        setSelectedTrip(trip);
        setShowReplies(true);
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
                functionBtn={() => editFeedPost(item)}
                textBtn={'Редактировать'}
                seeReplies={true}
                showTripReplies={() => showTripReplies(item)}
            />
        );
    });

    const tripsOpacity = isFetching ? 0.5 : 1;

    return (
        <div className='feedPage'>
            {showEditForm && (
                <EditTripForm
                    selectedTrip={selectedTrip}
                    hideEditForm={() => setShowEditForm(false)}
                    updateTrip={updateTrip}
                    isDriver={isDriver}
                />
            )}

            {showAddForm && (
                <AddTripForm
                    hideAddForm={() => setShowAddForm(false)}
                    addNewTrip={addNewTrip}
                    isDriver={isDriver}
                />
            )}

            {showReplies && (
                <RepliesForm
                    selectedTrip={selectedTrip}
                    hideRepliesForm={() => setShowReplies(false)}
                />
            )}

            <h1>Мои поездки</h1>
            <button
                type='button'
                className='blackBtn'
                onClick={() => setShowAddForm(true)}
            >
                Создать поездку
            </button>

            { isFetching && <CircularProgress className='preloader'/> }

            <div className='trips' style={{opacity: tripsOpacity}}>
                {feedTrips}
            </div>
        </div>
    );
}