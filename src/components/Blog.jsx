import { useState } from "react";

const Blog = ({ blog, handleUpvotes, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false);
  const blogStyle = {
    paddingLeft: 2,
    border: "solid",
    borderWidth: 2,
    marginBottom: 10,
  };

  const handleClick = () => {
    handleUpvotes(blog.id, blog);
    console.log(blog.id, blog, "upvotes button");
  };

  const handleDeleteButton = () => {
    if (window.confirm(`Do you want to delete the ${blog.title} blog?`)) {
      handleDelete(blog.id);
      console.log(blog.title, "delete button");
    }
  };

  return (
    <div>
      <button
        id="view-btn"
        onClick={() => {
          setShowDetails(!showDetails);
        }}
      >
        {!showDetails ? "view" : "hide"}
      </button>
      {!showDetails && (
        <div>
          {blog.title} {blog.author}
        </div>
      )}

      {showDetails && (
        <div style={blogStyle}>
          <p className="title">{blog.title}</p>
          <p>{blog.url}</p>
          <p>{blog.author}</p>
          <div>
            <p id="upvote-count">{blog.upvotes ? blog.upvotes : 0}</p>
            <button id="upvote-btn" onClick={handleClick}>
              Upvote
            </button>
          </div>
          <button id="delete-btn" onClick={handleDeleteButton}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
