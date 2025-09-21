import React from 'react';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col bg-white border-r w-64 p-4 gap-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">CU</div>
        <div>
          <h2 className="font-semibold">Creative Upaay</h2>
          <p className="text-xs text-gray-500">Task Manager</p>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="space-y-3 text-gray-700">
          <li className="py-2 px-3 rounded hover:bg-gray-100 cursor-pointer">Dashboard</li>
          <li className="py-2 px-3 rounded hover:bg-gray-100 cursor-pointer">My Tasks</li>
          <li className="py-2 px-3 rounded hover:bg-gray-100 cursor-pointer">Settings</li>
        </ul>
      </nav>

      <div>
        <button className="w-full px-3 py-2 bg-indigo-600 text-white rounded">Create Project</button>
      </div>
    </aside>
  );
}                              