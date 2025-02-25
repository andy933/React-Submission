import { useDispatch, useSelector } from "react-redux";
import { commentBlog, deleteBlog, updateBlog } from "../reducers/blogReducer";
import { notificationChange } from "../reducers/notificationReducer";
import { useNavigate, useParams } from "react-router-dom";
import blogService from "../services/blogs";

const Blog = () => {
  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updatedBlog = {
    title: blog?.title,
    author: blog?.author,
    url: blog?.url,
    user: blog?.user.id,
    id: blog?.id,
    likes: blog?.likes + 1,
  };

  const notificationHandler = (notification, result) => {
    dispatch(notificationChange(notification, result));
    setTimeout(() => {
      dispatch(notificationChange("", ""));
    }, 20000);
  };

  const addLike = () => {
    try {
      dispatch(updateBlog(updatedBlog.id, updatedBlog));
      notificationHandler(
        `blog titled ${blog.title} by ${blog.author} liked`,
        "success",
      );
    } catch (err) {
      notificationHandler(
        `Liking blog titled ${blog.title} by ${blog.author} failed.`,
        "danger",
      );
    }
  };

  const removeBlog = async (id, blog) => {
    try {
      if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
        dispatch(deleteBlog(id, blog));

        notificationHandler(
          `blog titled ${blog.title} by ${blog.author} deleted`,
          "success",
        );
        navigate("/blogs");
      }
    } catch (err) {
      notificationHandler(
        `Deleting blog titled ${blog.title} by ${blog.author} failed.`,
        "danger",
      );
    }
  };

  const addComment = (event) => {
    event.preventDefault();

    try {
      const comments = event.target.comment.value;
      event.target.comment.value = "";

      dispatch(commentBlog(blog.id, { comments }));
      notificationHandler(`${blog.title} has been commented`, "success");
    } catch (exception) {
      notificationHandler("comment failed.", "danger");
    }
  };

  return (
    <div>
      {blog && (
        <div>
          <h1>
            {blog.title} {blog.author}
          </h1>
          <a href={`https://${blog.url}`} target="_blank">
            {blog.url}
          </a>
          <div>
            {blog.likes} likes{" "}
            <button
              onClick={() => {
                addLike();
              }}
            >
              like
            </button>
          </div>
          <div>added by {blog.user.name}</div>
          {blog.user.username === username && (
            <button onClick={() => removeBlog(blog.id, blog)}>Remove</button>
          )}
        </div>
      )}
      <div>
        <h3>comments</h3>
        <form onSubmit={addComment}>
          <p>
            <input type="text" id="comment" name="comment" />
          </p>
          <button type="submit">add comment</button>
        </form>

        <ul>
          {blog?.comments.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Blog;
