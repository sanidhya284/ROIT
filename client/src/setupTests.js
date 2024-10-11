import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import '@testing-library/jest-dom';

describe('App Component', () => {
  it('renders the correct title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Edit `src\/App.js` and save to reload./i);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the navigation menu', () => {
    render(<App />);
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Create Post')).toBeInTheDocument();
    expect(screen.getByText('Messages')).toBeInTheDocument();
  });

  it('navigates to the Home page', () => {
    const { getByRole } = render(<App />);
    const homeLink = getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    expect(screen.getByText(/Welcome to the Social Media App/i)).toBeInTheDocument();
  });

  // Add more test cases for other routes and functionalities
});