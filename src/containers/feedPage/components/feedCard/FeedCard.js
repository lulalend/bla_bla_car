import './FeedCard.css';

export const FeedCard = ({
    id,
    departure_location,
    arrival_location,
    date,
    available_seats,
    description,
    isReplied,
    functionBtn,
    textBtn,
    seeReplies,
    showTripReplies
}) => {

    return (
        <>
            {/*можно после нажатия по кнопке откликнуться сделать её дизэйблд или скрывать пост,
            но тут правда вопрос после рефреша потому что она снова будет активна*/}
            {
                isReplied ? null : (
                    <div key={id} className='trip'>
                        <div className='explanations'>
                            <p>Отправление из: </p>
                            <p>Прибытие в: </p>
                            <p>Дата поездки: </p>
                            <p>Оставшиеся места: </p>
                            <p>Описание: </p>
                        </div>
                        <div className='values'>
                            <p>{departure_location}</p>
                            <p>{arrival_location}</p>
                            <p>{date}</p>
                            <p>{available_seats}</p>
                            <p>{description}</p>
                        </div>
                        <div>
                            <button className='darkBtn' onClick={functionBtn}>
                                {textBtn}
                            </button>
                            {
                                (seeReplies) &&
                                (<button className='darkBtn' onClick={showTripReplies}>
                                    Посмотреть отклики
                                </button>)
                            }
                        </div>
                    </div>
                )
            }
        </>
    );
}