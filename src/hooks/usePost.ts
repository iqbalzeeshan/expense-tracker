import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
}

const usePost = (userId: number | undefined) => {
  const fetchPosts = () =>
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
        params: {
          userId,
        },
      })
      .then((resp) => resp.data);

  return useQuery({
    queryKey: userId ? ["user", userId, "posts"] : ["posts"],
    queryFn: fetchPosts,
    staleTime: 1 * 60 * 1000, // 1mint
  });
};

export default usePost;
