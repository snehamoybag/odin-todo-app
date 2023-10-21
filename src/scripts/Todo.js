const Todo = () => {
  let _todos = [];
  const _storegeKeyName = "todos";

  const _storeTodos = () => {
    localStorage.setItem(_storegeKeyName, JSON.stringify(_todos));
  };

  const getTodos = () => {
    const storedTodos = JSON.parse(localStorage.getItem(_storegeKeyName));

    if (Array.isArray(storedTodos)) {
      _todos = storedTodos;
      return _todos;
    }

    return [];
  };

  const addATodo = (todoObj) => {
    _todos.unshift(todoObj); // adds at the beginning
    _storeTodos();
  };

  return {
    getTodos,
    addATodo,
  };
};

export const { getTodos, addATodo } = Todo();
