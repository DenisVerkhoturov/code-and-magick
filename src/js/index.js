import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Main from './components/Main';

ReactDOM.render(<Header />, document.querySelector('div.demo'));
ReactDOM.render(<Main />, document.querySelector('main'));
