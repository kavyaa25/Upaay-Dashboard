export const loadState = () => {
  try {
    const serialized = localStorage.getItem('creativeUpaayState');
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch (e) {
    console.error('Load state error', e);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const snapshot = {
      tasks: state.tasks,
      filters: state.filters,
    };
    localStorage.setItem('creativeUpaayState', JSON.stringify(snapshot));
  } catch (e) {
    console.error('Save state error', e);
  }
};
