import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setPriority, setSearch, resetFilters } from '../features/filters/filtersSlice';
import './Header.css';

export default function Header() {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.filters);

  return (
    <header className="w-full bg-white shadow-sm px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">CU</div>
        <div>
          <h1 className="text-lg font-semibold">Creative Upaay</h1>
          <p className="text-xs text-gray-500">Kanban task dashboard</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-2 md:items-center md:justify-end">
        <input
          className="border rounded px-3 py-2 w-full md:w-64"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
        <select value={filters.category} onChange={(e) => dispatch(setCategory(e.target.value))} className="border rounded px-3 py-2">
          <option>All</option>
          <option>Work</option>
          <option>Personal</option>
          <option>Urgent</option>
          <option>General</option>
        </select>
        <select value={filters.priority} onChange={(e) => dispatch(setPriority(e.target.value))} className="border rounded px-3 py-2">
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button onClick={() => dispatch(resetFilters())} className="px-3 py-2 border rounded">Reset</button>
      </div>
    </header>
  );
}
