import React from 'react';
import { getAuth, User } from "firebase/auth";
import SignIn from "@/components/SignIn";
import Image from 'next/image';

type NavbarProps = {
  user: User | null;
  handleSignOut: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ user, handleSignOut }) => {
  return (
    <nav className="navbar">
      <Image height={100} width={150} src={'/pi42Logo.png'} alt="Logo" className="logo pl-4" />
      <div className="user-info">
        {user ? (
          <>
            <div className='px-4'>{user.displayName || 'No name'}</div>
            <Image height={40} width={40} src={user.photoURL || ''} alt="User profile" className="user-profile" />
            <button className='signout' onClick={handleSignOut}>Sign Out</button>
          </>
        ) : (
          <SignIn />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
