import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, user, handleUpdate, removeBlog }) => {
  const [view, setView] = useState(false);
  const [blogLikes, setBlogLikes] = useState(blog.likes);

  const userId = blog.user.id;
  const { id, title, author, url } = blog;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const toggleView = () => setView(!view);

  const updateLikes = async () => {
    await handleUpdate(id, {
      title,
      author,
      url,
      user: userId,
      likes: blogLikes + 1
    });
    setBlogLikes(blogLikes + 1);
  };

  const handleDelete = () => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (confirm) {
      removeBlog(id, user.token);
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleView}>view</button>
        {view
          ? <div>
            <div>{blog.url}</div>
            <div>likes {blogLikes} <button onClick={updateLikes}>like</button></div>
            <div>{blog.user.name}</div>
            {
              user.username === blog.user.username
                ? <button onClick={handleDelete}>remove</button>
                : null
            }
          </div>
          : null}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
};

export default Blog;