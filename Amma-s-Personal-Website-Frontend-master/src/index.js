import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './app/store';
import "./index.css"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ReactQueryProvider } from './react_query';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <ReactQueryProvider>
      <App/>
    </ReactQueryProvider>
      </BrowserRouter> 
    </Provider>
    
    
  </React.StrictMode>
);


reportWebVitals();
