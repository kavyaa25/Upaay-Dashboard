import React from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useDispatch, useSelector } from 'react-redux';
import { reorderWithinColumn, moveTaskAcrossColumns } from '../features/tasks/tasksSlice';
import TaskCard from './TaskCard';
import AddTaskModal from './AddTaskModal';
import './TaskBoard.css';

export default function TaskBoard() {
  const dispatch = useDispatch();
  const tasksState = useSelector((s) => s.tasks);
  const filters = useSelector((s) => s.filters);

  const getFilteredTasks = (column) => {
    return column.taskIds
      .map((id) => tasksState.tasks[id])
      .filter(Boolean)
      .filter((t) => {
        if (filters.category !== 'All' && t.category !== filters.category) return false;
        if (filters.priority !== 'All' && t.priority !== filters.priority) return false;
        if (filters.search && !t.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
        return true;
      });
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      dispatch(reorderWithinColumn({ columnId: source.droppableId, startIndex: source.index, endIndex: destination.index }));
    } else {
      dispatch(moveTaskAcrossColumns({ source, destination, draggableId }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tasksState.columnOrder.map((colId) => {
          const column = tasksState.columns[colId];
          const columnTasks = getFilteredTasks(column);
          return (
            <div key={column.id} className="bg-white rounded-lg p-3 shadow-sm min-h-[180px]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">{column.title}</h3>
                <AddTaskModalTrigger columnId={column.id} />
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className={`min-h-[100px] p-2 rounded ${snapshot.isDraggingOver ? 'bg-indigo-50' : ''}`}>
                    {columnTasks.map((task, index) => (
                      <TaskCard key={task.id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}

function AddTaskModalTrigger({ columnId }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={() => setOpen(true)}>+ Add</button>
      <AddTaskModal isOpen={open} onClose={() => setOpen(false)} columnId={columnId} />
    </>
  );
}
