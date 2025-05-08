
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SchemeData, TimelinePeriod, formatPercentage } from '@/data/mockData';

interface PerformanceMetricsProps {
  scheme: SchemeData;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ 
  scheme
}) => {
  const [activeTab, setActiveTab] = useState<'returns' | 'comparison'>('returns');
  
  const timelinePeriods: TimelinePeriod[] = ['1D', '1W', '1M', '3M', '6M', '1Y', 'YTD', 'MTD', 'FYTD', 'SI'];

  return (
    <Card className="bg-card-gradient border border-slate-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-slate-800">Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'returns' | 'comparison')}>
          <TabsList className="bg-white border border-slate-300 mb-4">
            <TabsTrigger value="returns" className="data-[state=active]:bg-dashboard-highlight data-[state=active]:text-slate-800">Returns</TabsTrigger>
            <TabsTrigger value="comparison" className="data-[state=active]:bg-dashboard-highlight data-[state=active]:text-slate-800">Benchmark Comparison</TabsTrigger>
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
                    className={`p-3 rounded-md border border-slate-300 ${isPositive ? 'hover:bg-dashboard-positive/10' : 'hover:bg-dashboard-negative/10'}`}
                  >
                    <div className="text-xs text-slate-500">{period}</div>
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
                    className="flex items-center justify-between p-3 rounded-md border border-slate-300 hover:border-slate-400 transition-colors"
                  >
                    <div className="text-sm font-medium text-slate-700">{period}</div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs text-slate-500">Scheme</div>
                        <div className={`text-sm font-medium ${schemeValue >= 0 ? 'text-dashboard-positive' : 'text-dashboard-negative'}`}>
                          {formatPercentage(schemeValue)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500">Benchmark</div>
                        <div className={`text-sm font-medium ${benchmarkValue >= 0 ? 'text-dashboard-positive' : 'text-dashboard-negative'}`}>
                          {formatPercentage(benchmarkValue)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500">Diff</div>
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
