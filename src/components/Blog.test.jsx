import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';


describe('blog component', () => {
  const blog = {
    id: 1,
    title: 'Test blog',
    author: 'Test author',
    url: 'Test url',
    likes: 0,
    user: {
      id: 1,
      username: 'root'
    }
  };

  const testUser = {
    name: 'Test name',
    username: 'Test username'
  }

  test('render blog', () => {
    const { container } = render(<Blog blog={blog} />);

    const blogInfo = container.querySelector('.blogInfo');
    const extendedView = container.querySelector('.extendedView');

    expect(blogInfo.textContent).toBe('Test blog Test author');
    expect(extendedView).toBeNull();
  });

  test('show likes and url on click', async () => {
    const user = userEvent.setup();
    const { container } = render(<Blog blog={blog} user={testUser} />);

    const button = container.querySelector('.viewBtn');
    await user.click(button);

    const extendedView = container.querySelector('.extendedView');
    const url = container.querySelector('.url');
    const likes = container.querySelector('.likes');

    expect(extendedView).toBeDefined();
    expect(url.textContent).toBe('Test url');
    expect(likes.textContent).toBe('likes 0');
  });

  test('like button click twice', async () => {
    const user = userEvent.setup();
    const mockHandler = vi.fn((id, blog) => blog.likes++ );

    const { container } = render(<Blog blog={blog} user={testUser} handleUpdate={mockHandler} />);

    const viewBtn = container.querySelector('.viewBtn');
    await user.click(viewBtn);

    const likeBtn = container.querySelector('.likeBtn');
    const likes = container.querySelector('.likes');
    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(mockHandler.mock.calls).toHaveLength(2);
    expect(likes.textContent).toBe('likes 2');
  });
});