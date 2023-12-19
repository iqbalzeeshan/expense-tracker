import { useState } from "react";
import usePost from "./hooks/usePost";

const Posts = () => {
  const [userId, setUserId] = useState<number>();
  const { data: posts, error, isLoading } = usePost(userId);

  if (isLoading)
    return <div className="spinner-border text-secondary" role="status"></div>;
  if (error) return <p className="text-danger">{error.message}</p>;
  return (
    <>
      <hr />
      <h3 className="ms-3">Users Posts</h3>
      <select
        className="form-select"
        onChange={(event) => setUserId(parseInt(event.target.value))}
        value={userId}
      >
        <option value="">All Users Posts</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      <ul className="list-group">
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Posts;
