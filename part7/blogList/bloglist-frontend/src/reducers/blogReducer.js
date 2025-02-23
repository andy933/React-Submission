import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    likeBlog(state, action) {
      state[state.findIndex((blog) => blog.id === action.payload.id)].likes +=
        1;
    },
    appendComment(state, action) {
      state[
        state.findIndex((blog) => blog.id === action.payload.id)
      ].comments.push(
        action.payload.comments[action.payload.comments.length - 1],
      );
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  };
};

export const createBlog = (blogInformation) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogInformation);
    dispatch(appendBlog(newBlog));
  };
};

export const commentBlog = (id, comments) => {
  return async (dispatch) => {
    const newComment = await blogService.comment(id, comments);
    dispatch(appendComment(newComment));
  };
};

export const updateBlog = (id, blogInformation) => {
  return async (dispatch) => {
    const addLikeBlog = await blogService.update(id, blogInformation);
    dispatch(likeBlog(addLikeBlog));
  };
};

export const deleteBlog = (id, blogInformation) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs.filter((blog) => blog !== blogInformation)));
  };
};

export const { setBlogs, appendBlog, likeBlog, removeBlog, appendComment } =
  blogSlice.actions;

export default blogSlice.reducer;
