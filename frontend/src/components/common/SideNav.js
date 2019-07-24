import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getLists } from '../../actions/lists';

import Modal from '../common/Modal';
import CreateList from '../lists/CreateList';

class SideNav extends Component {

  state = {
      createListModal: false
  }

  componentWillMount() {
      this.props.getLists(this.props.token);
  }

  toggleModal = () => {
      this.setState({ createListModal: !this.state.createListModal });
  }


  render() {
    return (
            <div className="container col-3 mt-4">
                <Modal show={this.state.createListModal} >
                   <CreateList closeModal={this.toggleModal} />
                </Modal>
                <ul className="list-group">
                {this.props.lists.map((l) => (
                    <li className="list-group-item"><Link to={`/list/${l._id}`}>{l.name}</Link></li>
                ))}
                </ul>
                <button to="/search" className="btn btn-dark mt-2 create-list-button" onClick={this.toggleModal}>
                    Create List
                    <i class="fas fa-plus ml-2"></i>
                </button>
            </div>

    );
  }
}

function mapStateToProps(state) {
    return {
        token: state.auth.authenticated,
        lists: state.lists
    }
}

export default connect(mapStateToProps, { getLists })(SideNav);