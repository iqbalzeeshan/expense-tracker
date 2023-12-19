import { useEffect, useState } from "react";
import apiClient, { CanceledError } from "./services/api-client";

interface Users {
  id: number;
  name: string;
}

const UsersList = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // this is builtin class in a modern browser that allows us to cancel or Abort
    // the async operations like fetch Requests, DOM manipulaitons or any opertion
    // that might take long time to complete
    const controller = new AbortController();

    // axios request to fetch the data
    apiClient
      .get<Users[]>("/users", {
        signal: controller.signal,
      })
      .then((resp) => {
        setUsers(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    //cleaner function
    // with this call back we dont have to worry about requset sent to server twice
    return () => controller.abort();
  }, []);

  // deleting user
  const deleteUser = (user: Users) => {
    const originalUsers = users;
    setUsers(users.filter((u) => u.id !== user.id));
    // delete from server
    apiClient.delete("/users/" + user.id).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  // adding new user
  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: "Zeeshan" };
    setUsers([newUser, ...users]);
    apiClient
      .post("/users", newUser)
      .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
      });
  };

  // to update the user
  const updatedUser = (user: Users) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + "!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
    apiClient.patch("/users/" + user.id, updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    });
  };

  return (
    <>
      <h3>User Post</h3>
      <ul className="list-group">
        {isLoading && <div className="spinner-border"></div>}
        {error && <p className="text-danger">{error}</p>}
        <button className="btn btn-primary" onClick={() => addUser()}>
          Add
        </button>
        {users.map((user) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={user.id}
          >
            {user.name}
            <div>
              <button
                className="btn btn-outline-danger mx-1"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => updatedUser(user)}
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UsersList;
