import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions/auth';

class Signin extends Component {
    onSubmit = (formData) => {
        this.props.signin(formData, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return(
            <form className="form-signin custom-card col-sm-12" onSubmit={ handleSubmit(this.onSubmit) }>
                <h1 className="h3 mt-3 mb-3 font-weight-normal text-white">Please sign in.</h1>

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
                <button className="btn btn-lg btn-light btn-block">Sign In</button>
                <Link className="btn btn-link mt-3 text-white" to="/signup">Sign Up</Link>
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
    reduxForm({ form: 'signin' })
)(Signin);