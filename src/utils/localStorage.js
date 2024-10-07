// Save state to local storage
export const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("expenses", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

// Load state from local storage
export const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("expenses");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state", e);
    return undefined;
  }
};
