import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '../../translations/i18n';
import Main from './Main';

beforeEach(() => localStorage.removeItem('ty_last_answer'));

test('shows the question and the three answers', () => {
  render(<MemoryRouter><Main /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: 'Ти як?' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Все добре!' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Я в порядку' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Погано' })).toBeInTheDocument();
});

test('shows when the last answer was sent', () => {
  localStorage.setItem('ty_last_answer', JSON.stringify({ status: 'OK', at: new Date().toISOString() }));
  render(<MemoryRouter><Main /></MemoryRouter>);
  expect(screen.getByText(/Надіслано о/)).toBeInTheDocument();
});
