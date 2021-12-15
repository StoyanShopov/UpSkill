import React, {useEffect, useState} from 'react';
import ClientEmailInfo from './ClientsEmailInfo/ClientEmailInfo';
import AddClientPopup from './AddClient/AddClient';

import '../../MyProfile/CompanyOwnerViews/Employees/Employees.css';


export default function Clients() {
  const [addClientPopup, setAddClientPopup] = useState(false);
  
  return (
      <div className="content w-100 main-content">
          <ClientEmailInfo onAddClient={setAddClientPopup} />
          <AddClientPopup trigger={addClientPopup} onAddClient={setAddClientPopup}/>   
      </div>
    );
  }

