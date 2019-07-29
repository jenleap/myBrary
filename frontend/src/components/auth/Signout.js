import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

class Signout extends Component {
    componentDidMount() {
        this.props.signout();
        setTimeout(() => this.props.history.push('/'), 2000);
    }

    render() {
        return (
        <div>
            <h3 className="mt-5 text-white text-center">You are now logged out.</h3>   
        </div>
        )
    }
}

export default connect(null, actions)(Signout);