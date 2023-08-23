import React, { useEffect } from 'react';
import { setData } from './Action';
import Store from './Store';

const GetDataFromUrl = ({ url }) => {
    useEffect(() => {
        fetch(url) // Используем переданный URL
            .then((response) => response.json())
            .then((data) => {
                Store.dispatch(setData(data)); // Отправляем данные в Redux store с помощью setData
            })
            .catch((error) => {
                console.log('error during getting data', error);
            });
    }, [url]);

    const data = Store.getState().data;

    return (
        <div>
            <h2>Загруженные данные:</h2>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>
                        <strong>
                            <h2>{item.title}</h2>
                        </strong>
                        <p>{item.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetDataFromUrl;
