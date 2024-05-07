"use client"
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User, signOut } from "firebase/auth";
import SignIn from "@/components/SignIn";
import Dashboard from "@/app/dashboard/dashboard";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  return (
    <main className="main">
      <Navbar user={user} handleSignOut={handleSignOut} />

      <div className="container mx-auto py-10"> 
        <h1 className="text-2xl pb-2">Crypto Contracts Dashboard</h1>
        {user ? 
        <div>
          <p>Welcome, {user.displayName || 'User'}!</p>
          <Dashboard /> 
        </div>
        : 
        <div className="">
          <p>Please sign in to access the dashboard</p>
          <SignIn />
        </div>

        }
      </div>
  </main>
  );
}
