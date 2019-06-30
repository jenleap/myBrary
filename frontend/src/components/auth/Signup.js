import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/auth';

class Signup extends Component {
    onSubmit = (formData) => {
        this.props.signup(formData, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return(
            <form className="form-signin custom-card" onSubmit={ handleSubmit(this.onSubmit) }>
                <h1 className="h3 mt-3 mb-3 font-weight-normal">Please register.</h1>

                <fieldset>
                    <label className="sr-only">Username</label>
                    <Field 
                        className="form-control no-bottom-radius"
                        name="username"
                        type="text"
                        component="input"
                        placeholder="Username"
                        autoComplete="none"
                    />
                </fieldset>

                <fieldset>
                    <label className="sr-only">Password</label>
                    <Field 
                        className="form-control no-top-radius mb-5" 
                        name="password"
                        type="password"
                        component="input"
                        placeholder="Password"
                        autoComplete="none"
                    />
                </fieldset>
                <div>{this.props.errorMessage}</div>
                <button className="btn btn-lg btn-primary btn-block">Sign Up</button>
                <Link className="btn btn-link mt-3" to="/signin">Sign In</Link>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.errorMessage
    };
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: 'signup' })
)(Signup);