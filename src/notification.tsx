import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './notification/App';
import './access/index.scss'
import './notification/index.scss'
import 'windi.css'
import 'src/access/nodespecific'
import { Provider } from 'react-redux'
import store from './main/store'

// import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
     <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>
);

// reportWebVitals();
