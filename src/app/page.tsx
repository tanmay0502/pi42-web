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

  useEffect(() => {
    if (sid) {
      const socket = new WebSocket(`wss://fawss.pi42.com/socket.io/?EIO=4&transport=websocket&sid=${sid}`);

      socket.onopen = function (event) {
        console.log("WebSocket is open now.");
        socket.send('2probe');
      };

      socket.onclose = function (event) {
        console.log("WebSocket is closed now.");
      };

      socket.onerror = function (error) {
        console.log(`WebSocket error: ${error}`);
      };

      socket.onmessage = function (event) {
        console.log(`Data received from server: ${event.data}`);
        if (event.data === '3probe') {
         socket.send('5');

         socket.send('40');
        //  socket.send('42["subscribe",]');
          // socket.send('42["subscribe",{params: ["btcinr@aggTrade", "btcinr@depth_0.1"]}]');
          //socket.send('42["subscribe",{params: ["btcinr@markPrice", "btcinr@ticker"]}]');
          //socket.send('42["subscribe", {params: ["btcinr@kline_15m"]}]')
          // socket.send('3');
        }else{
          console.log(`Data received from server: ${event.data}`);
          // socket.send('43["subscribe",{params: ["btcinr@aggTrade", "btcinr@depth_0.1"]}]');
        }
      };
    }
  }, [sid]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>SID: {sid}</p>
    </main>
  );
}
