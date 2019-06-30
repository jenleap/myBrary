import React from 'react';
import Header from './components/common/Header';

export default ({ children }) => {
    return (
      <div className="App">
        <Header />
        <div className="container">
          { children }
        </div>
      </div>
    );
  };

