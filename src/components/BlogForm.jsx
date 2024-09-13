import { useState } from 'react';

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
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
      </div>
      <div>
        author <input 
                 value={author}
                 onChange={({ target }) => setAuthor(target.value)}
               />
      </div>
      <div>
        url <input 
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;