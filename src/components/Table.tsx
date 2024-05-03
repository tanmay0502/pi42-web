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
  return (
    <table>
      <thead>
        <tr>
          <th>Symbol Name</th>
          <th>Last Price</th>
          <th>24 Hour Change Percentage</th>
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
            <td>{contract.lastPrice}</td>
            <td>{contract.priceChangePercent}</td>
            <td>{contract.baseAssetVolume}</td>
            <td>{margin[contract.name]?.['24hrHigh'] || 'N/A'}</td>
            <td>{margin[contract.name]?.['24hrLow'] || 'N/A'}</td>
            <td>Placeholder</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
