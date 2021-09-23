import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import IdentityContext from './Context/IdentityContext';
import CompanyOwnerSidebar from './components/CompanyOwnerViews/CompanyOwnerSidebar/CopmanyOwnerSidebar'
import CompanyCoaches from './components/CompanyOwnerViews/CompanyCoaches/CompanyCoaches'

function App() {
  const [user, setUser] = useState({});
  return (
    <IdentityContext.Provider value={{ user, setUser }}>
      <>



      </>
    </IdentityContext.Provider >
  );
}

export default App;
