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

  // handling error with mutation by apply generic type argument to useMutation
  //
  const addTodo = useMutation<Todo, Error, Todo>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((resp) => resp.data),
    onSuccess: (receivedTodo, sentTodo) => {
      //   console.log(receivedTodo);
      // can see update in Todos because we are using pagination with
      // dummy API so cache Key is provide of User's Posts
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        receivedTodo,
        ...(todos || []),
      ]);
    },
  });

  const onSubmitTodo = (data: Todo) => {
    addTodo.mutate({
      id: 1,
      title: data.title,
    });
  };

  return (
    <>
      {addTodo.error && (
        <div className="col-6 alert alert-danger">{addTodo.error.message}</div>
      )}
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
          <button disabled={addTodo.isPending} className="btn btn-primary">
            {addTodo.isPending ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
