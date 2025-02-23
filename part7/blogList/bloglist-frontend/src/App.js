import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import { notificationChange } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser, loginUser } from "./reducers/userReducer";
import Header from "./components/Header";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import UserView from "./components/UserView";
import { initializeUsers } from "./reducers/allUsersReducer";
import IndividualView from "./components/IndividualView";
import "./index.css";
import BlogView from "./components/BlogView";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUser());
    dispatch(initializeUsers());
  }, [dispatch]);

  const notificationHandler = (notification, result) => {
    dispatch(notificationChange(notification, result));
    setTimeout(() => {
      dispatch(notificationChange("", ""));
    }, 20000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password));
    setUsername("");
    setPassword("");
  };

  return (
    <div className="container">
      <Notification />
      {user && <Header />}
      <h2 className="mt-2">blogs</h2>
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <div>
                <LoginForm
                  username={username}
                  password={password}
                  handleLogin={handleLogin}
                  onChangeUsername={({ target }) => setUsername(target.value)}
                  onChangePassword={({ target }) => setPassword(target.value)}
                />
              </div>
            ) : (
              <div className="mt-3">
                <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
                  <BlogForm
                    notificationHandler={notificationHandler}
                    blogFormRef={blogFormRef}
                  />
                </Togglable>
                <BlogView />
              </div>
            )
          }
        />

        <Route
          path="blogs"
          element={
            user && (
              <div className="mt-3">
                <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
                  <BlogForm
                    notificationHandler={notificationHandler}
                    blogFormRef={blogFormRef}
                  />
                </Togglable>
                <BlogView />
              </div>
            )
          }
        />

        <Route
          path="users"
          element={
            user && (
              <div>
                <UserView />
              </div>
            )
          }
        />

        <Route
          path="users/:id"
          element={
            user && (
              <div>
                <IndividualView />
              </div>
            )
          }
        />

        <Route
          path="blogs/:id"
          element={
            user && (
              <div>
                <Blog />
              </div>
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
