import React, {useEffect, useState} from 'react';
import CategoriesAndLanguageMenu from '../CategoriesAndLanguageMenu/categoryAndLanguageMenu';
import CoachesCatalog from '../Coaches/CoachesCatalog/CoachesCatalog';

import './Coaches.css';

import { getCoaches } from '../../services/coachService';

export default function Coaches() {
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    getCoaches(0).then((coaches) => {
      setCoaches(coaches);
    });
  }, []);

  return (
    <div className="content">
      <CategoriesAndLanguageMenu atPage="Coaches" />
      <div className="wrapper row">

         <CoachesCatalog coaches={coaches}/>
      
      </div>
    </div>
  );
}
