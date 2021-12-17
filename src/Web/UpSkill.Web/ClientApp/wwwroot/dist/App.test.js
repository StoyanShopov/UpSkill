import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', function () {
  render(React.createElement(App, null));
  var linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});