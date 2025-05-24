
import React, { useState } from 'react';
import { SelectionFilters } from '@/components/SelectionFilters';
import { DashboardHeader } from '@/components/DashboardHeader';
import { PerformanceMetrics } from '@/components/PerformanceMetrics';
import { PerformanceChart } from '@/components/PerformanceChart';
import { ClientType, SchemeData, getSchemeById } from '@/data/mockData';
import { RiskMetrics } from '@/components/RiskMetrics';

const Index = () => {
  const [selectedScheme, setSelectedScheme] = useState<SchemeData | null>(null);

  const handleSelectionChange = (clientType: ClientType, manager: string, schemeId: string) => {
    const scheme = getSchemeById(schemeId);
    if (scheme) {
      setSelectedScheme(scheme);
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-background text-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Hedge Fund Dashboard</h1>
        </div>
        
        <div className="space-y-6">
          <SelectionFilters onSelectionChange={handleSelectionChange} />
          
          {selectedScheme ? (
            <>
              <DashboardHeader scheme={selectedScheme} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PerformanceMetrics scheme={selectedScheme} />
                <RiskMetrics scheme={selectedScheme} />
              </div>
              
              <PerformanceChart scheme={selectedScheme} />
            </>
          ) : (
            <div className="flex items-center justify-center min-h-[400px] rounded-lg border border-dashed border-slate-300 bg-dashboard-card">
              <div className="text-center p-8">
                <h3 className="text-xl font-medium text-slate-800 mb-2">Select a Fund to View Data</h3>
                <p className="text-slate-600 max-w-md">
                  Please select a client type, fund manager, and scheme from the dropdown menus above to view the fund performance data and analytics.
                </p>
              </div>
            </div>
          )}
        </div>
        
        <footer className="mt-12 text-center text-sm text-slate-500 border-t border-slate-200 pt-4">
          <p>Hedge Fund Dashboard &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
