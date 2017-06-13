import React from 'react';
import ReactDOM from 'react-dom';
import { Tabs } from './tabs';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Tabs />, document.getElementById('root'));
registerServiceWorker();
