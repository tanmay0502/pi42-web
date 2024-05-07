import Image from 'next/image';
import React from 'react';

type Contract = {
  name: string;
  lastPrice: string;
  priceChangePercent: string;
  baseAssetVolume: string;
};

type Margin = {
  [name: string]: {
    '24hrHigh': string;
    '24hrLow': string;
  };
};

const Table = ({ contracts, margin }: { contracts: Contract[], margin: Margin }) => {


    const generateMessage = (contract: Contract) => {
      return `Welcome to Pi42! Today's update on ${contract.name}.
        Symbol name: ${contract.name}
        Last price: ${contract.lastPrice}
        24 hour change percentage: ${contract.priceChangePercent}
        24 hour volume: ${contract.baseAssetVolume}
        24 hour high: ${margin[contract.name]?.['24hrHigh'] || 'Loading..'}
        24 hour low: ${margin[contract.name]?.['24hrLow'] || 'Loading..'}`;
    };
    
    const handleDownload = (contract: Contract) => {
      const message = generateMessage(contract);
      const fileName = `${contract.name}_details.txt`;
    
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(message));
      element.setAttribute('download', fileName);
    
      element.style.display = 'none';
      document.body.appendChild(element);
    
      element.click();
    
      document.body.removeChild(element);
    };
    
    const handleShare = (contract: Contract) => {
      const message = generateMessage(contract);
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    
      if (navigator.share) {
        navigator.share({
          text: message,
          url: whatsappUrl,
        }).catch(console.error);
      } else {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(message));
        element.setAttribute('download', `${contract.name}_details.txt`);
    
        element.style.display = 'none';
        document.body.appendChild(element);
    
        element.click();
    
        document.body.removeChild(element);
      }
    };
  

  return (
    <table>
      <thead>
        <tr className='head'>
          <th>Symbol Name</th>
          <th>Last Price</th>
          <th>24 Hour Change %</th>
          <th>24 Hour Volume</th>
          <th>24 Hour High</th>
          <th>24 Hour Low</th>
          <th>Share</th>
        </tr>
      </thead>
      <tbody>
        {contracts.map((contract: Contract, index: number) => (
          <tr key={index}>
            <td>{contract.name}</td>
            <td>{parseFloat(contract.lastPrice).toLocaleString('en-IN')}</td>
            <td className={parseFloat(contract.priceChangePercent) < 0 ? 'negative' : 'positive'}>
              {parseFloat(contract.priceChangePercent).toLocaleString('en-IN')}%
            </td>
            <td>{parseFloat(contract.baseAssetVolume).toLocaleString('en-IN')}</td>
            <td>{margin[contract.name]?.['24hrHigh'] ? parseFloat(margin[contract.name]['24hrHigh']).toLocaleString('en-IN') : 'Loading..'}</td>
            <td>{margin[contract.name]?.['24hrLow'] ? parseFloat(margin[contract.name]['24hrLow']).toLocaleString('en-IN') : 'Loading..'}</td>
            <td>
              <div className='flex'>
                <Image className='cursor-pointer mx-2' height={25} width={25} src={'/whatsapp.svg'} alt="share" onClick={() => handleShare(contract)} />
                <Image className='cursor-pointer ml-2' height={25} width={25} src={'/download.png'} alt="share" onClick={() => handleDownload(contract)} />  
              </div>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  );
};

export default Table;
