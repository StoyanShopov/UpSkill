import React from 'react';
import CategoriesAndLanguageMenu from '../CategoriesAndLanguageMenu/categoryAndLanguageMenu';
import CoachesCatalog from '../Coaches/CoachesCatalog/CoachesCatalog';

import './Coaches.css';


export default function Coaches() {
  return (
    <div className="content">
      <CategoriesAndLanguageMenu atPage="Coaches" />
      <div className="wrapper row">

         <CoachesCatalog/>
      
      </div>
    </div>
  );
}
