import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// Prevents browser to refresh everytime something changes
if (module.hot) {
    module.hot.accept();
}

// Let's comment this out for now...
// registerServiceWorker();
