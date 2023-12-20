// сделать нормальное REST_API перед тем как закинуть на github
const express = require('express');
const cors = require('cors');

const port = 2000;
const server = express();
const corsOpts = {
    origin: '*',

    methods: [
        'GET',
        'POST',
        'OPTIONS'
    ]
};

server.use(cors(corsOpts));

server.listen(port, error => {
   error ? console.log(error) : console.log(`Сервер запущен по адресу http://localhost:${port}!`);
});

server.get('/', (request, response) => {
    response.send('Hello world!');
});

server.post('/v1/user/info/get', (request, response) => {
    console.log('Запрос login пришёл POST');
    response.json({
        first_name: '123',
        last_name: '123',
        birth_date: new Date(2013, 13, 1),
        sex: 'MALE',
        phone_number: 12345678910,
        email: '123',
        is_driver: false
    });
    // response.status(403).send();
});

server.post('/v1/trip/list', (request, response) => {
    console.log('Запрос trips пришёл POST');
    response.json(
        [{
            trip_id: 1,
            trip_info: {
                departure_location: 'St. Petersburg',
                arrival_location: 'Moscow',
                available_seats: 10,
                date: new Date(2023, 12, 25),
                description: 'bebebebe',
                trip_status: 'WAITING_DRIVER',
                is_driver: false
            }
        }]
    );
});

server.post('/v1/trip/create', (request, response) => {
    console.log('Запрос create пришёл POST');
    response.status(200).send();
});

server.post('/v1/trip/update', (request, response) => {
    console.log('Запрос put_update пришёл POST');
    response.status(200).send();
});

server.post('/v1/trip/reply', (request, response) => {
    console.log('Запрос put_reply пришёл POST');
    response.status(200).send();
});

server.post('/v1/trip/reply/list', (request, response) => {
    console.log('Запрос get_replies пришёл POST');
    response.json(
        [
            {email: '123'},
            {email: 'lulalend'}
        ]
    );
});