import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Dashboard extends Component {

    componentWillMount() {
        
    } 

    render() {
        return (
            <div className="container">
                <h1>Dashboard</h1>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        token: state.auth.authenticated,
    };
}

export default connect(mapStateToProps, { })(Dashboard);