import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
    renderLinks() {
        if (this.props.authenticated) {
            return (
                <div className="collapse navbar-collapse" id="navbarColor03">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>
                    <Link to="/signout" className="btn btn-primary my-2 my-sm-0">Sign Out</Link>
                </div>
            )
        } else {
            return (
                <div className="collapse navbar-collapse" id="navbarColor03">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                    <Link to="/signin" className="btn btn-primary my-2 my-sm-0">Sign In</Link>
                </div>
            )
        }
    }

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand"to="/">myBrary</Link>
                {this.renderLinks()}
            </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(Header);