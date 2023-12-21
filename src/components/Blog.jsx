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
          <p>{blog.title}</p>
          <p>{blog.url}</p>
          <p>{blog.author}</p>
          <p>
            {blog.upvotes}
            <button onClick={handleClick}>Upvote</button>
          </p>
          <button onClick={handleDeleteButton}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
