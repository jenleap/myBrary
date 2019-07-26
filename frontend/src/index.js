import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

import Signup from './components/auth/Signup';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';
import Main from './components/Main';
import Search from './components/books/Search';
import ListPage from './components/lists/ListPage';
import Dashboard from './components/Dashboard';

const store = createStore(
    reducers,
    { auth: { authenticated: localStorage.getItem('token') }},
    applyMiddleware(reduxThunk)
);

ReactDOM.render(
    <Provider store={ store }>
        <BrowserRouter basename="/mybrary/">
            <App>
                <Route path='/' exact component={ Main } />
                <Route path='/signup' component={ Signup } />
                <Route path='/signout' component={ Signout } />
                <Route path='/signin' component={ Signin } />
                <Route path='/search' component={ Search } />
                <Route path='/dashboard' component={ Dashboard } />
                <Route path='/list/:listId' component={ ListPage } />
            </App>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();
