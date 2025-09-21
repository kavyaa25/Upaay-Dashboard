import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice';
import './AddTaskModal.css';

export default function AddTaskModal({ isOpen, onClose, columnId = 'todo' }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('General');

  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setCategory('General');
    }
  }, [isOpen]);

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Title required');
    dispatch(addTask({ title, description, priority, category, columnId }));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop">
      <div className="bg-white rounded-lg p-4 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Add Task</h3>
        <form onSubmit={submit} className="flex flex-col gap-2">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="border rounded px-2 py-1" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border rounded px-2 py-1" />
          <div className="flex gap-2">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded px-2 py-1 flex-1">
              <option>General</option>
              <option>Work</option>
              <option>Personal</option>
              <option>Urgent</option>
            </select>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border rounded px-2 py-1 w-32">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}
