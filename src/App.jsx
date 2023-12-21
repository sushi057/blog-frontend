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
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => {
        const upvotesA = a.upvotes || 0;
        const upvotesB = b.upvotes || 0;
        return upvotesB - upvotesA;
      });
      setBlogs(blogs);
    });
  }, [blogs]);

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
      upvotes: 0,
    };
    await blogService.create(newBlogObject);
    setBlogs(blogs.concat(newBlogObject));
  };

  const handleUpvotes = async (id, blogObject) => {
    const updatedBlog = { ...blogObject, upvotes: blogObject.upvotes + 1 };
    const response = await blogService.update(id, updatedBlog);
    console.log("response", response);
    console.log("apps log");
  };

  const handleDelete = async (id) => {
    const response = await blogService.remove(id);
    console.log(response);
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
        <Blog
          key={blog.id}
          blog={blog}
          handleUpvotes={handleUpvotes}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default App;
