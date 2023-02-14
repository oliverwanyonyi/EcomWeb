import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom"
import './index.css';
import './bootstrap-grid.css'
import AppProvider from './Store/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AppProvider>
      <App />
      </AppProvider>
    </Router>
  </React.StrictMode>
);


