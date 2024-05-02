"use client"
import Image from "next/image";
import React, { useEffect } from "react";
import getCList from "./fetchdata";
export default function Home() {
  useEffect(() => {
    getCList();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hi
    </main>
  );
}
