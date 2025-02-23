import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = ({ notificationHandler, blogFormRef }) => {
  const dispatch = useDispatch();

  const addBlog = async (event) => {
    event.preventDefault();

    blogFormRef.current.toggleVisibility();
    try {
      const title = event.target.title.value;
      const author = event.target.author.value;
      const url = event.target.url.value;
      event.target.title.value = "";
      event.target.author.value = "";
      event.target.url.value = "";

      const newBlog = {
        title,
        author,
        url,
      };

      dispatch(createBlog(newBlog));
      notificationHandler(
        `A new blog titled ${title} by ${author} added`,
        "success",
      );
    } catch (exception) {
      notificationHandler("Posting new blog failed.", "danger");
    }
  };

  return (
    <div>
      <h2>Create a new blog:</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" placeholder="author" name="author" />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input type="text" id="url" name="url" placeholder="url" />
        </div>
        <button id="create-btn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
