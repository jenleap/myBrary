import React from 'react';

const Backdrop = (props) => (
    props.show ? <div className="backdrop"></div> : null
);

export default Backdrop;