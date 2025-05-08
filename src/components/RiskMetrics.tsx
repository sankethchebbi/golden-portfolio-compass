
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SchemeData, formatPercentage } from '@/data/mockData';
import { Shield, TrendingUp, TrendingDown } from 'lucide-react';

interface RiskMetricsProps {
  scheme: SchemeData;
}

export const RiskMetrics: React.FC<RiskMetricsProps> = ({ scheme }) => {
  const [activeTab, setActiveTab] = useState<'risk' | 'ratios'>('risk');

  // These would typically come from the data, but for demonstration we'll use sample values
  const riskMetrics = {
    volatility: 12.5, // Annual volatility as percentage
    maxDrawdown: 18.7, // Maximum peak-to-trough drop as percentage
    varDaily: 3.2,  // Value at Risk (daily, 95%) as percentage
    varMonthly: 8.4, // Value at Risk (monthly, 95%) as percentage
    downsideDeviation: 9.8, // Downside deviation as percentage
    beta: 0.82,     // Beta relative to benchmark
    alpha: 2.4,     // Alpha (annualized) as percentage
    sharpeRatio: 1.32, // Sharpe ratio
    sortinoRatio: 1.54, // Sortino ratio
    informationRatio: 0.78, // Information ratio
    treynorRatio: 11.2, // Treynor ratio
  };

  return (
    <Card className="bg-card-gradient border border-slate-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-slate-800 flex items-center">
          <Shield className="mr-2 h-5 w-5 text-dashboard-highlight" />
          Risk Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'risk' | 'ratios')}>
          <TabsList className="bg-white border border-slate-300 mb-4">
            <TabsTrigger 
              value="risk" 
              className="data-[state=active]:bg-dashboard-highlight data-[state=active]:text-slate-800"
            >
              <TrendingDown className="mr-1 h-4 w-4" />
              Risk Measures
            </TabsTrigger>
            <TabsTrigger 
              value="ratios" 
              className="data-[state=active]:bg-dashboard-highlight data-[state=active]:text-slate-800"
            >
              <TrendingUp className="mr-1 h-4 w-4" />
              Risk-Adjusted Ratios
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="risk">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border border-slate-200 rounded-md">
                <div className="text-xs text-slate-500">Volatility (Annual)</div>
                <div className="text-lg font-semibold text-slate-800">
                  {formatPercentage(riskMetrics.volatility)}
                </div>
              </div>
              
              <div className="p-3 border border-slate-200 rounded-md">
                <div className="text-xs text-slate-500">Maximum Drawdown</div>
                <div className="text-lg font-semibold text-dashboard-negative">
                  -{formatPercentage(riskMetrics.maxDrawdown)}
                </div>
              </div>
              
              <div className="p-3 border border-slate-200 rounded-md">
                <div className="text-xs text-slate-500">VaR (Daily, 95%)</div>
                <div className="text-lg font-semibold text-slate-800">
                  {formatPercentage(riskMetrics.varDaily)}
                </div>
              </div>
              
              <div className="p-3 border border-slate-200 rounded-md">
                <div className="text-xs text-slate-500">VaR (Monthly, 95%)</div>
                <div className="text-lg font-semibold text-slate-800">
                  {formatPercentage(riskMetrics.varMonthly)}
                </div>
              </div>
              
              <div className="p-3 border border-slate-200 rounded-md">
                <div className="text-xs text-slate-500">Downside Deviation</div>
                <div className="text-lg font-semibold text-slate-800">
                  {formatPercentage(riskMetrics.downsideDeviation)}
                </div>
              </div>
              
              <div className="p-3 border border-slate-200 rounded-md">
                <div className="text-xs text-slate-500">Beta vs Benchmark</div>
                <div className="text-lg font-semibold text-slate-800">
                  {riskMetrics.beta.toFixed(2)}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ratios">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border border-slate-200 rounded-md">
                <div className="text-xs text-slate-500">Alpha (Annual)</div>
                <div className={`text-lg font-semibold ${riskMetrics.alpha >= 0 ? 'text-dashboard-positive' : 'text-dashboard-negative'}`}>
                  {formatPercentage(riskMetrics.alpha)}
                </div>
              </div>
              
              <div className="p-3 border border-slate-200 rounded-md">
                <div className="text-xs text-slate-500">Sharpe Ratio</div>
                <div className={`text-lg font-semibold ${riskMetrics.sharpeRatio >= 1 ? 'text-dashboard-positive' : 'text-slate-800'}`}>
                  {riskMetrics.sharpeRatio.toFixed(2)}
                </div>
              </div>
              
              <div className="p-3 border border-slate-200 rounded-md">
                <div className="text-xs text-slate-500">Sortino Ratio</div>
                <div className={`text-lg font-semibold ${riskMetrics.sortinoRatio >= 1 ? 'text-dashboard-positive' : 'text-slate-800'}`}>
                  {riskMetrics.sortinoRatio.toFixed(2)}
                </div>
              </div>
              
              <div className="p-3 border border-slate-200 rounded-md">
                <div className="text-xs text-slate-500">Information Ratio</div>
                <div className={`text-lg font-semibold ${riskMetrics.informationRatio >= 0.5 ? 'text-dashboard-positive' : 'text-slate-800'}`}>
                  {riskMetrics.informationRatio.toFixed(2)}
                </div>
              </div>
              
              <div className="p-3 border border-slate-200 rounded-md">
                <div className="text-xs text-slate-500">Treynor Ratio</div>
                <div className={`text-lg font-semibold ${riskMetrics.treynorRatio >= 0 ? 'text-dashboard-positive' : 'text-dashboard-negative'}`}>
                  {riskMetrics.treynorRatio.toFixed(2)}
                </div>
              </div>
              
              <div className="p-3 border border-slate-200 rounded-md bg-gray-50">
                <div className="text-xs text-slate-500 mb-1">Risk Assessment</div>
                <div className="text-sm font-medium text-slate-800">
                  {riskMetrics.sharpeRatio > 1.5 ? 'Excellent' : 
                   riskMetrics.sharpeRatio > 1.0 ? 'Good' : 
                   riskMetrics.sharpeRatio > 0.5 ? 'Average' : 'Below Average'} 
                  <span className="text-xs text-slate-500 ml-1">risk-adjusted returns</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
