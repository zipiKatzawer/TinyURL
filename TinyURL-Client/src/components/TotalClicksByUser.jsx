import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const TotalClicksByUser = ({ userId }) => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetch(`http://localhost:3000/users/${userId}`)
      .then(response => response.json())
      .then(user => {
        const linkIds = user.links.map(link => link.id);
        console.log("linkIds",linkIds)

        Promise.all(
          linkIds.map(linkId => fetch(`http://localhost:3000/links/${linkId}/clicks`).then(res => res.json()))
        ).then(clicksData => {
          console.log("clicksData",clicksData)
          const totalClicks = clicksData.reduce((acc, clicks) => {
            Object.values(clicks).forEach(clickCount => (acc += clickCount));
            return acc;
          }, 0);

          setData({
            labels: linkIds,
            datasets: [
              {
                label: 'Total Clicks by User',
                data: clicksData.map(clicks => Object.values(clicks).reduce((a, b) => a + b, 0)),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          });
        });
      });
  }, [userId]);

  return <Pie data={data} />;
};

export default TotalClicksByUser;
