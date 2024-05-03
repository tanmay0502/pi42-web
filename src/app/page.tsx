"use client"
import React, { useState, useEffect } from "react";
import getCList from "./fetchdata";

export default function Home() {
  const [sid, setSid] = useState<string>("");

  useEffect(() => {
    const fetchSid = async () => {
      const fetchedSid = await getCList();
      if (fetchedSid !== null) {
        setSid(fetchedSid);
      }
    };
    fetchSid();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>SID: {sid}</p>
    </main>
  );
}
