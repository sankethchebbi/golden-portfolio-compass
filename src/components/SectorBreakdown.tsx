
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SchemeData, formatPercentage } from '@/data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface SectorBreakdownProps {
  scheme: SchemeData;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<any>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-slate-200 rounded shadow text-sm">
        <p className="font-medium text-slate-800">{payload[0].name}</p>
        <p className="text-dashboard-highlight">{formatPercentage(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export const SectorBreakdown: React.FC<SectorBreakdownProps> = ({ scheme }) => {
  const [activeTab, setActiveTab] = useState<'sectors' | 'industries'>('sectors');

  if (!scheme || !scheme.sectorAllocations) return null;

  // Prepare data for the charts
  const sectorData = scheme.sectorAllocations.map((item) => ({
    name: item.sector,
    value: item.weight,
  }));

  // Flatten industries for all sectors
  const industryData = scheme.sectorAllocations
    .flatMap((sector) =>
      sector.industries.map((industry) => ({
        name: industry.name,
        value: industry.weight,
        sector: sector.sector,
      }))
    )
    .sort((a, b) => b.value - a.value)
    .slice(0, 10); // Show top 10 industries

  // Generate colors for the pie charts
  const generateColors = (count: number) => {
    const baseColors = [
      '#FFD600', // Accent yellow
      '#3b82f6', // Blue
      '#10b981', // Green
      '#f97316', // Orange
      '#8b5cf6', // Purple
      '#ec4899', // Pink
      '#06b6d4', // Cyan
      '#f43f5e', // Red
      '#84cc16', // Lime
      '#14b8a6', // Teal
    ];

    return Array.from({ length: count }, (_, i) => 
      baseColors[i % baseColors.length]
    );
  };

  const sectorColors = generateColors(sectorData.length);
  const industryColors = generateColors(industryData.length);

  return (
    <Card className="bg-card-gradient border border-slate-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-slate-800">Portfolio Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'sectors' | 'industries')}>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/5">
              <TabsList className="bg-white border border-slate-300 mb-4 flex lg:flex-col w-full">
                <TabsTrigger 
                  value="sectors" 
                  className="flex-1 data-[state=active]:bg-dashboard-highlight data-[state=active]:text-slate-800"
                >
                  Sectors
                </TabsTrigger>
                <TabsTrigger 
                  value="industries" 
                  className="flex-1 data-[state=active]:bg-dashboard-highlight data-[state=active]:text-slate-800"
                >
                  Top Industries
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="lg:w-4/5">
              <TabsContent value="sectors" className="mt-0">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="h-[250px] lg:w-1/3">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sectorData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={1}
                          dataKey="value"
                          labelLine={false}
                        >
                          {sectorData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={sectorColors[index]} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="lg:w-2/3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {sectorData.map((item, index) => (
                        <div key={item.name} className="flex items-center justify-between p-2 rounded-md border border-slate-200">
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: sectorColors[index] }}
                            />
                            <span className="text-sm text-slate-800">{item.name}</span>
                          </div>
                          <span className="text-sm font-medium text-slate-800">
                            {formatPercentage(item.value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="industries" className="mt-0">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="h-[250px] lg:w-1/3">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={industryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={1}
                          dataKey="value"
                          labelLine={false}
                        >
                          {industryData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={industryColors[index]} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="lg:w-2/3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                      {industryData.map((item, index) => (
                        <div key={item.name} className="flex items-center justify-between p-2 rounded-md border border-slate-200">
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: industryColors[index] }}
                            />
                            <div>
                              <span className="text-sm text-slate-800">{item.name}</span>
                              <span className="text-xs text-slate-500 block">{item.sector}</span>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-slate-800">
                            {formatPercentage(item.value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};
