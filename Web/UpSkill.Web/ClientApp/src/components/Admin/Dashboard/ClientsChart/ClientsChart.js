import {Line} from 'react-chartjs-2'
import "./ClientsChart.css";
import "../RevenueChart/Revenue.css";
import {useState, useEffect} from 'react';

export default function ClientsChart(props) {
  console.log(props.clientsCountInMonths);

  const [months, setMonths ] = useState(0);
  const [clients, setClients] = useState(0);

  // function getMonths() {
  //   const months = props.clientsCountInMonths.map(clientsCountInMonth => clientsCountInMonth.month);
  //   setMonths(months); 
  //   return  months;
  // } 

  // function getClientsByMonth() {
  //   const clients = props.clientsMonths.map(
  //     (clientsMonth) => clientsMonth.clientsCount
  //   );
  //   setClients(clients);
  // } 
  
 
  // useEffect(() => {
  //   getMonths()
  //   getClientsByMonth()
  //});

    const data = {
        labels: months,
        datasets: [
          {
            label: "",
            data: clients,
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
      {console.log(months)}     
        <div className="container-lg container-clients clients-color">
          Number of clients
        </div>       
        <div className="chart-container">
          <Line data={data} options={options} />
        </div>
      </div>
    );
}