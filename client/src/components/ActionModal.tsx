import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from './Button';

type PropTypes = {
    show: boolean,
    modalTitle: string,
    modalBody: string,
    dismissButtonText: string,
    dismissButtonAction: Function,
    saveChangesButtonText: string,
    saveChangesColorClass: string,
    saveChangesAction: Function
}

export default function ActionModal({
    show,
    modalTitle, 
    modalBody, 
    dismissButtonText, 
    dismissButtonAction,
    saveChangesButtonText,
    saveChangesColorClass,
    saveChangesAction} : PropTypes) {
    return (
        <Modal 
        show={show} 
        backdrop="static"
        keyboard={false}>
            <Modal.Header>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{modalBody}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                btnType={'button'} 
                className={'btn-info fw-bold rounded-pill'}
                btnText={dismissButtonText} 
                onClick={() => dismissButtonAction()} />
                <Button 
                btnType={'button'} 
                className={`btn-${saveChangesColorClass} fw-bold rounded-pill `}
                btnText={saveChangesButtonText}  
                onClick={() => saveChangesAction()}              
                 />
            </Modal.Footer>
        </Modal>
    )
}