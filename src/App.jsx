import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    blogService.getAll().then(blogs => 
      setBlogs(blogs)
    );
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON));
    }
  }, []);

  const blogFormRef = useRef();

  const removeNotification = () => {
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem('user', JSON.stringify(user));

      setUser(user);
      setUsername('');
      setPassword('');
      setNotification(`${user.username} logged in`);
      setIsError(false);
    } catch (exception) {
      setNotification('wrong username or password');
      setIsError(true);
    }

    removeNotification();
  };

  const handleCreate = async (data) => {
    blogFormRef.current.toggleVisibility();

    try {
      await blogService.create(data);
      setNotification(`a new blog ${data.title} by ${data.author} added`);
      setIsError(false);
    } catch (exception) {
      setNotification(exception.message);
      setIsError(true);
    }

    removeNotification();
  };

  const handleUpdate = async (id, updatedBlog) => {
    await blogService.update(id, updatedBlog);
  };

  const handleDelete = async (id) => {
    await blogService.del(id);
  }

  const logout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <Notification message={notification} isError={isError} />
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
  );

  const userDisplay = () => (
    <div>
      <h2>Blogs</h2>

      <Notification message={notification} isError={isError} />

      <p>{user.name} logged in <button onClick={logout}>log out</button></p>

      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <BlogForm 
          addBlog={handleCreate}
          user={user}
        />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => 
        <Blog 
          key={blog.id} 
          blog={blog} 
          handleUpdate={handleUpdate}
          removeBlog={handleDelete}
        />
      )}
    </div>
  );

  return (
    <div>
      {user === null ? loginForm() : userDisplay()}
    </div>
  )
};

export default App;