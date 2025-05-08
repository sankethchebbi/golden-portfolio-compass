
export type ClientType = 'client' | 'prop';
export type FundManager = string;
export type Scheme = string;
export type TimelinePeriod = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | 'YTD' | 'MTD' | 'FYTD' | 'SI';

export interface Performance {
  period: TimelinePeriod;
  schemeReturn: number;
  benchmarkReturn: number;
}

export interface Holding {
  name: string;
  ticker: string;
  weight: number;
  sector: string;
  industry: string;
  value: number;
  dayChange: number;
}

export interface SectorAllocation {
  sector: string;
  weight: number;
  industries: { name: string; weight: number }[];
}

export interface HistoricalData {
  date: string;
  schemeValue: number;
  benchmarkValue: number;
}

export interface SchemeData {
  id: string;
  name: string;
  manager: string;
  clientType: ClientType;
  benchmark: string;
  inceptionDate: string;
  aum: number;
  currency: string;
  performances: Performance[];
  holdings: Holding[];
  sectorAllocations: SectorAllocation[];
  historicalData: HistoricalData[];
}

// Mock Data
export const fundManagers: string[] = [
  'Jane Smith',
  'John Doe',
  'Robert Johnson',
  'Laura Chen'
];

export const schemes: { [manager: string]: SchemeData[] } = {
  'Jane Smith': [
    {
      id: 'js-global-tech',
      name: 'Global Tech Opportunities',
      manager: 'Jane Smith',
      clientType: 'client',
      benchmark: 'NASDAQ-100',
      inceptionDate: '2019-03-15',
      aum: 1250000000,
      currency: 'USD',
      performances: [
        { period: '1D', schemeReturn: 0.32, benchmarkReturn: 0.28 },
        { period: '1W', schemeReturn: 1.7, benchmarkReturn: 1.2 },
        { period: '1M', schemeReturn: 3.2, benchmarkReturn: 2.8 },
        { period: '3M', schemeReturn: 8.5, benchmarkReturn: 7.2 },
        { period: '6M', schemeReturn: 14.2, benchmarkReturn: 12.5 },
        { period: '1Y', schemeReturn: 22.5, benchmarkReturn: 18.7 },
        { period: 'YTD', schemeReturn: 12.3, benchmarkReturn: 10.5 },
        { period: 'MTD', schemeReturn: 2.8, benchmarkReturn: 2.2 },
        { period: 'FYTD', schemeReturn: 15.4, benchmarkReturn: 13.7 },
        { period: 'SI', schemeReturn: 87.5, benchmarkReturn: 72.3 }
      ],
      holdings: [
        { name: 'Apple Inc', ticker: 'AAPL', weight: 8.5, sector: 'Technology', industry: 'Consumer Electronics', value: 106250000, dayChange: 0.68 },
        { name: 'Microsoft Corp', ticker: 'MSFT', weight: 7.8, sector: 'Technology', industry: 'Software', value: 97500000, dayChange: 0.42 },
        { name: 'NVIDIA Corp', ticker: 'NVDA', weight: 6.5, sector: 'Technology', industry: 'Semiconductors', value: 81250000, dayChange: 1.24 },
        { name: 'Amazon.com Inc', ticker: 'AMZN', weight: 6.2, sector: 'Consumer Discretionary', industry: 'E-Commerce', value: 77500000, dayChange: -0.32 },
        { name: 'Alphabet Inc', ticker: 'GOOGL', weight: 5.7, sector: 'Communication Services', industry: 'Internet Content', value: 71250000, dayChange: 0.18 },
        { name: 'Tesla Inc', ticker: 'TSLA', weight: 4.8, sector: 'Consumer Discretionary', industry: 'Auto Manufacturers', value: 60000000, dayChange: -1.53 },
        { name: 'Meta Platforms Inc', ticker: 'META', weight: 4.5, sector: 'Communication Services', industry: 'Social Media', value: 56250000, dayChange: 0.87 },
        { name: 'Taiwan Semiconductor', ticker: 'TSM', weight: 3.8, sector: 'Technology', industry: 'Semiconductors', value: 47500000, dayChange: 0.24 },
        { name: 'Broadcom Inc', ticker: 'AVGO', weight: 3.2, sector: 'Technology', industry: 'Semiconductors', value: 40000000, dayChange: 0.52 },
        { name: 'Adobe Inc', ticker: 'ADBE', weight: 3.0, sector: 'Technology', industry: 'Software', value: 37500000, dayChange: -0.28 }
      ],
      sectorAllocations: [
        { 
          sector: 'Technology', 
          weight: 42.3,
          industries: [
            { name: 'Software', weight: 15.2 },
            { name: 'Semiconductors', weight: 14.5 },
            { name: 'Consumer Electronics', weight: 9.8 },
            { name: 'IT Services', weight: 2.8 }
          ]
        },
        { 
          sector: 'Communication Services', 
          weight: 15.6,
          industries: [
            { name: 'Social Media', weight: 8.3 },
            { name: 'Internet Content', weight: 7.3 }
          ]
        },
        { 
          sector: 'Consumer Discretionary', 
          weight: 14.2,
          industries: [
            { name: 'E-Commerce', weight: 8.7 },
            { name: 'Auto Manufacturers', weight: 5.5 }
          ]
        },
        { 
          sector: 'Healthcare', 
          weight: 10.5,
          industries: [
            { name: 'Biotechnology', weight: 5.8 },
            { name: 'Medical Devices', weight: 4.7 }
          ]
        },
        { 
          sector: 'Financials', 
          weight: 8.7,
          industries: [
            { name: 'Banks', weight: 4.5 },
            { name: 'Financial Services', weight: 4.2 }
          ]
        },
        { 
          sector: 'Other', 
          weight: 8.7,
          industries: [
            { name: 'Various', weight: 8.7 }
          ]
        }
      ],
      historicalData: Array.from({ length: 365 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (364 - i));
        
        // Generate somewhat realistic stock data with some correlation
        const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (24 * 60 * 60 * 1000));
        const baseValue = 1000 + (dayOfYear * 0.5) + (Math.sin(dayOfYear / 30) * 50);
        const schemeValue = baseValue + (Math.random() * 20) - 10 + (i * 0.8);
        const benchmarkValue = baseValue + (Math.random() * 20) - 12 + (i * 0.65);
        
        return {
          date: date.toISOString().split('T')[0],
          schemeValue: Number(schemeValue.toFixed(2)),
          benchmarkValue: Number(benchmarkValue.toFixed(2))
        };
      })
    },
    {
      id: 'js-asia-growth',
      name: 'Asia Growth Fund',
      manager: 'Jane Smith',
      clientType: 'prop',
      benchmark: 'MSCI Asia',
      inceptionDate: '2020-06-22',
      aum: 820000000,
      currency: 'USD',
      performances: [
        { period: '1D', schemeReturn: -0.18, benchmarkReturn: -0.22 },
        { period: '1W', schemeReturn: 0.94, benchmarkReturn: 0.78 },
        { period: '1M', schemeReturn: 2.6, benchmarkReturn: 2.1 },
        { period: '3M', schemeReturn: 6.8, benchmarkReturn: 5.9 },
        { period: '6M', schemeReturn: 11.3, benchmarkReturn: 10.2 },
        { period: '1Y', schemeReturn: 17.8, benchmarkReturn: 15.5 },
        { period: 'YTD', schemeReturn: 9.4, benchmarkReturn: 8.1 },
        { period: 'MTD', schemeReturn: 1.8, benchmarkReturn: 1.5 },
        { period: 'FYTD', schemeReturn: 12.6, benchmarkReturn: 11.2 },
        { period: 'SI', schemeReturn: 56.2, benchmarkReturn: 48.7 }
      ],
      holdings: [
        { name: 'Taiwan Semiconductor', ticker: 'TSM', weight: 7.8, sector: 'Technology', industry: 'Semiconductors', value: 63960000, dayChange: 0.42 },
        { name: 'Samsung Electronics', ticker: 'SSNLF', weight: 7.2, sector: 'Technology', industry: 'Consumer Electronics', value: 59040000, dayChange: -0.28 },
        { name: 'Tencent Holdings', ticker: '0700.HK', weight: 6.5, sector: 'Communication Services', industry: 'Internet Content', value: 53300000, dayChange: 0.87 },
        { name: 'Alibaba Group', ticker: 'BABA', weight: 5.8, sector: 'Consumer Discretionary', industry: 'E-Commerce', value: 47560000, dayChange: -0.32 },
        { name: 'Reliance Industries', ticker: 'RELIANCE.NS', weight: 4.3, sector: 'Energy', industry: 'Oil & Gas', value: 35260000, dayChange: 0.24 }
      ],
      sectorAllocations: [
        { 
          sector: 'Technology', 
          weight: 38.6,
          industries: [
            { name: 'Semiconductors', weight: 16.2 },
            { name: 'Consumer Electronics', weight: 12.5 },
            { name: 'Software', weight: 9.9 }
          ]
        },
        { 
          sector: 'Consumer Discretionary', 
          weight: 18.4,
          industries: [
            { name: 'E-Commerce', weight: 11.2 },
            { name: 'Auto Manufacturers', weight: 7.2 }
          ]
        },
        { 
          sector: 'Financials', 
          weight: 14.7,
          industries: [
            { name: 'Banks', weight: 9.8 },
            { name: 'Insurance', weight: 4.9 }
          ]
        },
        { 
          sector: 'Communication Services', 
          weight: 12.8,
          industries: [
            { name: 'Internet Content', weight: 8.6 },
            { name: 'Telecom', weight: 4.2 }
          ]
        },
        { 
          sector: 'Energy', 
          weight: 8.2,
          industries: [
            { name: 'Oil & Gas', weight: 5.8 },
            { name: 'Renewable Energy', weight: 2.4 }
          ]
        },
        { 
          sector: 'Other', 
          weight: 7.3,
          industries: [
            { name: 'Various', weight: 7.3 }
          ]
        }
      ],
      historicalData: Array.from({ length: 365 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (364 - i));
        
        // Generate somewhat realistic stock data with some correlation
        const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (24 * 60 * 60 * 1000));
        const baseValue = 1000 + (dayOfYear * 0.4) + (Math.sin(dayOfYear / 32) * 40);
        const schemeValue = baseValue + (Math.random() * 15) - 7 + (i * 0.6);
        const benchmarkValue = baseValue + (Math.random() * 15) - 8 + (i * 0.55);
        
        return {
          date: date.toISOString().split('T')[0],
          schemeValue: Number(schemeValue.toFixed(2)),
          benchmarkValue: Number(benchmarkValue.toFixed(2))
        };
      })
    }
  ],
  'John Doe': [
    {
      id: 'jd-global-macro',
      name: 'Global Macro Strategy',
      manager: 'John Doe',
      clientType: 'prop',
      benchmark: 'S&P 500',
      inceptionDate: '2018-05-10',
      aum: 1850000000,
      currency: 'USD',
      performances: [
        { period: '1D', schemeReturn: 0.15, benchmarkReturn: 0.22 },
        { period: '1W', schemeReturn: 0.84, benchmarkReturn: 0.67 },
        { period: '1M', schemeReturn: 2.9, benchmarkReturn: 2.3 },
        { period: '3M', schemeReturn: 7.4, benchmarkReturn: 6.2 },
        { period: '6M', schemeReturn: 12.5, benchmarkReturn: 10.8 },
        { period: '1Y', schemeReturn: 19.3, benchmarkReturn: 16.5 },
        { period: 'YTD', schemeReturn: 10.7, benchmarkReturn: 9.2 },
        { period: 'MTD', schemeReturn: 2.3, benchmarkReturn: 1.9 },
        { period: 'FYTD', schemeReturn: 13.8, benchmarkReturn: 11.5 },
        { period: 'SI', schemeReturn: 95.2, benchmarkReturn: 78.9 }
      ],
      holdings: [
        { name: 'Apple Inc', ticker: 'AAPL', weight: 6.2, sector: 'Technology', industry: 'Consumer Electronics', value: 114700000, dayChange: 0.32 },
        { name: 'Microsoft Corp', ticker: 'MSFT', weight: 5.9, sector: 'Technology', industry: 'Software', value: 109150000, dayChange: 0.58 },
        { name: 'Amazon.com Inc', ticker: 'AMZN', weight: 5.3, sector: 'Consumer Discretionary', industry: 'E-Commerce', value: 98050000, dayChange: -0.12 },
        { name: 'Berkshire Hathaway', ticker: 'BRK.B', weight: 4.8, sector: 'Financials', industry: 'Holding Companies', value: 88800000, dayChange: 0.24 },
        { name: 'UnitedHealth Group', ticker: 'UNH', weight: 3.6, sector: 'Healthcare', industry: 'Health Insurance', value: 66600000, dayChange: 0.47 }
      ],
      sectorAllocations: [
        { 
          sector: 'Technology', 
          weight: 26.5,
          industries: [
            { name: 'Software', weight: 12.3 },
            { name: 'Consumer Electronics', weight: 8.2 },
            { name: 'Semiconductors', weight: 6.0 }
          ]
        },
        { 
          sector: 'Financials', 
          weight: 22.8,
          industries: [
            { name: 'Banks', weight: 10.5 },
            { name: 'Holding Companies', weight: 7.8 },
            { name: 'Insurance', weight: 4.5 }
          ]
        },
        { 
          sector: 'Healthcare', 
          weight: 16.3,
          industries: [
            { name: 'Pharmaceuticals', weight: 8.2 },
            { name: 'Health Insurance', weight: 5.1 },
            { name: 'Medical Devices', weight: 3.0 }
          ]
        },
        { 
          sector: 'Consumer Discretionary', 
          weight: 12.7,
          industries: [
            { name: 'E-Commerce', weight: 6.5 },
            { name: 'Retail', weight: 3.7 },
            { name: 'Auto Manufacturers', weight: 2.5 }
          ]
        },
        { 
          sector: 'Energy', 
          weight: 9.8,
          industries: [
            { name: 'Oil & Gas', weight: 6.3 },
            { name: 'Renewable Energy', weight: 3.5 }
          ]
        },
        { 
          sector: 'Other', 
          weight: 11.9,
          industries: [
            { name: 'Various', weight: 11.9 }
          ]
        }
      ],
      historicalData: Array.from({ length: 365 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (364 - i));
        
        const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (24 * 60 * 60 * 1000));
        const baseValue = 1000 + (dayOfYear * 0.55) + (Math.sin(dayOfYear / 35) * 45);
        const schemeValue = baseValue + (Math.random() * 18) - 8 + (i * 0.9);
        const benchmarkValue = baseValue + (Math.random() * 18) - 10 + (i * 0.75);
        
        return {
          date: date.toISOString().split('T')[0],
          schemeValue: Number(schemeValue.toFixed(2)),
          benchmarkValue: Number(benchmarkValue.toFixed(2))
        };
      })
    }
  ],
  'Robert Johnson': [
    {
      id: 'rj-fixed-income',
      name: 'Fixed Income Plus',
      manager: 'Robert Johnson',
      clientType: 'client',
      benchmark: 'Bloomberg Global Aggregate',
      inceptionDate: '2021-01-15',
      aum: 950000000,
      currency: 'USD',
      performances: [
        { period: '1D', schemeReturn: 0.05, benchmarkReturn: 0.03 },
        { period: '1W', schemeReturn: 0.35, benchmarkReturn: 0.28 },
        { period: '1M', schemeReturn: 1.4, benchmarkReturn: 1.1 },
        { period: '3M', schemeReturn: 3.2, benchmarkReturn: 2.8 },
        { period: '6M', schemeReturn: 5.7, benchmarkReturn: 4.9 },
        { period: '1Y', schemeReturn: 8.3, benchmarkReturn: 7.5 },
        { period: 'YTD', schemeReturn: 4.6, benchmarkReturn: 3.9 },
        { period: 'MTD', schemeReturn: 1.2, benchmarkReturn: 0.9 },
        { period: 'FYTD', schemeReturn: 6.5, benchmarkReturn: 5.8 },
        { period: 'SI', schemeReturn: 21.6, benchmarkReturn: 18.3 }
      ],
      holdings: [
        { name: 'US Treasury Bond 2.25% 2031', ticker: 'US912810SU33', weight: 8.5, sector: 'Government', industry: 'Treasury', value: 80750000, dayChange: 0.08 },
        { name: 'Microsoft Corp 3.3% 2027', ticker: 'MSFT27', weight: 6.2, sector: 'Corporate', industry: 'Technology', value: 58900000, dayChange: 0.05 },
        { name: 'Apple Inc 2.8% 2026', ticker: 'AAPL26', weight: 5.8, sector: 'Corporate', industry: 'Technology', value: 55100000, dayChange: 0.03 },
        { name: 'JPMorgan Chase 3.5% 2028', ticker: 'JPM28', weight: 5.2, sector: 'Corporate', industry: 'Financials', value: 49400000, dayChange: 0.06 },
        { name: 'German Govt Bond 0.5% 2027', ticker: 'DE0001102416', weight: 4.5, sector: 'Government', industry: 'Treasury', value: 42750000, dayChange: 0.02 }
      ],
      sectorAllocations: [
        { 
          sector: 'Government', 
          weight: 35.3,
          industries: [
            { name: 'Treasury', weight: 25.2 },
            { name: 'Agency', weight: 10.1 }
          ]
        },
        { 
          sector: 'Corporate', 
          weight: 42.8,
          industries: [
            { name: 'Financials', weight: 15.6 },
            { name: 'Technology', weight: 14.2 },
            { name: 'Industrials', weight: 8.5 },
            { name: 'Utilities', weight: 4.5 }
          ]
        },
        { 
          sector: 'Securitized', 
          weight: 15.6,
          industries: [
            { name: 'MBS', weight: 9.2 },
            { name: 'ABS', weight: 6.4 }
          ]
        },
        { 
          sector: 'Municipal', 
          weight: 4.2,
          industries: [
            { name: 'Revenue', weight: 2.5 },
            { name: 'General Obligation', weight: 1.7 }
          ]
        },
        { 
          sector: 'Other', 
          weight: 2.1,
          industries: [
            { name: 'Various', weight: 2.1 }
          ]
        }
      ],
      historicalData: Array.from({ length: 365 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (364 - i));
        
        const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (24 * 60 * 60 * 1000));
        const baseValue = 1000 + (dayOfYear * 0.2) + (Math.sin(dayOfYear / 40) * 20);
        const schemeValue = baseValue + (Math.random() * 5) - 2 + (i * 0.25);
        const benchmarkValue = baseValue + (Math.random() * 5) - 2.5 + (i * 0.22);
        
        return {
          date: date.toISOString().split('T')[0],
          schemeValue: Number(schemeValue.toFixed(2)),
          benchmarkValue: Number(benchmarkValue.toFixed(2))
        };
      })
    },
    {
      id: 'rj-credit-opps',
      name: 'Credit Opportunities',
      manager: 'Robert Johnson',
      clientType: 'client',
      benchmark: 'ICE BofA US Corporate',
      inceptionDate: '2020-08-03',
      aum: 720000000,
      currency: 'USD',
      performances: [
        { period: '1D', schemeReturn: 0.08, benchmarkReturn: 0.04 },
        { period: '1W', schemeReturn: 0.45, benchmarkReturn: 0.32 },
        { period: '1M', schemeReturn: 1.6, benchmarkReturn: 1.2 },
        { period: '3M', schemeReturn: 3.8, benchmarkReturn: 3.1 },
        { period: '6M', schemeReturn: 6.5, benchmarkReturn: 5.3 },
        { period: '1Y', schemeReturn: 9.7, benchmarkReturn: 7.8 },
        { period: 'YTD', schemeReturn: 5.2, benchmarkReturn: 4.2 },
        { period: 'MTD', schemeReturn: 1.3, benchmarkReturn: 1.0 },
        { period: 'FYTD', schemeReturn: 7.3, benchmarkReturn: 5.9 },
        { period: 'SI', schemeReturn: 34.8, benchmarkReturn: 27.5 }
      ],
      holdings: [
        { name: 'Bank of America 4.2% 2029', ticker: 'BAC29', weight: 5.8, sector: 'Corporate', industry: 'Financials', value: 41760000, dayChange: 0.12 },
        { name: 'AT&T Inc 3.8% 2027', ticker: 'T27', weight: 5.2, sector: 'Corporate', industry: 'Communication', value: 37440000, dayChange: 0.06 },
        { name: 'Verizon Comm 4.0% 2028', ticker: 'VZ28', weight: 4.9, sector: 'Corporate', industry: 'Communication', value: 35280000, dayChange: 0.09 },
        { name: 'Amazon.com 2.9% 2027', ticker: 'AMZN27', weight: 4.6, sector: 'Corporate', industry: 'Technology', value: 33120000, dayChange: 0.04 },
        { name: 'Wells Fargo 3.9% 2026', ticker: 'WFC26', weight: 4.3, sector: 'Corporate', industry: 'Financials', value: 30960000, dayChange: 0.07 }
      ],
      sectorAllocations: [
        { 
          sector: 'Corporate', 
          weight: 87.5,
          industries: [
            { name: 'Financials', weight: 32.8 },
            { name: 'Communication', weight: 18.5 },
            { name: 'Technology', weight: 15.2 },
            { name: 'Energy', weight: 12.6 },
            { name: 'Healthcare', weight: 8.4 }
          ]
        },
        { 
          sector: 'Government', 
          weight: 5.2,
          industries: [
            { name: 'Treasury', weight: 5.2 }
          ]
        },
        { 
          sector: 'Securitized', 
          weight: 4.8,
          industries: [
            { name: 'MBS', weight: 2.8 },
            { name: 'ABS', weight: 2.0 }
          ]
        },
        { 
          sector: 'Other', 
          weight: 2.5,
          industries: [
            { name: 'Various', weight: 2.5 }
          ]
        }
      ],
      historicalData: Array.from({ length: 365 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (364 - i));
        
        const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (24 * 60 * 60 * 1000));
        const baseValue = 1000 + (dayOfYear * 0.25) + (Math.sin(dayOfYear / 38) * 25);
        const schemeValue = baseValue + (Math.random() * 8) - 3 + (i * 0.35);
        const benchmarkValue = baseValue + (Math.random() * 8) - 4 + (i * 0.28);
        
        return {
          date: date.toISOString().split('T')[0],
          schemeValue: Number(schemeValue.toFixed(2)),
          benchmarkValue: Number(benchmarkValue.toFixed(2))
        };
      })
    }
  ],
  'Laura Chen': [
    {
      id: 'lc-quant-equity',
      name: 'Quantitative Equity Strategy',
      manager: 'Laura Chen',
      clientType: 'prop',
      benchmark: 'MSCI World',
      inceptionDate: '2017-11-08',
      aum: 1620000000,
      currency: 'USD',
      performances: [
        { period: '1D', schemeReturn: 0.28, benchmarkReturn: 0.21 },
        { period: '1W', schemeReturn: 1.45, benchmarkReturn: 1.12 },
        { period: '1M', schemeReturn: 3.8, benchmarkReturn: 3.1 },
        { period: '3M', schemeReturn: 9.2, benchmarkReturn: 7.5 },
        { period: '6M', schemeReturn: 15.8, benchmarkReturn: 13.2 },
        { period: '1Y', schemeReturn: 24.5, benchmarkReturn: 19.8 },
        { period: 'YTD', schemeReturn: 13.2, benchmarkReturn: 10.8 },
        { period: 'MTD', schemeReturn: 3.1, benchmarkReturn: 2.5 },
        { period: 'FYTD', schemeReturn: 16.7, benchmarkReturn: 13.9 },
        { period: 'SI', schemeReturn: 158.3, benchmarkReturn: 124.7 }
      ],
      holdings: [
        { name: 'Apple Inc', ticker: 'AAPL', weight: 4.8, sector: 'Technology', industry: 'Consumer Electronics', value: 77760000, dayChange: 0.42 },
        { name: 'Microsoft Corp', ticker: 'MSFT', weight: 4.5, sector: 'Technology', industry: 'Software', value: 72900000, dayChange: 0.65 },
        { name: 'ASML Holding', ticker: 'ASML', weight: 3.8, sector: 'Technology', industry: 'Semiconductors', value: 61560000, dayChange: 1.23 },
        { name: 'LVMH', ticker: 'MC.PA', weight: 3.5, sector: 'Consumer Discretionary', industry: 'Luxury Goods', value: 56700000, dayChange: 0.78 },
        { name: 'Novo Nordisk', ticker: 'NVO', weight: 3.2, sector: 'Healthcare', industry: 'Pharmaceuticals', value: 51840000, dayChange: 0.35 }
      ],
      sectorAllocations: [
        { 
          sector: 'Technology', 
          weight: 28.6,
          industries: [
            { name: 'Software', weight: 12.8 },
            { name: 'Semiconductors', weight: 8.5 },
            { name: 'Consumer Electronics', weight: 7.3 }
          ]
        },
        { 
          sector: 'Healthcare', 
          weight: 18.4,
          industries: [
            { name: 'Pharmaceuticals', weight: 10.2 },
            { name: 'Medical Devices', weight: 5.6 },
            { name: 'Biotechnology', weight: 2.6 }
          ]
        },
        { 
          sector: 'Financials', 
          weight: 15.7,
          industries: [
            { name: 'Banks', weight: 8.3 },
            { name: 'Insurance', weight: 4.2 },
            { name: 'Asset Management', weight: 3.2 }
          ]
        },
        { 
          sector: 'Consumer Discretionary', 
          weight: 13.5,
          industries: [
            { name: 'Luxury Goods', weight: 7.8 },
            { name: 'E-Commerce', weight: 5.7 }
          ]
        },
        { 
          sector: 'Industrials', 
          weight: 12.2,
          industries: [
            { name: 'Machinery', weight: 5.8 },
            { name: 'Aerospace', weight: 4.3 },
            { name: 'Transportation', weight: 2.1 }
          ]
        },
        { 
          sector: 'Other', 
          weight: 11.6,
          industries: [
            { name: 'Various', weight: 11.6 }
          ]
        }
      ],
      historicalData: Array.from({ length: 365 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (364 - i));
        
        const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (24 * 60 * 60 * 1000));
        const baseValue = 1000 + (dayOfYear * 0.6) + (Math.sin(dayOfYear / 30) * 60);
        const schemeValue = baseValue + (Math.random() * 22) - 10 + (i * 1.1);
        const benchmarkValue = baseValue + (Math.random() * 22) - 12 + (i * 0.85);
        
        return {
          date: date.toISOString().split('T')[0],
          schemeValue: Number(schemeValue.toFixed(2)),
          benchmarkValue: Number(benchmarkValue.toFixed(2))
        };
      })
    },
    {
      id: 'lc-sustainable',
      name: 'Sustainable Growth Fund',
      manager: 'Laura Chen',
      clientType: 'client',
      benchmark: 'MSCI ESG Leaders',
      inceptionDate: '2019-09-28',
      aum: 980000000,
      currency: 'USD',
      performances: [
        { period: '1D', schemeReturn: 0.22, benchmarkReturn: 0.18 },
        { period: '1W', schemeReturn: 1.25, benchmarkReturn: 1.05 },
        { period: '1M', schemeReturn: 3.4, benchmarkReturn: 2.9 },
        { period: '3M', schemeReturn: 8.6, benchmarkReturn: 7.2 },
        { period: '6M', schemeReturn: 14.5, benchmarkReturn: 12.3 },
        { period: '1Y', schemeReturn: 22.8, benchmarkReturn: 18.5 },
        { period: 'YTD', schemeReturn: 12.6, benchmarkReturn: 10.4 },
        { period: 'MTD', schemeReturn: 2.7, benchmarkReturn: 2.2 },
        { period: 'FYTD', schemeReturn: 15.8, benchmarkReturn: 13.1 },
        { period: 'SI', schemeReturn: 72.4, benchmarkReturn: 58.9 }
      ],
      holdings: [
        { name: 'Tesla Inc', ticker: 'TSLA', weight: 5.2, sector: 'Consumer Discretionary', industry: 'Auto Manufacturers', value: 50960000, dayChange: 1.45 },
        { name: 'NextEra Energy', ticker: 'NEE', weight: 4.8, sector: 'Utilities', industry: 'Renewable Energy', value: 47040000, dayChange: 0.32 },
        { name: 'Schneider Electric', ticker: 'SBGSY', weight: 4.3, sector: 'Industrials', industry: 'Electrical Equipment', value: 42140000, dayChange: 0.58 },
        { name: 'Vestas Wind Systems', ticker: 'VWDRY', weight: 3.9, sector: 'Industrials', industry: 'Renewable Energy', value: 38220000, dayChange: 0.85 },
        { name: 'Beyond Meat', ticker: 'BYND', weight: 3.6, sector: 'Consumer Staples', industry: 'Food Products', value: 35280000, dayChange: -1.24 }
      ],
      sectorAllocations: [
        { 
          sector: 'Industrials', 
          weight: 24.8,
          industries: [
            { name: 'Renewable Energy', weight: 12.5 },
            { name: 'Electrical Equipment', weight: 8.2 },
            { name: 'Environmental Services', weight: 4.1 }
          ]
        },
        { 
          sector: 'Technology', 
          weight: 22.5,
          industries: [
            { name: 'Software', weight: 11.6 },
            { name: 'Semiconductors', weight: 7.2 },
            { name: 'IT Services', weight: 3.7 }
          ]
        },
        { 
          sector: 'Utilities', 
          weight: 18.3,
          industries: [
            { name: 'Renewable Energy', weight: 12.8 },
            { name: 'Water Utilities', weight: 5.5 }
          ]
        },
        { 
          sector: 'Consumer Discretionary', 
          weight: 16.4,
          industries: [
            { name: 'Auto Manufacturers', weight: 9.5 },
            { name: 'E-Commerce', weight: 6.9 }
          ]
        },
        { 
          sector: 'Consumer Staples', 
          weight: 10.2,
          industries: [
            { name: 'Food Products', weight: 6.8 },
            { name: 'Personal Products', weight: 3.4 }
          ]
        },
        { 
          sector: 'Other', 
          weight: 7.8,
          industries: [
            { name: 'Various', weight: 7.8 }
          ]
        }
      ],
      historicalData: Array.from({ length: 365 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (364 - i));
        
        const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (24 * 60 * 60 * 1000));
        const baseValue = 1000 + (dayOfYear * 0.5) + (Math.sin(dayOfYear / 32) * 50);
        const schemeValue = baseValue + (Math.random() * 20) - 9 + (i * 0.75);
        const benchmarkValue = baseValue + (Math.random() * 20) - 11 + (i * 0.6);
        
        return {
          date: date.toISOString().split('T')[0],
          schemeValue: Number(schemeValue.toFixed(2)),
          benchmarkValue: Number(benchmarkValue.toFixed(2))
        };
      })
    }
  ]
};

export const getAllSchemes = (): SchemeData[] => {
  return Object.values(schemes).flat();
};

export const getSchemesByManager = (manager: string): SchemeData[] => {
  return schemes[manager] || [];
};

export const getSchemeById = (id: string): SchemeData | undefined => {
  return getAllSchemes().find(scheme => scheme.id === id);
};

export const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (number: number, decimals: number = 2) => {
  return number.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

export const formatPercentage = (number: number) => {
  return `${number >= 0 ? '+' : ''}${number.toFixed(2)}%`;
};
