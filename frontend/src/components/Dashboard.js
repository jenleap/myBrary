import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBooks, readBook, finishBook, removeBook } from '../actions/books';
import { addBooktoList } from '../actions/lists';

import Book from './books/Book';
import SideNav from './common/SideNav';
import Modal from './common/Modal';
import ConfirmDialog from './common/ConfirmDialog';

class Dashboard extends Component {

    state = {
        showRemove: false
    }


    componentWillMount() {
        this.props.getBooks(this.props.token);
    } 

    componentDidMount() {
        console.log(this.props.books);
    }

    toggleLists = (e) => {
        //console.log(e.target);
        //console.log(e.target.nextSibling);
        if (e.target.nextSibling.classList.contains("hidden")) {
            e.target.nextSibling.classList.remove("hidden");
        } else {
            e.target.nextSibling.classList.add("hidden");
        }
        
    }

    onAddBooktoList = (listId, bookId) => {
        this.props.addBooktoList(listId, bookId, this.props.token, () => {
            this.props.history.push(`/list/${listId}`);
        })
    }

    onReadBook = (bookId) => {
        this.props.readBook(bookId, this.props.token);
    }

    onFinishBook = (bookId, finishState) => {
        this.props.finishBook(bookId, finishState, this.props.token);
    }

    toggleModal = () => {
        this.setState({ showRemove: !this.state.showRemove });
    }

    onRemove = (bookId) => {
        this.props.removeBook(bookId, this.props.token);
        this.toggleModal();
    }

    render() {
        return (
            <div className="container row">
                
                <SideNav />
                <div className="col-md-9 col-12 mt-4">
                    {(this.props.reading.length > 0) ? (
                        <div className="bg-overlay p-3">
                            <h5 className="text-white">Currently Reading</h5>
                            <hr />
                            <div className="d-flex">
                            {this.props.reading.map(b => (
                                <div className="col-md-3 col-12">
                                    <img className="w-100" src={b.cover} />
                                    <div className="dropdown mt-1">
                                        <div className="dropdown-toggle btn btn-outline-light w-100" onClick={this.toggleLists}>Update</div>
                                        <ul className="dropdown-menu hidden" id="d-menu">
                                            <li className="dropdown-item" onClick={() => this.onFinishBook(b._id, "finish")}>Finish</li>
                                            <li className="dropdown-item" onClick={() => this.onFinishBook(b._id, "DNF")}>DNF</li>
                                        </ul>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                    ) : null}
                    <div className="bg-overlay p-3 mt-3">
                        <div className="d-flex justify-content-between mb-2">
                            <h5 className="text-white">Full Library</h5>
                            <Link to="/search" className="btn btn-dark float-right">
                                <span className="mobile-hide">Add Book</span>
                                <i class="fas fa-plus ml-md-2"></i>
                            </Link>
                        </div>

                    {(this.props.books.length > 0) ? (
                        this.props.books.map(b => (
                            <div className="book-div">
                                <Modal show={this.state.showRemove} >
                                    <ConfirmDialog 
                                        confirmMessage="Are you sure you want to remove this book?"
                                        confirmAction={() => this.onRemove(b._id)}
                                        cancelAction={this.toggleModal}
                                    />
                                </Modal>
                                <div className="close-button" onClick={this.toggleModal}>
                                    <i className="fas fa-times"></i>
                                </div>
                                <Book b={b}>
                                    <div className="row">
                                        <div className="dropdown col">
                                            <div className="dropdown-toggle btn btn-outline-light" onClick={this.toggleLists}>Add to List...</div>
                                            <ul className="dropdown-menu hidden" id="d-menu">
                                                {this.props.lists.map((l) => (
                                                    <li className="dropdown-item" onClick={() => this.onAddBooktoList(l._id, b._id)}>{l.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        {(b.currentlyReading) ? (
                                            <span className="reading-tag col text-center">Currently Reading</span>
                                        ) : (
                                            <button className="btn btn-outline-light col mt-md-0 mt-2" onClick={() => this.onReadBook(b._id)}>Mark as Reading</button>
                                        )}
                                        
                                    </div>
                                    
                                </Book>
                                
                            </div>
                        ))
                    ) : (
                        <h4 className="text-white">No books added.</h4>
                    )}
                    </div>
                </div>
            </div>
            
        )
    }
}


function mapStateToProps(state) {
    return {
        token: state.auth.authenticated,
        books: state.books.books,
        lists: state.lists,
        reading: state.books.reading
    };
}

export default connect(mapStateToProps, { getBooks, readBook, finishBook, addBooktoList, removeBook })(Dashboard);