"use client"
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User, signOut } from "firebase/auth";
import SignIn from "./SignIn";
import Dashboard from "./dashboard/dashboard";

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {user ? (
        <>
          <button className="signout" onClick={handleSignOut}>Sign Out</button>
          <Dashboard />
        </>
      ) : (
        <SignIn />
      )}
    </main>
  );
}
