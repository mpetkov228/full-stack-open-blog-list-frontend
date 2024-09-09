import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

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
    } catch (exception) {
      console.log(exception);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
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

  const showBlogs = () => (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in <button onClick={logout}>log out</button></p>
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );

  return (
    <div>
      {user === null ? loginForm() : showBlogs()}
    </div>
  )
};

export default App;