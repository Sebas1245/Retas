import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from './Button';

type PropTypes = {
    show: boolean,
    modalTitle: string,
    modalBody: string,
    dismissButtonAction: Function
}

export default function InfoModal({show, modalTitle, modalBody, dismissButtonAction} : PropTypes) {
    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{modalBody}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                btnType={'button'} 
                btnText={'Aceptar'}
                className={"btn-success fw-bold rounded-pill"}
                onClick={() => dismissButtonAction()} />
            </Modal.Footer>
        </Modal>
    )
}