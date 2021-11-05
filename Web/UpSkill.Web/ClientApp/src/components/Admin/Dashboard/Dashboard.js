import React from 'react';
import DashboardOverview from './DashboardOverview/DashboardOverview';
import ClientsChart from './ClientsChart/ClientsChart';
import RevenueChart from './RevenueChart/Revenue';
import {testGet} from '../../../services/test';
import { useEffect, useState } from "react";

function Dashboard() {

  const [aggregateInformation, setAggregateInformation ] = useState({});

    useEffect(() => {
      testGet().then((response) => 
      {
        setAggregateInformation(response.data);
        console.log('render');
      })
    }, [])
    
    return (
      <>
        <div className="content-wrapper">
          <div className="main-content">
            <DashboardOverview clientsCount={aggregateInformation.clientsCount} revenue={aggregateInformation.revenue} coursesCount={aggregateInformation.coursesCount} coachesCount={aggregateInformation.coachesCount}/>
            <ClientsChart clientsMonths={aggregateInformation.clientsCountInMonths}/>
            <RevenueChart />
          </div>
        </div>
      </>
    );
}

export default Dashboard;