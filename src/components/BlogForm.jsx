import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      url: url,
    });
    setTitle("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <h3>Add new Blog</h3>
      <div>
        Title:
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Blog Title"
        />
      </div>
      <div>
        Url:
        <input
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="Blog Url"
        />
      </div>
      <button type="submit">Create blog</button>
    </form>
  );
};

export default BlogForm;
