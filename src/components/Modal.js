import React from 'react'
import ReactDOM from 'react-dom'

const Modal = () => {
    return ReactDOM.createPortal(
        <div className="modal fade" id="notries" tabIndex="-1" aria-labelledby="notriesLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="notriesLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Sorry, we've reach the maximum number of retrievals for today (50 max). Please come try again
                        tomorrow!
                </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>, document.querySelector('#modal')
    )
}

export default Modal;