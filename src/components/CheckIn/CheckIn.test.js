import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CheckIn from './CheckIn';

test('offers the three answers when nothing has been sent yet', () => {
  localStorage.removeItem('ty_last_answer');
  render(
    <MemoryRouter>
      <CheckIn />
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { name: /how are you/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /i'm fine/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /okay for now/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /i need help/i })).toBeInTheDocument();
});

test('shows the confirmation when an answer was already sent', () => {
  localStorage.setItem('ty_last_answer', JSON.stringify({ status: 'BAD', at: new Date().toISOString() }));
  render(
    <MemoryRouter>
      <CheckIn />
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { name: /your circle has been told/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /change my answer/i })).toBeInTheDocument();
});
