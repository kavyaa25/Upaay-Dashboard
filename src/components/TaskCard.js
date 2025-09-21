import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../features/tasks/tasksSlice';
import './TaskCard.css';

function Badge({ children }) {
  return <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100">{children}</span>;
}

export default function TaskCard({ task, index }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [desc, setDesc] = useState(task.description || '');

  const save = () => {
    if (!title.trim()) return alert('Title required');
    dispatch(updateTask({ taskId: task.id, updates: { title, description: desc } }));
    setEditing(false);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white p-3 rounded mb-3 shadow ${snapshot.isDragging ? 'opacity-90' : ''}`}
        >
          {!editing ? (
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h4 className="font-semibold">{task.title}</h4>
                <p className="text-sm text-gray-600">{task.description}</p>
                <div className="mt-2 flex gap-2 items-center">
                  <Badge>{task.priority}</Badge>
                  <Badge>{task.category}</Badge>
                  {task.dueDate && <span className="text-xs text-gray-500">Due: {task.dueDate}</span>}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <button onClick={() => setEditing(true)} className="text-sm underline">Edit</button>
                <button onClick={() => dispatch(deleteTask({ taskId: task.id }))} className="text-sm text-red-500 underline">Delete</button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="border rounded px-2 py-1" />
              <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="border rounded px-2 py-1" />
              <div className="flex gap-2 justify-end">
                <button onClick={() => setEditing(false)} className="px-3 py-1 border rounded">Cancel</button>
                <button onClick={save} className="px-3 py-1 bg-indigo-600 text-white rounded">Save</button>
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
