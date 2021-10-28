import {Line} from 'react-chartjs-2'
import "./ClientsChart.css";
import "../RevenueChart/Revenue.css";

export default function ClientsChart() {

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "",
            data: [45, 15, 27, 60, 25, 44],
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
      <div>
        <div className="container-lg container-clients clients-color">Number of clients</div>
        <div class="chart-container">
          <Line data={data} options={options} />
        </div>
      </div>
    );
}