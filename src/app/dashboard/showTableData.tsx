"use client"
import React, { useEffect, useState, useRef } from 'react';
import Table from '@/components/Table';
import getCList from '@/components/fetchSID';
import { count } from 'console';

const CryptoContractsPage: React.FC = () => {

  const [sid, setSid] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("default");
  const [contractsArray, setContractsArray] = useState<any[]>([]);
  const [sortedContracts, setSortedContracts] = useState<any[]>([]); 
  const isSubscribed = useRef(false);
  const [contractsObject, setContractsObject] = useState<Record<string, any>>({}); 
  const [high, setHigh] = useState<boolean>(false);

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
                ...contractDetails as object
              }));
            
              setContractsArray(contractsArray);
            
              // Generate the params array
              if (!isSubscribed.current) {
                const params = contractsArray.map(contract => `${contract.name.toLowerCase()}@ticker`);
                socket.send(`42["subscribe",{"params":${JSON.stringify(params)}}]`);
                isSubscribed.current = true;
              }
            }else if( messageType === '24hrTicker'){

              setContractsObject(prevContracts => ({
                ...prevContracts,
                [messageData.s]: {
                  ...prevContracts[messageData.s],
                  '24hrLow': messageData.l,
                  '24hrHigh': messageData.h
                }
              }));
            }

              
            
          } catch (error) {
            console.error(`Error parsing WebSocket message: ${error}`);
          }
        }
      };
      
    }
  }, [sid]);


  // useEffect(() => {
  //   if((Object.keys(contractsObject).length === contractsArray.length) && !high ){
  //     console.log(contractsObject)
  //     console.log(contractsArray)

  //       const updatedContractsArray = contractsArray.map(contract => {
  //         const contractDetails = contractsObject[contract.name];
  //         if (contractDetails) {
  //           return {
  //             ...contract,
  //             '24hrHigh': contractDetails['24hrHigh'],
  //             '24hrLow': contractDetails['24hrLow']
  //           };
  //         } else {
  //           return contract;
  //         }

  //       });

  //       setContractsArray(updatedContractsArray);
  //       setHigh(true);
  //   }
          
  // }, [contractsObject]);

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
    <div className='container'>
        <h1>Crypto Contracts</h1>
        <p className=''>Sort By 24 Hour Percentage Change?</p>
        <select value={sortOption} onChange={handleSortChange}>
          <option value="default">Default</option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      <Table contracts={sortedContracts} margin = {contractsObject} /> 
    </div>
  );
}

export default CryptoContractsPage;
