const BlogForm = ({ title, url, handleTitleChange, handleUrlChange, handleBlogForm }) => {
  return (
    <form onSubmit={handleBlogForm}>
      <h3>Add new Blog</h3>
      <div>
        Title:
        <input value={title} onChange={handleTitleChange} />
      </div>
      <div>
        Url:
        <input value={url} onChange={handleUrlChange} />
      </div>
      <button type="submit">Add blog</button>
    </form>
  );
};

export default BlogForm;
