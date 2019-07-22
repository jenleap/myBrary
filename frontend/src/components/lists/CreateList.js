import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createList } from '../../actions/lists';

class CreateList extends Component {

    state = {
        input: ""
    }

    handleChange = (e) => {
        this.setState({ input: e.target.value });
    }

    createList = () => {
        this.props.createList(this.state.input, this.props.token);
        this.setState({ input: ""});
        this.props.closeModal();
    }


  render() {
    return (
            <div className="container">
                <input className="form-control mr-sm-2" type="text" placeholder="List name" value={this.state.input} onChange={this.handleChange} />
                <button className="btn btn-outline-secondary my-2 my-sm-0" onClick={this.createList}>Create List</button>
                <button className="btn btn-outline-secondary my-2 my-sm-0" onClick={this.props.closeModal}>Cancel</button>
            </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        token: state.auth.authenticated
    }
}

export default connect(mapStateToProps, { createList })(CreateList);