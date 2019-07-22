import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
    renderLinks() {
        if (this.props.authenticated) {
            return (
                <Link to="/signout" className="btn btn-primary my-2 my-sm-0 ml-auto">Sign Out</Link>
            )
        } else {
            return (
                <Link to="/signin" className="btn btn-primary my-2 my-sm-0 ml-auto">Sign In</Link>
            )
        }
    }


  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand"to="/">myBrary</Link>
                <div className="collapse navbar-collapse" id="navbarColor03"> 
                    {this.renderLinks()}
                </div> 
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