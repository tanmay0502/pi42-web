import React from 'react';

const Table = ({ contracts }) => {
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
        {contracts.map((contract, index) => (
          <tr key={index}>
            <td>{contract.name}</td>
            <td>{contract.lastPrice}</td>
            <td>{contract.priceChangePercent}</td>
            <td>{contract.baseAssetVolume}</td>
            <td>Placeholder</td>
            <td>Placeholder</td>
            <td>Placeholder</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
