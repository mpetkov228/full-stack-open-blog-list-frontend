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

  const element = container.querySelector('.defaultView');

  expect(element.textContent).toBe('Test blog Test author');
});