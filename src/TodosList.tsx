import { useState } from "react";
import useTodo from "./hooks/useTodo";

const TodosList = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const { data: todos, error, isLoading } = useTodo({ page, pageSize });

  if (isLoading)
    return <div className="spinner-border text-secondary" role="status"></div>;
  if (error) return <p className="text-danger">{error.message}</p>;

  return (
    <>
      <h3>Todo List</h3>
      <ul className="list-group">
        {todos?.map((todo) => (
          <li key={todo.id} className="list-group-item">
            {todo.title}
          </li>
        ))}
      </ul>
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="btn btn-primary my-3 ms-3"
      >
        Previous
      </button>
      <button
        onClick={() => setPage(page + 1)}
        className="btn btn-primary my-3 ms-3"
      >
        Next
      </button>
    </>
  );
};

export default TodosList;
