import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import GA4React from 'ga-4-react'
import store from "./store";
import {setup} from "./services/instance";

const ga4react = new GA4React('G-P8BE6XL524');

(async _ => {
  await ga4react.initialize()
  .then(res => console.log("Analytics success."))
  .catch(err => console.log("Analytics failure."))
  .finally(() => {
    ReactDOM.render(
      
        <Router store={store}>
      <App />
      </Router>,
    
      
      document.getElementById('root')
      );    
  })
})();

reportWebVitals();
setup(store);
