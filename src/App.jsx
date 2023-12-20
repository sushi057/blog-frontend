import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(`Logging in with ${username} and ${password}`);
    try {
      const user = await loginService.login({ username, password });
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

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h3>Login to form</h3>
        <div>
          username:
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

  const blogForm = () => {
    return (
      <form onSubmit={handleBlogForm}>
        <h3>Add new Blog</h3>
        <div>
          Title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Add blog</button>
      </form>
    );
  };

  return (
    <div>
      {!user && loginForm()}
      {user && <p>{user.name} logged in</p>}
      {user && blogForm()}
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
