import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const seedTasks = {
  'task-1': { id: 'task-1', title: 'Design landing page', description: 'Hero + features + CTA', category: 'Work', priority: 'High', dueDate: '2025-10-01' },
  'task-2': { id: 'task-2', title: 'Write README', description: 'Add setup & screenshots', category: 'Work', priority: 'Medium', dueDate: '2025-10-05' },
  'task-3': { id: 'task-3', title: 'Buy groceries', description: 'Milk, eggs, veggies', category: 'Personal', priority: 'Low', dueDate: null },
};

const initialState = {
  tasks: seedTasks,
  columns: {
    todo: { id: 'todo', title: 'To Do', taskIds: ['task-1', 'task-3'] },
    inprogress: { id: 'inprogress', title: 'In Progress', taskIds: ['task-2'] },
    done: { id: 'done', title: 'Done', taskIds: [] },
  },
  columnOrder: ['todo', 'inprogress', 'done'],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        const { task, columnId } = action.payload;
        state.tasks[task.id] = task;
        if (state.columns[columnId]) {
          state.columns[columnId].taskIds.unshift(task.id);
        } else {
          state.columns.todo.taskIds.unshift(task.id);
        }
      },
      prepare({ title, description, category = 'General', priority = 'Medium', dueDate = null, columnId = 'todo' }) {
        const id = uuidv4();
        const task = { id, title, description, category, priority, dueDate };
        return { payload: { task, columnId } };
      },
    },
    deleteTask(state, action) {
      const { taskId } = action.payload;
      delete state.tasks[taskId];
      for (const col of Object.values(state.columns)) {
        const idx = col.taskIds.indexOf(taskId);
        if (idx !== -1) col.taskIds.splice(idx, 1);
      }
    },
    updateTask(state, action) {
      const { taskId, updates } = action.payload;
      if (state.tasks[taskId]) state.tasks[taskId] = { ...state.tasks[taskId], ...updates };
    },
    reorderWithinColumn(state, action) {
      const { columnId, startIndex, endIndex } = action.payload;
      const col = state.columns[columnId];
      if (!col) return;
      const [removed] = col.taskIds.splice(startIndex, 1);
      col.taskIds.splice(endIndex, 0, removed);
    },
    moveTaskAcrossColumns(state, action) {
      const { source, destination, draggableId } = action.payload;
      if (!destination) return;
      const sourceCol = state.columns[source.droppableId];
      const destCol = state.columns[destination.droppableId];
      if (!sourceCol || !destCol) return;
      sourceCol.taskIds.splice(source.index, 1);
      destCol.taskIds.splice(destination.index, 0, draggableId);
    },
  },
});

export const { addTask, deleteTask, updateTask, reorderWithinColumn, moveTaskAcrossColumns } = tasksSlice.actions;
export default tasksSlice.reducer;
