import { useState } from 'react';

const Blog = ({ blog }) => {
  const [view, setView] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const toggleView = () => setView(!view);

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleView}>view</button>
        {view 
          ? <div>
              <div>{blog.url}</div>
              <div>likes {blog.likes} <button>like</button></div>
              <div>{blog.author}</div>
            </div>
          : null}
      </div>
    </div>
  );
};

export default Blog;