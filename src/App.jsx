import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

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

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(`Logging in with ${username} and ${password}`);
    try {
      const user = await loginService.login({ username, password });
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

  const handleBlogForm = async (event) => {
    event.preventDefault();
    console.log(`Adding blog`);
    try {
      const newBlog = {
        title: title,
        url: url,
        author: user.name,
      };

      const response = await blogService.create(newBlog);
      console.log(response);

      // setTitle("");
      // setUrl("");
    } catch (exception) {
      console.log("invalid token");
    }
  };

  return (
    <div>
      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      )}
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

          <BlogForm
            title={title}
            url={url}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            handleBlogForm={handleBlogForm}
          />
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
