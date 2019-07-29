import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return(
        <div className="mt-5 text-center">
            <h1 className="text-white">myBrary</h1>
            <p className="lead mb-5 text-white">Manage your books online.</p>
            <div className="text-center">
                <Link className="btn btn-light btn-lg mr-2" to="/signup">Sign Up</Link>
                <button className="btn btn-outline-light btn-lg">Learn more</button>
            </div>
        </div>
    );
};