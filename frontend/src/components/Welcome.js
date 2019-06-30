import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return(
        <div class="mt-5 text-center">
            <h1>myBrary</h1>
            <p class="lead mb-5">Manage your books online.</p>
            <div class="text-center">
                <Link class="btn btn-primary btn-lg mr-2" to="/signup">Sign Up</Link>
                <button class="btn btn-outline-primary btn-lg">Learn more</button>
            </div>
        </div>
    );
};