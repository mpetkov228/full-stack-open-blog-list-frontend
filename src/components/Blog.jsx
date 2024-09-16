import { useState } from 'react';

const Blog = ({ blog, handleUpdate, removeBlog }) => {
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
    removeBlog(id);
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
              <button onClick={handleDelete}>remove</button>
            </div>
          : null}
      </div>
    </div>
  );
};

export default Blog;