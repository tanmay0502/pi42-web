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
  const handleShare = (contract: Contract) => {
    const message = `Welcome to Pi42! Today's update on ${contract.name}.
      Symbol name: ${contract.name}
      Last price: ${contract.lastPrice}
      24 hour change percentage: ${contract.priceChangePercent}
      24 hour volume: ${contract.baseAssetVolume}
      24 hour high: ${margin[contract.name]?.['24hrHigh'] || 'Loading..'}
      24 hour low: ${margin[contract.name]?.['24hrLow'] || 'Loading..'}`;

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
            <td>{margin[contract.name]?.['24hrHigh'] || 'Loading..'}</td>
            <td>{margin[contract.name]?.['24hrLow'] || 'Loading..'}</td>
            <td><button onClick={() => handleShare(contract)}>Share</button></td>
          </tr>
        ))}

      </tbody>
    </table>
  );
};

export default Table;
