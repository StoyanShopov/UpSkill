import {Line} from 'react-chartjs-2'
import "../ClientsChart/ClientsChart.css";
import "./Revenue.css"

export default function RevenueChart() {

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "",
            data: [960, 770, 1100, 830, 1250, 920],
            fill: false,
            backgroundColor: "#16D696",
            borderColor: "#16D696",
            tension: 0.1,
          },
        ]
    }

    const options = {
      plugins: { legend: { display: false } },
      scales: {
        y: {
           max: 1500,
           min: 0,          
           ticks: {
              stepSize: 250,             
           }
        }
     }
    };

    return (
      <div className="revenue-chart">
        <div className="container-lg container-clients revenue-color container-margin">Total Revenue</div>
        <div class="chart-container">
          <Line data={data} options={options} />
        </div>
      </div>
    );
}