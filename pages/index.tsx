// pages/index.tsx
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { FaUsers, FaUserShield, FaChartLine } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ProtectedRoute from '@/components/ProtectedRoute';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [users, setUsers] = useState<number>(0);
  const [roles, setRoles] = useState<number>(0);
  const [activeSessions, setActiveSessions] = useState<number>(0);
  const [userActivity, setUserActivity] = useState<{ month: string; count: number }[]>([]);
  const [recentActivities, setRecentActivities] = useState<{ id: number; user: string; action: string; time: string }[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [usersRes, rolesRes] = await Promise.all([
        axios.get('http://localhost:5001/users'),
        axios.get('http://localhost:5001/roles'),
      ]);
      setUsers(usersRes.data.length);
      setRoles(rolesRes.data.length);
      setActiveSessions(Math.floor(Math.random() * usersRes.data.length)); // Mock data

      // Mock user activity
      setUserActivity([
        { month: 'Jan', count: 40 },
        { month: 'Feb', count: 55 },
        { month: 'Mar', count: 75 },
        { month: 'Apr', count: 60 },
        { month: 'May', count: 80 },
        { month: 'Jun', count: 65 },
      ]);

      // Mock recent activities
      setRecentActivities([
        { id: 1, user: 'John Doe', action: 'Logged In', time: '2024-04-25 10:30 AM' },
        { id: 2, user: 'Jane Smith', action: 'Updated Role', time: '2024-04-25 11:00 AM' },
        { id: 3, user: 'Mike Johnson', action: 'Deleted User', time: '2024-04-25 12:15 PM' },
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const chartData = {
    labels: userActivity.map((data) => data.month),
    datasets: [
      {
        label: 'User Activity',
        data: userActivity.map((data) => data.count),
        fill: false,
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
      },
    ],
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <FaUsers className="text-4xl text-blue-600 mr-4" />
          <div>
            <h2 className="text-xl font-bold">{users}</h2>
            <p>Total Users</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <FaUserShield className="text-4xl text-green-600 mr-4" />
          <div>
            <h2 className="text-xl font-bold">{roles}</h2>
            <p>Total Roles</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex items-center">
          <FaChartLine className="text-4xl text-red-600 mr-4" />
          <div>
            <h2 className="text-xl font-bold">{activeSessions}</h2>
            <p>Active Sessions</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-4">User Activity Trends</h2>
        <Line data={chartData} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Recent User Activities</h2>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase">User</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase">Action</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase">Time</th>
            </tr>
          </thead>
          <tbody>
            {recentActivities.map((activity) => (
              <tr key={activity.id} className="border-t">
                <td className="py-4 px-6">{activity.user}</td>
                <td className="py-4 px-6">{activity.action}</td>
                <td className="py-4 px-6">{activity.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

const DashboardPage = () => (
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
);

export default DashboardPage;
