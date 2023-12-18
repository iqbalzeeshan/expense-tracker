import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
}

interface TodoQuery {
  page: number;
  pageSize: number;
}

const useTodo = (query: TodoQuery) => {
  const fetchTodos = () =>
    axios
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos", {
        params: {
          _start: (query.page - 1) * query.pageSize,
          _limit: query.pageSize,
        },
      })
      .then((resp) => resp.data);

  return useQuery({
    queryKey: ["todos", query],
    queryFn: fetchTodos,
    staleTime: 1 * 60 * 1000, // 1mint
    placeholderData: keepPreviousData,
  });
};

export default useTodo;
