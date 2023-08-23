import React from 'react';
import GetDataFromUrl from './GetDataFromUrl';

const Photo = () => {
    return (
        <div>
            <h1>Photo</h1>
            <p>Here is the Photo Page</p>
            <GetDataFromUrl url="https://jsonplaceholder.typicode.com/photos" />
        </div>
    );
};

export default Photo;
