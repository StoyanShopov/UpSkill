import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import GA4React from 'ga-4-react'

import i18n, { use } from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(initReactI18next)
use(LanguageDetector)
use(HttpApi)
  .init({
    fallbackLng: "en",
    detection: {
      order: ['cookie', 'querystring', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json'
    },
    react: {
      useSuspense: false
    }
  });
function App() {
  const { t } = useTranslation();
  return <h2>{t('welcome_to_react')}</h2>;
}
const ga4react = new GA4React('G-P8BE6XL524');

(async _ => {
  await ga4react.initialize()
    .then(res => console.log("Analytics success."))
    .catch(err => console.log("Analytics failure."))
    .finally(() => {
      ReactDOM.render(
        <Router >
          <App />
        </ Router>,
        document.getElementById('root')
      );
    })
})();

reportWebVitals();
