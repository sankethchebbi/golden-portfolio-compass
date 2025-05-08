
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SchemeData, formatCurrency } from '@/data/mockData';

interface DashboardHeaderProps {
  scheme: SchemeData;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ scheme }) => {
  if (!scheme) return null;

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{scheme.name}</h1>
          <p className="text-slate-400">
            Managed by <span className="text-slate-300">{scheme.manager}</span> | {scheme.clientType === 'client' ? 'Client Facing' : 'Proprietary Fund'}
          </p>
        </div>
        
        <div className="text-right mt-4 md:mt-0">
          <p className="text-slate-400">{today}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card-gradient border-none shadow-md">
          <CardContent className="p-4 flex flex-col">
            <span className="text-sm text-slate-400">AUM</span>
            <span className="text-xl font-bold text-white">{formatCurrency(scheme.aum, scheme.currency)}</span>
          </CardContent>
        </Card>

        <Card className="bg-card-gradient border-none shadow-md">
          <CardContent className="p-4 flex flex-col">
            <span className="text-sm text-slate-400">Benchmark</span>
            <span className="text-xl font-bold text-white">{scheme.benchmark}</span>
          </CardContent>
        </Card>

        <Card className="bg-card-gradient border-none shadow-md">
          <CardContent className="p-4 flex flex-col">
            <span className="text-sm text-slate-400">Inception Date</span>
            <span className="text-xl font-bold text-white">
              {new Date(scheme.inceptionDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </CardContent>
        </Card>

        <Card className="bg-card-gradient border-none shadow-md">
          <CardContent className="p-4 flex flex-col">
            <span className="text-sm text-slate-400">Currency</span>
            <span className="text-xl font-bold text-white">{scheme.currency}</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
