import React from 'react';

import Backdrop from './Backdrop';

const Modal = (props) => (
    <div>
        <Backdrop show={props.show} />
        <div 
            className="modal-container custom-card"
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </div>
);

export default Modal;