import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ addBlog, user }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url,
      user
    };

    await addBlog(newBlog);

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <div>
        title <input
          data-testid="title"
          className="titleInput"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author <input
          data-testid="author"
          className="authorInput"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url <input
          data-testid="url"
          className="urlInput"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button className="createBtn" type="submit">create</button>
    </form>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default BlogForm;