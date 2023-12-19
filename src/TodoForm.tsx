import { useForm } from "react-hook-form";
import { Todo } from "./hooks/useTodo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const TodoForm = () => {
  // updating data into cacha directly using QueryClient
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Todo>();

  const addTodo = useMutation({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((resp) => resp.data),
    onSuccess: (receivedTodo, sentTodo) => {
      //   console.log(receivedTodo);
      // can see update in Todos because we are using pagination with
      // dummy API so cache Key is provide of User's Posts
      queryClient.setQueryData<Todo[]>(["posts"], (todos) => [
        receivedTodo,
        ...(todos || []),
      ]);
    },
  });

  const onSubmitTodo = (data: Todo) => {
    addTodo.mutate({
      id: 0,
      title: data.title,
    });
  };

  return (
    <>
      <form className="row mb-3" onSubmit={handleSubmit(onSubmitTodo)}>
        <div className="col">
          <input
            {...register("title", { required: "This field is required" })}
            type="text"
            className="form-control"
            placeholder="Add new Todo..."
          />
          {errors.title && (
            <p className="text-danger">{errors.title.message}</p>
          )}
        </div>
        <div className="col">
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
