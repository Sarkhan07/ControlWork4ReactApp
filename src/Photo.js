// Photo.js

import React from 'react';
import GetDataFromUrl from './GetDataFromUrl';

const Photo = () => {
    const fieldsToShow = ['title', 'url'];
    const modalFieldsToShow = ['title', 'url'];
    return (
        <div>
            <h1>Photo</h1>
            <GetDataFromUrl
                url="https://jsonplaceholder.typicode.com/photos"
                fieldsToShow={fieldsToShow}
                modalFieldsToShow={modalFieldsToShow}
                page="photo"
            />
        </div>
    );
};

export default Photo;
