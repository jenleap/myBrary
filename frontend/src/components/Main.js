import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Dashboard from './Dashboard';
import Welcome from './Welcome';

class Main extends Component {

    componentWillMount() {
        
    } 

    render() {
        return (
            <div className="container">
                {(!this.props.token) ? (
                    <Welcome />
                ) : (
                    <Dashboard history={this.props.history} />
                )}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        token: state.auth.authenticated,
    };
}

export default connect(mapStateToProps, { })(Main);