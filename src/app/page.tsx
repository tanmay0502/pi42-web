"use client"
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User, signOut } from "firebase/auth";
import SignIn from "@/components/SignIn";
import Dashboard from "@/app/dashboard/dashboard";
import Navbar from "@/components/Navbar";
import Image from "next/image";

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
          <Image height={300} width={300} src={'/pi42Full.jpeg'} alt="Logo" className="mx-auto" />
          <p className="pt-10">Please sign in to access the dashboard</p>
          <SignIn />
        </div>

        }
      </div>
  </main>
  );
}
