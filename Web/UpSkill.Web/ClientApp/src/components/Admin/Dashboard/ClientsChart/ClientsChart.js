import {Line} from 'react-chartjs-2'
import "./ClientsChart.css";
import "../RevenueChart/Revenue.css";
import {useState, useEffect} from 'react';

export default function ClientsChart(props) {

  const thisMonths = props.clientsCountInMonths && props.clientsCountInMonths.map(c => c.month);
  const thisClients = props.clientsCountInMonths && props.clientsCountInMonths.map(c => c.clientsCount);
  
    const data = {
        labels: thisMonths,
        datasets: [
          {
            label: "",
            data: thisClients,
            fill: false,
            backgroundColor: "#6293FC",
            borderColor: "#3F7BFB",
            tension: 0.1,
          },
        ]
    }

    const options = {
      plugins: { legend: { display: false } },
      scales: {
        y: {
           max: 75,
           min: 0,
           ticks: {
              stepSize: 15
           }
        }
     }
    };

    return (
      
      <div className="media-query">      
        <div className="container-lg container-clients clients-color">
          Number of clients
        </div>       
        <div className="chart-container">
          <Line data={data} options={options} />
        </div>
      </div>
    );
}