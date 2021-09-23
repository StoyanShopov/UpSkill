import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import IdentityContext from './Context/IdentityContext';
import CompanyOwnerSidebar from './components/CompanyOwnerViews/CompanyOwnerSidebar/CopmanyOwnerSidebar';
import CompanyCoaches from './components/CompanyOwnerViews/CompanyCoaches/CompanyCoaches';
import CoursesCard from './components/CoursesCard/CoursesCard';
import EmployeesPositionCard from './components/EmployeesPositionCard/EmployeesPositionCard';

function App() {
  const [user, setUser] = useState({});
  return (
    <IdentityContext.Provider value={{ user, setUser }}>
      <>
        <CoursesCard></CoursesCard>
        <EmployeesPositionCard></EmployeesPositionCard>
      </>
    </IdentityContext.Provider>
  );
}

export default App;
