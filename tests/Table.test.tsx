import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CryptoContractsPage from '@/app/dashboard/showTableData';

describe('CryptoContractsPage', () => {
  const contracts = [
    { name: 'Contract1', lastPrice: '100', priceChangePercent: '1', baseAssetVolume: '1000' },
    { name: 'Contract2', lastPrice: '200', priceChangePercent: '2', baseAssetVolume: '2000' },
    { name: 'Contract3', lastPrice: '150', priceChangePercent: '1.5', baseAssetVolume: '1500' },
  ];

  const margin = {
    Contract1: { '24hrHigh': '110', '24hrLow': '90' },
    Contract2: { '24hrHigh': '220', '24hrLow': '180' },
    Contract3: { '24hrHigh': '160', '24hrLow': '140' },
  };

  it('sorts the contracts by 24 hour change percentage in ascending order when the Ascending option is selected', async () => {
    const { getByText, getAllByRole, findByText } = render(<CryptoContractsPage />);

    global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ contracts, margin }),
        }) as Promise<Response>
      );
      
    fireEvent.change(getByText('Sort By 24 Hour Percentage Change?'), { target: { value: 'ascending' } });
    
    await findByText('Contract1');

    const rows = getAllByRole('row');
    expect(rows[1].textContent).toContain('Contract1');
    expect(rows[2].textContent).toContain('Contract3');
    expect(rows[3].textContent).toContain('Contract2');
  });
});
