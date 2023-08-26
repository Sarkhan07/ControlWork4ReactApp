import React from 'react';
import GetDataFromUrl from './GetDataFromUrl';

const Home = () => {
    const fieldsToShow = ['title', 'body'];
    const modalFieldsToShow = ['title', 'body'];
    return (
        <div>
            <h1>Article</h1>
            <GetDataFromUrl
                url="https://jsonplaceholder.typicode.com/posts"
                fieldsToShow={fieldsToShow}
                modalFieldsToShow={modalFieldsToShow}
                currentPage="home"
            />
        </div>
    );
};

export default Home;
