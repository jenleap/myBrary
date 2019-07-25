import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getList, removeBookFromList, renameList, deleteList } from '../../actions/lists';

import SideNav from '../common/SideNav';
import Book from '../books/Book';
import Modal from '../common/Modal';
import ConfirmDialog from '../common/ConfirmDialog';
import SettingsDropdown from '../common/SettingsDropdown';

class ListPage extends Component {

    state = {
        showRemove: false,
        showDelete: false,
        editName: false,
        inputName: '',
        showDeleteList: false
    }

    componentWillMount() {
        const listId = this.props.match.params.listId;
        this.props.getList(listId, this.props.token, (list) => {
            this.setState({ inputName: list.name });
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        console.log(nextProps.match.params.listId);
        this.props.getList(nextProps.match.params.listId, this.props.token, (list) => {
            this.setState({ inputName: list.name });
        });
    }

    toggleModal = () => {
        this.setState({ showRemove: !this.state.showRemove });
    }

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    }
    toggleDeleteList = () => {
        this.setState({ showDeleteList: !this.state.deleteList });
    }

    onRemoveFromList = (bookId) => {
        this.props.removeBookFromList(this.props.currentList._id, bookId, this.props.token);
        this.toggleModal();
    }

    renameList = () => {
        this.setState({ editName: !this.state.editName });
    }

    handleChange = (e) => {
        this.setState({ inputName: e.target.value });
    }

    saveName = () => {
        this.props.renameList(this.props.currentList._id, this.state.inputName, this.props.token);
        this.renameList();
    }

    onDeleteList = () => {
        this.props.deleteList(this.props.currentList._id, this.props.token, () => {
            this.props.history.push('/');
        })
    }


  render() {
    return (
            <div className="container row bg-overlay">
                <Modal show={this.state.showDeleteList} >
                    <ConfirmDialog 
                        confirmMessage="Are you sure you want to delete this list?"
                        confirmAction={this.onDeleteList}
                        cancelAction={this.toggleDeleteList}
                    />
                </Modal>
                <SideNav />
                <div className="col-9 bg-overlay mt-4">
                <div className="d-flex justify-content-between">
                    {(this.state.editName) ? (
                        <div className="input-group mb-3 mt-3">
                            <input type="text" className="form-control" value={this.state.inputName} onChange={this.handleChange} />
                            <div className="input-group-append">
                                <span title="Save" className="input-group-text btn" onClick={this.saveName}>
                                    <i className="fas fa-save"></i>
                                </span>
                            </div>
                        </div>
                    ) : (
                        <h1 className="text-white">{this.props.currentList.name}</h1>
                    )}
                    
                    <SettingsDropdown 
                        size="2" 
                        additionalStyles="float-left ml-5 mt-3"
                        listActions={[
                            {
                                title: "Rename",
                                action: this.renameList
                            },
                            {
                                title: "Delete",
                                action: this.toggleDeleteList
                            }
                        ]}
                    />
                </div>
                
                {(this.props.currentList.books) ? (
                    this.props.currentList.books.map((b) => (
                        <div class="book-div">
                            <Modal show={this.state.showRemove} >
                                <ConfirmDialog 
                                    confirmMessage="Are you sure you want to remove the book from this list?"
                                    confirmAction={() => this.onRemoveFromList(b._id)}
                                    cancelAction={this.toggleModal}
                                />
                            </Modal>
                                <div className="close-button" onClick={this.toggleModal}>
                                    <i className="fas fa-times"></i>
                                </div>
                            <Book b={b}>     
                                {(b.currentlyReading) ? (
                                    <span className="reading-tag">Currently Reading</span>
                                ) : (
                                    <button className="btn btn-outline-light col" onClick={() => this.onReadBook(b._id)}>Mark as Reading</button>
                                )}
                            </Book>
                        </div>
                    ))
                ) : (
                    <h1>No books in this list.</h1>
                )}      
            </div>
            </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        token: state.auth.authenticated,
        currentList: state.currentList
    }
}

export default connect(mapStateToProps, { getList, removeBookFromList, renameList, deleteList })(ListPage);