import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const modal = (props) => {
    return (
        <React.Fragment>
            <Modal show={props.delete} onHide={props.cancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this status?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.cancelDelete}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default modal