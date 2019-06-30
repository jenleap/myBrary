import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

class AddBox extends Component {
    onSubmit = (formData) => {
        this.props.addItem(formData);
    }

    render() {
        const { handleSubmit } = this.props;

        return(
            <div className="add-box mt-2 float-right">
                <div
                    className="add-box-child"
                    style={{
                        display: this.props.addMode ? 'none' : 'block',
                        opacity: this.props.addMode ? '0' : '1'
                    }}
                    onClick={this.props.toggleBox}>
                    <i className="fas fa-plus mr-3"></i>
                    <span>Add a {this.props.title}</span>
                </div>

                <form  
                    className="add-box-child"
                    style={{
                        display: this.props.addMode ? 'block' : 'none',
                        opacity: this.props.addMode ? '1' : '0'
                    }}
                    onSubmit={ handleSubmit( this.onSubmit )}>

                    <fieldset className="mb-3">
                        <label className="sr-only">{this.props.title}</label>
                        <Field 
                            className="form-control"
                            name={this.props.property}
                            type="text"
                            component="input"
                            placeholder={`Enter a ${this.props.title} ${this.props.property}`}
                            autoComplete="none"
                        />
                    </fieldset>

                    <button className="btn btn-secondary">Add {this.props.title}</button>
                    <div style={{cursor: 'pointer', display: 'inline', float: 'right'}} onClick={this.props.toggleBox}>
                        <i className="far fa-window-close fa-2x text-muted"></i>
                    </div>

                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        token: state.auth.authenticated,
    };
}

export default compose(
    connect(mapStateToProps),
    reduxForm({ form: 'add-box' })
)(AddBox);