import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addBook } from '../../actions/books';
import { searchBooksDb } from '../../util/search';

import Book from './Book';

class Search extends Component {

    state = {
        query: '',
        books: [],
        message: ''
    }

    componentWillMount() {
        
    } 

    handleChange = (e) => {
        this.setState({ query: e.target.value});
    }

    searchBooks(e) {
        e.preventDefault();
        searchBooksDb(this.state.query, (books) => {
            this.setState({ books });
            if (books.length < 1) {
                this.setState({ message: `No books found for ${this.state.query}`})
            } else {
                this.setState({ message: `Results for ${this.state.query}`})
            }
            this.setState({query: ""});
        });

    }

    addBook = (bookData) => {
        this.props.addBook(bookData, this.props.token, () => {
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <div className="container">
                <div className="">
                    <form className="form-inline mt-2" onSubmit={this.searchBooks.bind(this)}>
                        <input className="form-control mr-sm-2" type="text" placeholder="Search..." value={this.state.query} onChange={this.handleChange} />
                        <button className="btn btn-outline-light my-2 my-sm-0" type="submit">
                            <i className="fas fa-search" style={{color: 'white'}}></i>
                        </button>
                    </form>
                </div>
                <div>
                    <h4 className="text-white mt-4">{this.state.message}</h4>
                    {(this.state.books.length > 0) ? (
                        <div className="bg-overlay col-md-9 col-12 mt-3 p-3">
                        {this.state.books.map(b => (
                            <div className="book-div">
                                <Book b={b}>
                                <button type="button" class="btn btn-outline-light btn-sm" onClick={() => this.addBook(b)}>Add to Library</button>
                                </Book>
                            </div>
                        ) 
                        )}
                        </div>
                    ) : null}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        token: state.auth.authenticated
    };
}

export default connect(mapStateToProps, { addBook })(Search);
