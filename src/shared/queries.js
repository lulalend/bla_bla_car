import {SERVER_URL, TRIPS_URL} from './projectData';

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';

// LOGIN
const login = (login_password) => {
    return axios.post(SERVER_URL + '/v1/user/info/get', login_password)
        .then(response =>
            response.data
        )
        .catch(error => {
            console.log(error.response.status);
            const e = new Error(error);
            e.code = error.response.status;
            throw e;
        });
}

export const useLogin = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: login,
    });
}

// GET_TRIP
export const useGetTrips = (login_tripStatus_isOwner) => {
    return useQuery({
        queryKey: ['trips'],
        queryFn: () => {
            return axios.post(SERVER_URL + '/v1/trip/list', login_tripStatus_isOwner)
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    });
}

// CREATE_TRIP
const createTrip = (newTrip) => {
    return axios.post(SERVER_URL + '/v1/trip/create', newTrip)
        .then(response => {
            console.log(response);
            return response.data
        })
        .catch(error => {
            console.log(error);
        });
}

export const useCreateTrip = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTrip,
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({queryKey: ['trips']});
        },
        onError: (error) => {
            console.log(error);
        }
    });
}

// UPDATE_TRIP
const updateTrip = (updatedTrip) => {
    return axios.post(SERVER_URL + '/v1/trip/update', updatedTrip)
        .then(response =>
            response.data
        )
        .catch(error => {
            console.log(error)
        });
}

export const useUpdateTrip = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTrip,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['trips']});
        },
        onError: (error) => {
            console.log(error);
        }
    });
}

// REPLY_TO_TRIP
// this is put
const replyToTrip = (request) => {
    return axios.post(SERVER_URL + '/v1/trip/reply', request)
        .then(response =>
            response.data
        )
        .catch(error => {
            console.log(error)
        });
}

export const useReplyToTrip = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: replyToTrip,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['trips']});
        },
        onError: (error) => {
            console.log(error);
        }
    });
}

// GET_REPLIES
export const useGetReplies = (login_tripId) => {
    return useQuery({
        queryKey: ['replies'],
        queryFn: () => {
            return axios.post(SERVER_URL + '/v1/trip/reply/list', login_tripId)
                .then(response =>
                    response.data
                )
                .catch(error => {
                    console.log(error);
                    return error;
                });
        }
    });
}