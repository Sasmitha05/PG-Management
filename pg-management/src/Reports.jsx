import React from 'react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, LineChart, Line } from 'recharts';

const data = [
  { name: 'Jan', bookings: 20, revenue: 3000 },
  { name: 'Feb', bookings: 25, revenue: 3500 },
  { name: 'Mar', bookings: 30, revenue: 4000 },
  { name: 'Apr', bookings: 20, revenue: 3000 },
  { name: 'May', bookings: 28, revenue: 3600 },
  { name: 'Jun', bookings: 35, revenue: 4500 },
  { name: 'Jul', bookings: 45, revenue: 5500 },
  { name: 'Aug', bookings: 25, revenue: 3300 },
];

const styles = {
  charts: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
  },
  chartContainer: {
    width: '100%',
    height: '300px',
  },
  '@media (max-width: 768px)': {
    charts: {
      padding: '10px',
    },
    chartContainer: {
      height: '250px',
    },
  },
};

function Reports() {
  return (
    <div style={styles.charts}>
      <div style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="bookings" fill="#8884d8" />
            <Bar dataKey="revenue" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="bookings" stroke="#8884d8" />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Reports;
