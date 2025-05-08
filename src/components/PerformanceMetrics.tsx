
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SchemeData, TimelinePeriod, formatPercentage } from '@/data/mockData';

interface PerformanceMetricsProps {
  scheme: SchemeData;
  onTimelineChange?: (period: TimelinePeriod) => void;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ 
  scheme, 
  onTimelineChange 
}) => {
  const [activeTab, setActiveTab] = useState<'returns' | 'comparison'>('returns');
  
  const timelinePeriods: TimelinePeriod[] = ['1D', '1W', '1M', '3M', '6M', '1Y', 'YTD', 'MTD', 'FYTD', 'SI'];
  
  const handleTimelineClick = (period: TimelinePeriod) => {
    if (onTimelineChange) {
      onTimelineChange(period);
    }
  };

  return (
    <Card className="bg-card-gradient border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-white">Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'returns' | 'comparison')}>
          <TabsList className="bg-dashboard-card border border-slate-700 mb-4">
            <TabsTrigger value="returns" className="data-[state=active]:bg-slate-700">Returns</TabsTrigger>
            <TabsTrigger value="comparison" className="data-[state=active]:bg-slate-700">Benchmark Comparison</TabsTrigger>
          </TabsList>
          
          <TabsContent value="returns">
            <div className="grid grid-cols-5 gap-2">
              {timelinePeriods.map((period) => {
                const performance = scheme.performances.find(p => p.period === period);
                const value = performance ? performance.schemeReturn : 0;
                const isPositive = value >= 0;
                
                return (
                  <div 
                    key={period}
                    onClick={() => handleTimelineClick(period)} 
                    className={`p-3 rounded-md cursor-pointer border border-slate-700 hover:border-slate-600 transition-colors ${isPositive ? 'hover:bg-dashboard-positive/10' : 'hover:bg-dashboard-negative/10'}`}
                  >
                    <div className="text-xs text-slate-400">{period}</div>
                    <div className={`text-lg font-semibold ${isPositive ? 'text-dashboard-positive' : 'text-dashboard-negative'}`}>
                      {formatPercentage(value)}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="comparison">
            <div className="space-y-2">
              {timelinePeriods.map((period) => {
                const performance = scheme.performances.find(p => p.period === period);
                if (!performance) return null;
                
                const schemeValue = performance.schemeReturn;
                const benchmarkValue = performance.benchmarkReturn;
                const difference = schemeValue - benchmarkValue;
                const isPositive = difference >= 0;
                
                return (
                  <div 
                    key={period}
                    onClick={() => handleTimelineClick(period)}
                    className="flex items-center justify-between p-3 rounded-md cursor-pointer border border-slate-700 hover:border-slate-600 transition-colors"
                  >
                    <div className="text-sm font-medium text-slate-300">{period}</div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs text-slate-400">Scheme</div>
                        <div className={`text-sm font-medium ${schemeValue >= 0 ? 'text-dashboard-positive' : 'text-dashboard-negative'}`}>
                          {formatPercentage(schemeValue)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400">Benchmark</div>
                        <div className={`text-sm font-medium ${benchmarkValue >= 0 ? 'text-dashboard-positive' : 'text-dashboard-negative'}`}>
                          {formatPercentage(benchmarkValue)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400">Diff</div>
                        <div className={`text-sm font-medium ${isPositive ? 'text-dashboard-positive' : 'text-dashboard-negative'}`}>
                          {formatPercentage(difference)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
