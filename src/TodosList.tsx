import useTodo from "./hooks/useTodo";

const TodosList = () => {
  const { data: todos, error, isLoading } = useTodo();

  if (isLoading)
    return <div className="spinner-border text-secondary" role="status"></div>;
  if (error) return <p className="text-danger">{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {todos?.map((todo) => (
          <li key={todo.id} className="list-group-item">
            {todo.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodosList;
