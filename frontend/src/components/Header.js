import React from 'react';
import logo from '../logo.svg';

const Header = ({ appIntro }) => (
  <div>
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Readable</h2>
    </div>
    <p className="App-intro">
      { appIntro }
    </p>
  </div>
);

export default Header;