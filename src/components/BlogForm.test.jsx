import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('blog form component', () => {
  test('calls form event handler with correct props', async () => {
    const testUser = {
      username: 'root'
    };
    const addBlog = (blog) => {};
    const mockHandler = vi.fn(addBlog);
    const { container } = render(<BlogForm addBlog={mockHandler} user={testUser} />);

    const titleInput = container.querySelector('.titleInput');
    const authorInput = container.querySelector('.authorInput');
    const urlInput = container.querySelector('.urlInput');
    const button = container.querySelector('.createBtn');

    const user = userEvent.setup();
    await user.type(titleInput, 'Test title');
    await user.type(authorInput, 'Test author');
    await user.type(urlInput, 'Test url');
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0]).toMatchObject({
      title: 'Test title',
      author: 'Test author',
      url: 'Test url',
      user: { username: 'root' }
    });
  });
});