import React, { useEffect, useState } from 'react';
import { setData } from './Action'; // Импортируйте действия из соответствующего файла
import Store from './Store';
import Modal from './Modal'; // Подразумевается, что у вас есть компонент Modal

const GetDataFromUrl = ({ url, fieldsToShow, modalFieldsToShow }) => {
    const [loading, setLoading] = useState(true);
    const [cardRow, setCardRow] = useState(3);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);
    const data = Store.getState().data;
    const [adding, setAdding] = useState(false);
    const [newItem, setNewItem] = useState({
        [fieldsToShow[0]]: '',
        [fieldsToShow[1]]: '',
    });

    const addArticle = () => {
        setAdding(true);
    };

    const createItem = () => {
        setNewItem({
            [fieldsToShow[0]]: '',
            [fieldsToShow[1]]: '',
        });
        setAdding(false);
    };

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

    const closeModal = () => {
        setSelectedItem(null);
    };

    const editClick = (item) => {
        setEditingItem(item);
    };

    const updateClick = (updatedItem) => {
        const updatedData = data.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
        );
        Store.dispatch(setData(updatedData));

        setEditingItem(null);
    };

    const changeColor = (item) => {
        const colors = ['bg-primary', 'bg-danger', 'bg-success'];
        const randomColorClass =
            colors[Math.floor(Math.random() * colors.length)];
        item.colorClass = randomColorClass;
        setCardRow(cardRow + 1);
    };

    const deleteClick = (item) => {
        setDeletingItem(item);
    };

    const deleteItem = () => {
        const updatedData = data.filter((item) => item.id !== deletingItem.id);
        Store.dispatch(setData(updatedData));
        setDeletingItem(null);
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

            <div className="d-flex justify-content-end mb-2">
                <button className="btn btn-success mr-2" onClick={addArticle}>
                    Add Article
                </button>
            </div>

            {adding && (
                <div>
                    <input
                        type="text"
                        placeholder={fieldsToShow[0]}
                        value={newItem[fieldsToShow[0]]}
                        onChange={(e) =>
                            setNewItem({
                                ...newItem,
                                [fieldsToShow[0]]: e.target.value,
                            })
                        }
                    />
                    <input
                        type="text"
                        placeholder={fieldsToShow[1]}
                        value={newItem[fieldsToShow[1]]}
                        onChange={(e) =>
                            setNewItem({
                                ...newItem,
                                [fieldsToShow[1]]: e.target.value,
                            })
                        }
                    />
                    <button className="btn btn-success" onClick={createItem}>
                        Create
                    </button>
                </div>
            )}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="row">
                    {data.map((item) => (
                        <div key={item.id} className={cardColumns}>
                            <div className={`card mb-4 ${item.colorClass}`}>
                                <div className="card-body">
                                    <strong>
                                        <h2>{item[fieldsToShow[0]]}</h2>
                                    </strong>
                                    <p>{item[fieldsToShow[1]]}</p>

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

                                    <button
                                        className="btn btn-warning mr-2"
                                        onClick={() => editClick(item)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteClick(item)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal
                title="Подробная информация"
                isOpen={selectedItem !== null}
                onClose={closeModal}
            >
                {modalFieldsToShow.map((field) => (
                    <div key={field}>
                        <h4>{field}</h4>
                        <p>{selectedItem ? selectedItem[field] : ''}</p>
                    </div>
                ))}
            </Modal>

            <Modal
                title="Редактирование"
                isOpen={editingItem !== null}
                onClose={() => setEditingItem(null)}
            >
                {editingItem && (
                    <div>
                        <input
                            type="text"
                            value={editingItem[fieldsToShow[0]]}
                            onChange={(e) =>
                                setEditingItem({
                                    ...editingItem,
                                    [fieldsToShow[0]]: e.target.value,
                                })
                            }
                        />
                        <input
                            type="text"
                            value={editingItem[fieldsToShow[1]]}
                            onChange={(e) =>
                                setEditingItem({
                                    ...editingItem,
                                    [fieldsToShow[1]]: e.target.value,
                                })
                            }
                        />

                        <button
                            className="btn btn-primary"
                            onClick={() => updateClick(editingItem)}
                        >
                            Update
                        </button>
                    </div>
                )}
            </Modal>

            {deletingItem && (
                <Modal
                    title="Удаление записи"
                    isOpen={deletingItem !== null}
                    onClose={() => setDeletingItem(null)}
                >
                    <p>Do you really want to delete this card?</p>
                    <button className="btn btn-danger" onClick={deleteItem}>
                        Yes
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setDeletingItem(null)}
                    >
                        No
                    </button>
                </Modal>
            )}
        </div>
    );
};

export default GetDataFromUrl;
