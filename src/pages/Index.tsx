
import React, { useState } from 'react';
import { SelectionFilters } from '@/components/SelectionFilters';
import { DashboardHeader } from '@/components/DashboardHeader';
import { PerformanceMetrics } from '@/components/PerformanceMetrics';
import { PerformanceChart } from '@/components/PerformanceChart';
import { PortfolioHoldings } from '@/components/PortfolioHoldings';
import { SectorBreakdown } from '@/components/SectorBreakdown';
import { ClientType, SchemeData, TimelinePeriod, getSchemeById } from '@/data/mockData';

const Index = () => {
  const [selectedScheme, setSelectedScheme] = useState<SchemeData | null>(null);
  const [selectedTimeline, setSelectedTimeline] = useState<TimelinePeriod | undefined>(undefined);

  const handleSelectionChange = (clientType: ClientType, manager: string, schemeId: string) => {
    const scheme = getSchemeById(schemeId);
    if (scheme) {
      setSelectedScheme(scheme);
      // Reset timeline when changing scheme
      setSelectedTimeline(undefined);
    }
  };

  const handleTimelineChange = (period: TimelinePeriod) => {
    setSelectedTimeline(period);
  };

  return (
    <div className="min-h-screen bg-dashboard-background text-slate-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Hedge Fund Dashboard</h1>
        
        <div className="space-y-6">
          <SelectionFilters onSelectionChange={handleSelectionChange} />
          
          {selectedScheme ? (
            <>
              <DashboardHeader scheme={selectedScheme} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PerformanceMetrics 
                  scheme={selectedScheme} 
                  onTimelineChange={handleTimelineChange} 
                />
                <SectorBreakdown scheme={selectedScheme} />
              </div>
              
              <PerformanceChart 
                scheme={selectedScheme} 
                selectedTimeline={selectedTimeline} 
              />
              
              <PortfolioHoldings scheme={selectedScheme} />
            </>
          ) : (
            <div className="flex items-center justify-center min-h-[400px] rounded-lg border border-dashed border-slate-700 bg-dashboard-card">
              <div className="text-center p-8">
                <h3 className="text-xl font-medium text-white mb-2">Select a Fund to View Data</h3>
                <p className="text-slate-400 max-w-md">
                  Please select a client type, fund manager, and scheme from the dropdown menus above to view the fund performance data and analytics.
                </p>
              </div>
            </div>
          )}
        </div>
        
        <footer className="mt-12 text-center text-sm text-slate-400 border-t border-slate-800 pt-4">
          <p>Hedge Fund Dashboard &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
