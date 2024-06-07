import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ClicksBySource = ({ linkId }) => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetch(`http://localhost:3000/links/${linkId}/clicks`)
      .then(response => response.json())
      .then(data => {
        const labels = Object.keys(data);
        const values = Object.values(data);

        setData({
          labels: labels,
          datasets: [
            {
              label: 'Clicks by Source',
              data: values,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      });
  }, [linkId]);
  return <Bar data={data} options={{ scales: { y: { beginAtZero: true } } }}/>;
};

export default ClicksBySource;
