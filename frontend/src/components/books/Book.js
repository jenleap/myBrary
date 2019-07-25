import React from 'react';

export default (props) => {
    return(
        /* <div className="row">
            <div className="d-inline-block">
                <img src={props.b.cover} />
            </div>
            <div className="d-inline-block">
                <p className="book-title">{props.b.title}</p>
                <p className="book-authors">{props.b.authors}</p>
            </div>
        </div> */
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-3 d-flex align-items-center">
                    <img src={props.b.cover} className="card-img" alt="..."/>
                </div>
                <div className="col-md-9">
                    <div className="card-body">
                        <h5 className="card-title text-white">{props.b.title}</h5>
                        <p className="card-text text-white">{props.b.authors}</p>
                        { props.children }
                    </div>
                </div>
            </div>
        </div>
    );
};