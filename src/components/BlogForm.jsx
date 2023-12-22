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
          id="title-input"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Blog Title"
        />
      </div>
      <div>
        Url:
        <input
          id="url-input"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="Blog Url"
        />
      </div>
      <button id="create-btn" type="submit">
        Create blog
      </button>
    </form>
  );
};

export default BlogForm;
