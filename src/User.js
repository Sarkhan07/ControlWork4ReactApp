import React from 'react';
import GetDataFromUrl from './GetDataFromUrl';

const User = () => {
    const fieldsToShow = ['name', 'email'];
    const modalFieldsToShow = ['name', 'email'];
    return (
        <div>
            <h1>User</h1>
            <GetDataFromUrl
                url="https://jsonplaceholder.typicode.com/users"
                fieldsToShow={fieldsToShow}
                modalFieldsToShow={modalFieldsToShow}
                currentPage="user"
            />
        </div>
    );
};

export default User;
