import { useState } from "react";

const Togglable = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div style={hideWhenVisible}>
        <button type="button" onClick={toggleVisibility}>
          Add new blog
        </button>
      </div>

      <div style={showWhenVisible}>
        {children}
        <button type="button" onClick={toggleVisibility}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default Togglable;
