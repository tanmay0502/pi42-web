import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/app/page';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { act } from 'react-dom/test-utils';
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
  User: jest.fn(),
}));


describe('Home', () => {
    
  it('renders the sign in button when user is not authenticated', () => {
    (getAuth as jest.Mock).mockReturnValue({});
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(null);
      return jest.fn();
    });

    render(<Home />);
    expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
  });

  it('renders the sign out button and Dashboard when user is authenticated', () => {
    const user = { uid: '123', email: 'test@example.com' };
    (getAuth as jest.Mock).mockReturnValue({});
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(user);
      return jest.fn();
    });

    render(<Home />);
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    expect(screen.getByText('Symbol Name')).toBeInTheDocument();
  });
});
