import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '../../translations/i18n';
import App from './App';

test('renders the login screen at /login', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { name: 'Увійти' })).toBeInTheDocument();
});
