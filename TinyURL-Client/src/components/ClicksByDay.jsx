import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const ClicksByDay = ({ userId }) => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserLinks = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        const user = await response.json();
        
        if (!Array.isArray(user.links)) {
          throw new Error('User links is not an array');
        }

        const dayClicks = user.links.reduce((acc, link) => {
          link.clicks.forEach(click => {
            const day = new Date(click.insertedAt).getDay();
            acc[day] = (acc[day] || 0) + 1;
          });
          return acc;
        }, {});

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        setData({
          labels: days,
          datasets: [
            {
              label: 'Clicks by Day of the Week',
              data: days.map((_, i) => dayClicks[i] || 0),
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching links:', error);
        setError(error.message);
      }
    };

    fetchUserLinks();
  }, [userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <Line data={data} options={{ scales: { y: { beginAtZero: true } } }} />;
};

export default ClicksByDay;