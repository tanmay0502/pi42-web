"use client"
import React, { useEffect, useState } from 'react';
import Table from '@/components/Table';
import getCList from '@/components/fetchSID';

const CryptoContractsPage: React.FC = () => {

  const [sid, setSid] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("default");
  const [contractsArray, setContractsArray] = useState<any[]>([]);
  const [sortedContracts, setSortedContracts] = useState<any[]>([]); 

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
        if (event.data === '3probe') {
          console.log("Received 3probe, sending further initialization messages...");
          socket.send('5');
          socket.send('40');
          
        } else {
          try {
            const dataArray = JSON.parse(event.data.substring(2)); 
            const messageType = dataArray[0];
            const messageData = dataArray[1];
      
            if (messageType === "allContractDetails") {
              const contractsArray = Object.entries(messageData).map(([contractName, contractDetails]) => ({
                name: contractName,
                ...contractDetails
              }));
            
              setContractsArray(contractsArray);
            
              // Generate the params array
              const params = contractsArray.map(contract => `${contract.name.toLowerCase()}@ticker`);
            
              socket.send(`42["subscribe",{"params":${JSON.stringify(params)}}]`);
            }
            else if( messageType === '24hrTicker'){
              console.log({messageData})
            }
          } catch (error) {
            console.error(`Error parsing WebSocket message: ${error}`);
          }
        }
      };
      
    }
  }, [sid]);

  useEffect(() => {
    const sortedContracts = [...contractsArray].sort((a, b) => {
      const changeA = parseFloat(a.priceChangePercent);
      const changeB = parseFloat(b.priceChangePercent);

      if (sortOption === 'ascending') {
        return changeA - changeB;
      } else if (sortOption === 'descending') {
        return changeB - changeA;
      } else {
        return 0;
      }
    });

    setSortedContracts(sortedContracts); 
  }, [sortOption, contractsArray]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  return (
    <div>
      <h1>Crypto Contracts</h1>
      <select value={sortOption} onChange={handleSortChange}>
        <option value="default">Default</option>
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
      <Table contracts={sortedContracts} /> 
    </div>
  );
}

export default CryptoContractsPage;