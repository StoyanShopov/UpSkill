import React from 'react';
import CategoriesAndLanguageMenu from '../CategoriesAndLanguageMenu/categoryAndLanguageMenu';
import CoachList from '../CompanyOwnerViews/CompanyCoaches/CompanyCoaches';

import './Coaches.css';


export default function Coaches() {
    return (
      <div className="content">
            <CategoriesAndLanguageMenu atPage="Coaches"/>
            < CoachList />
      </div>
    );
  }