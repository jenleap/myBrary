import React, { Component } from 'react';

class EditBox extends Component {

    state = {
        inputValue: this.props.currentValue
    }

    handleChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    render() {
        return (
            <div>
                <div className="input-group mb-3 mt-3">
                    <input type="text" className="form-control" value={this.state.inputValue} onChange={this.handleChange} />
                    <div className="input-group-append">
                        <span title="Save" className="input-group-text btn" onClick={() => this.props.saveAction(this.state.inputValue)}>
                            <i className="fas fa-save"></i>
                        </span>
                    </div>
                </div>
            </div>
        )

    }
}

export default EditBox;