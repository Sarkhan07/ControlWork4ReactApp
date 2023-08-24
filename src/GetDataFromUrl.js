import React, { useEffect, useState } from 'react';
import { setData } from './Action';
import Store from './Store';

const GetDataFromUrl = ({ url, fieldsToShow }) => {
    const [loading, setLoading] = useState(true);
    const [cardRow, setCardRow] = useState(3);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const data = Store.getState().data;

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                Store.dispatch(setData(data));
                setLoading(false);
            })
            .catch((error) => {
                console.log('error during getting data', error);
                setLoading(false);
            });
    }, [url]);

    const cardColumns = cardRow === 3 ? 'col-md-4' : 'col-md-6';

    const viewClick = (item) => {
        setSelectedItem(item);
    };

    const closeModal = (item) => {
        setSelectedItem(item);
    };

    const changeColor = (item) => {
        const colors = ['bg-primary', 'bg-danger', 'bg-success'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        item.color = randomColor;
        setCardRow(cardRow);
    };

    const editClick = (item) => {
        setEditingItem(item);
    };
    return (
        <div>
            <div className="d-flex justify-content-end mb-2">
                <button
                    className="btn btn-primary"
                    onClick={() => setCardRow(cardRow === 3 ? 2 : 3)}
                >
                    {cardRow === 3 ? 'Make small cards' : 'Make big cards'}
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="row">
                    {data.map((item) => (
                        <div key={item.id} className={cardColumns}>
                            <div className={`card mb-4 bg-${item.color}`}>
                                <div className="card-body">
                                    {fieldsToShow.map((field) => (
                                        <div key={field}>
                                            <strong>
                                                <h2>{item[field]}</h2>
                                            </strong>
                                            <p>{item[field]}</p>
                                        </div>
                                    ))}
                                    <button
                                        className="btn btn-primary mr-2"
                                        onClick={() => viewClick(item)}
                                    >
                                        View
                                    </button>

                                    <button
                                        className="btn btn-success mr-2"
                                        onClick={() => changeColor(item)}
                                    >
                                        Change Color
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    {
        selectedItem && (
            <div
                className="modal"
                style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
                <div className="modal-dialog">
                    <div className="modal-header">
                        <h5 className="modal-title">Подробная информация</h5>
                        <button
                            type="button"
                            className="close"
                            onClick={closeModal}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        {fieldsToShow.map((field) => (
                            <div key={field}>
                                <h4>{field}</h4>
                                <p>{selectedItem[field]}</p>
                            </div>
                        ))}
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={closeModal}
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default GetDataFromUrl;
