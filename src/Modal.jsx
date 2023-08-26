import React from 'react';

const Modal = ({ title, isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="modal"
            style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="close"
                            onClick={onClose}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
