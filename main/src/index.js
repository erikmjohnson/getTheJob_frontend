import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import './styles/main.scss';

import createApplicationStore from './createstore/create-store';

const store = createApplicationStore();

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

export default store;
