const BlogForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <h2>create new</h2>
      <div>
        title <input 
                value={props.title}
                onChange={props.handleTitleChange}
              />
      </div>
      <div>
        author <input 
                 value={props.author}
                 onChange={props.handleAuthorChange}
               />
      </div>
      <div>
        url <input 
              value={props.url}
              onChange={props.handleUrlChange}
            />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;