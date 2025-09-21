import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TaskBoard from '../components/TaskBoard';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex gap-4">
          <Sidebar />
          <main className="flex-1">
            <TaskBoard />
          </main>
        </div>
      </div>
    </div>
  );
}
