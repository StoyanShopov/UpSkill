import React from 'react';
import DashboardOverview from './DashboardOverview/DashboardOverview';
import ClientsChart from './ClientsChart/ClientsChart';
import RevenueChart from './RevenueChart/Revenue';
import Test from '../../../services/test';

function Dashboard() {
    return (
      <>
        <div className="content-wrapper">
          <div className="main-content">
            <DashboardOverview />
            <ClientsChart />
            <RevenueChart />
            <Test/>
          </div>
        </div>
      </>
    );
}

export default Dashboard;