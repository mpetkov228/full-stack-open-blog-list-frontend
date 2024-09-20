import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('render blog', () => {
  const blog = {
    id: 1,
    title: 'Test blog',
    author: 'Test author',
    url: 'Test url',
    likes: 0,
    user: {
      id: 1,
    }
  };

  const { container } = render(<Blog blog={blog} />);

  const blogInfo = container.querySelector('.blogInfo');
  const extendedView = container.querySelector('.extendedView');

  expect(blogInfo.textContent).toBe('Test blog Test author');
  expect(extendedView).toBeNull();
});