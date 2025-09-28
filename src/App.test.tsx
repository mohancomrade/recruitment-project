import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

test('renders application without crashing', () => {
  render(<App />);
  // Just check that the app renders without throwing
  expect(document.body).toBeTruthy();
});
