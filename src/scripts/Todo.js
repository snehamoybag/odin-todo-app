const Todo = () => {
  let _todos = [];
  const storageKeyName = "todos";

  const storeTodos = () => {
    localStorage.setItem(storageKeyName, JSON.stringify(_todos));
  };

  const getTodos = () => {
    const storedTodos = JSON.parse(localStorage.getItem(storageKeyName));

    if (Array.isArray(storedTodos)) {
      _todos = storedTodos;
      return _todos;
    }

    return null;
  };

  const addATodo = (todoObj) => {
    _todos.unshift(todoObj); // adds at the beginning
  };

  return {
    storeTodos,
    getTodos,
    addATodo,
  };
};

export const { storeTodos, getTodos, addATodo } = Todo();
