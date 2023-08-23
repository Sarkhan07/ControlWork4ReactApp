import React from 'react';
import GetDataFromUrl from './GetDataFromUrl';

const User = () => {
    return (
        <div>
            <h1>User</h1>
            <p>This is the User Page</p>
            <GetDataFromUrl url="https://jsonplaceholder.typicode.com/users" />
        </div>
    );
};

export default User;
