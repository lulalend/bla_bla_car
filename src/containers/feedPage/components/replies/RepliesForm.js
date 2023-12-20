import './RepliesForm.css';
import {useGetReplies} from '../../../../shared/queries';

import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';

export const RepliesForm = ({
    selectedTrip,
    hideRepliesForm
}) => {
    const login = localStorage.getItem('username');

    const { data, isError, error, isPending } =
        useGetReplies({
            login: login,
            trip_id: selectedTrip.id,
        });

    if (isError) {
        return (
            <>
                <div className='repliesWindow'>
                    <h1>{error.message}</h1>
                </div>
                <div className='overlay' onClick={hideRepliesForm}></div>
            </>
        );
    }
    if (isPending) {
        return (<>
            <div className='repliesWindow'>
                <h1>Загружаю данные...</h1>
            </div>
            <div className='overlay' onClick={hideRepliesForm}></div>
        </>);
    }

    const replies = data;
    if (!replies.length) {
       return (<>
           <div className='repliesWindow'>
            <h1>Нет откликнувшихся...</h1>
           </div>
           <div className='overlay' onClick={hideRepliesForm}></div>
       </>);
    }

    window.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
            hideRepliesForm();
        }
    });

    const feedReplies = replies.map((item, pos) => {
        return (
            <div key={pos}>
                <strong>Пользователь {pos+1}:</strong> &nbsp;&nbsp;{item.email}
            </div>
        );
    });

    return (
        <>
            <div className='repliesWindow'>
                <button type='button' className='cancelBtn' onClick={hideRepliesForm}>
                    <CancelIcon/>
                </button>
                <h2>Откликнувшиеся пользователи :)</h2>

                <div className='replies'>
                    {feedReplies}
                </div>

                <div>
                    <button
                        type='button'
                        className='blackBtn'
                        onClick={hideRepliesForm}
                    >
                        Готово
                    </button>
                </div>
            </div>
            <div className='overlay' onClick={hideRepliesForm}></div>
        </>
    );
}