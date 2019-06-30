import React from 'react';

const ConfirmDialog = (props) => (
    <div>
        <p>{props.confirmMessage}</p>
        <button type="button" className="btn btn-secondary mr-4" onClick={props.confirmAction}>Confirm</button>
        <button type="button" className="btn btn-outline-secondary" onClick={props.cancelAction}>Cancel</button>
    </div>
);

export default ConfirmDialog;