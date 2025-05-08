
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Holding, SchemeData, formatNumber, formatPercentage } from '@/data/mockData';
import { ChevronDown, Search } from 'lucide-react';

interface PortfolioHoldingsProps {
  scheme: SchemeData;
}

export const PortfolioHoldings: React.FC<PortfolioHoldingsProps> = ({ scheme }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Holding;
    direction: 'ascending' | 'descending';
  }>({
    key: 'weight',
    direction: 'descending',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSector, setFilterSector] = useState('');

  if (!scheme || !scheme.holdings) return null;

  // Get unique sectors for filtering
  const uniqueSectors = [...new Set(scheme.holdings.map(holding => holding.sector))];

  // Filter and sort holdings
  const filteredHoldings = scheme.holdings
    .filter(holding => 
      holding.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      holding.ticker.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(holding => !filterSector || holding.sector === filterSector);

  const sortedHoldings = [...filteredHoldings].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: keyof Holding) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'ascending' 
        ? 'descending' 
        : 'ascending',
    }));
  };

  return (
    <Card className="bg-card-gradient border-none shadow-md">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <CardTitle className="text-lg font-medium text-white">Portfolio Holdings</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search holdings..."
                className="pl-8 h-9 w-full sm:w-[180px] bg-dashboard-card border-slate-700 text-slate-100"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9 bg-dashboard-card border-slate-700 text-slate-100">
                  {filterSector ? filterSector : "All Sectors"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-dashboard-card border-slate-700 text-slate-100">
                <DropdownMenuItem onClick={() => setFilterSector('')}>
                  All Sectors
                </DropdownMenuItem>
                {uniqueSectors.map(sector => (
                  <DropdownMenuItem key={sector} onClick={() => setFilterSector(sector)}>
                    {sector}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-slate-700 overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-800">
              <TableRow>
                <TableHead className="text-slate-300" onClick={() => requestSort('name')}>
                  Name/Ticker
                </TableHead>
                <TableHead className="text-slate-300" onClick={() => requestSort('sector')}>
                  Sector/Industry
                </TableHead>
                <TableHead className="text-right text-slate-300" onClick={() => requestSort('weight')}>
                  Weight
                </TableHead>
                <TableHead className="text-right text-slate-300" onClick={() => requestSort('value')}>
                  Value
                </TableHead>
                <TableHead className="text-right text-slate-300" onClick={() => requestSort('dayChange')}>
                  1D Change
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedHoldings.map((holding) => (
                <TableRow key={holding.ticker} className="border-slate-700">
                  <TableCell>
                    <div className="font-medium text-slate-100">{holding.name}</div>
                    <div className="text-sm text-slate-400">{holding.ticker}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-slate-100">{holding.sector}</div>
                    <div className="text-sm text-slate-400">{holding.industry}</div>
                  </TableCell>
                  <TableCell className="text-right font-medium text-slate-100">
                    {formatPercentage(holding.weight)}
                  </TableCell>
                  <TableCell className="text-right font-medium text-slate-100">
                    {scheme.currency} {formatNumber(holding.value / 1000000, 1)}M
                  </TableCell>
                  <TableCell className={`text-right font-medium ${holding.dayChange >= 0 ? 'text-dashboard-positive' : 'text-dashboard-negative'}`}>
                    {formatPercentage(holding.dayChange)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
