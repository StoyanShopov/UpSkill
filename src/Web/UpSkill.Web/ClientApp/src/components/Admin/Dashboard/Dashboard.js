import React from "react";
import DashboardOverview from "./DashboardOverview/DashboardOverview";
import ClientsChart from "./ClientsChart/ClientsChart";
import RevenueChart from "./RevenueChart/Revenue";
import { adminDashboardGet } from "../../../services/adminDashboardService";
import { useEffect, useState } from "react";

function Dashboard() {
  const [aggregateInformation, setAggregateInformation] = useState({});

  useEffect(() => {
    adminDashboardGet().then((response) => {
      if (response) {
        setAggregateInformation(response);
      }
    });
  }, []);

  return (
    <>
      <div className="content-wrapper">
        <div className="main-content">
          <DashboardOverview
            clientsCount={aggregateInformation.clientsCount}
            revenue={aggregateInformation.revenue}
            coursesCount={aggregateInformation.coursesCount}
            coachesCount={aggregateInformation.coachesCount}
          />
          <ClientsChart
            clientsCountInMonths={aggregateInformation.clientsCountInMonths}
          />
          <RevenueChart />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
