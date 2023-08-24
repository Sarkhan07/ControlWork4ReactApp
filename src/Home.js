import React from 'react';
import GetDataFromUrl from './GetDataFromUrl';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the Home Page</p>
            <GetDataFromUrl
                url="https://jsonplaceholder.typicode.com/posts"
                fieldsToShow={['title', 'body']}
            />
        </div>
    );
};

export default Home;
