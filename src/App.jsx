import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  //Retrieve all blogs
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  //Check if a user is logged in
  useEffect(() => {
    const loggedBlogUser = window.localStorage.getItem("loggedBlogUser");
    if (loggedBlogUser) {
      const user = JSON.parse(loggedBlogUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (loginCredentials) => {
    console.log(`Logging in with`);
    try {
      const user = await loginService.login(loginCredentials);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);

      setUsername("");
      setPassword("");

      console.log(user);
    } catch (exception) {
      console.log("invalid credentials");
    }
  };

  const createBlog = async (blogObject) => {
    const newBlogObject = {
      ...blogObject,
      author: user.name,
    };
    await blogService.create(newBlogObject);
    setBlogs(blogs.concat(newBlogObject));
  };

  return (
    <div>
      {!user && <LoginForm handleLogin={handleLogin} />}
      {user && (
        <>
          <p>
            {user.username} logged in
            <button
              type="submit"
              onClick={() => {
                window.location.reload();
                window.localStorage.clear();
              }}
            >
              Logout
            </button>
          </p>
          <Togglable>
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </>
      )}
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
