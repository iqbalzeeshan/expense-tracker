import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
}

const useTodo = () => {
  const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
      .then((resp) => resp.data);

  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 1 * 60 * 1000, // 1mint
  });
};

export default useTodo;
