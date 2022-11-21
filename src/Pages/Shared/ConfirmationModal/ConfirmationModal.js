import React from 'react';

const ConfirmationModal = ({ title, massage, closeModal, successAction, modalData }) => {
    return (
        <div>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-semibold text-lg">{title}</h3>
                    <p className="py-4">{massage}</p>
                    <div className="modal-action">
                        <button onClick={() => successAction(modalData)} className="btn btn-error">Delete</button>
                        <button onClick={closeModal} className="btn btn-outline btn-primary">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;