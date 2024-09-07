import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs => 
      setBlogs(blogs)
    );
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username <input 
                     type="text" 
                     name="username" 
                     value={username}
                     onChange={({ target }) => setUsername(target.value)}
                   />
        </div>
        <div>
          password <input 
                     type="password" 
                     name="password"
                     value={password}
                     onChange={({ target }) => setPassword(target.value)}
                   />
        </div>
        <button type="submit">Log in</button>
      </form>
      <h2>Blogs</h2>
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
};

export default App;