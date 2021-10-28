import React from 'react';
import DashboardOverview from './DashboardOverview/DashboardOverview';
import ClientsChart from './ClientsChart/ClientsChart';
import RevenueChart from './RevenueChart/Revenue';

function Dashboard() {
    return (
      <>
        <div className="content-wrapper">
          <div className="main-content">
            <DashboardOverview />
            <ClientsChart />
            <RevenueChart />
          </div>
        </div>
      </>
    );
}

export default Dashboard;