
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { ChevronDown, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { HistoricalData, SchemeData, TimelinePeriod } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface PerformanceChartProps {
  scheme: SchemeData;
  selectedTimeline?: TimelinePeriod;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 rounded shadow">
        <p className="font-medium text-slate-800">{label}</p>
        <p className="text-sm mt-1">
          <span className="text-dashboard-highlight font-medium">Scheme: </span>
          <span className="text-slate-800">{payload[0].value?.toFixed(2)}</span>
        </p>
        <p className="text-sm">
          <span className="text-slate-500">Benchmark: </span>
          <span className="text-slate-800">{payload[1].value?.toFixed(2)}</span>
        </p>
      </div>
    );
  }
  return null;
};

interface DateRange {
  from: Date;
  to?: Date;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ scheme, selectedTimeline }) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    to: new Date(),
  });

  // Helper to get filtered data based on date range
  const getFilteredData = (): HistoricalData[] => {
    if (!scheme || !scheme.historicalData) return [];

    // Filter based on selected timeline or custom date range
    if (selectedTimeline && !dateRange.to) {
      const today = new Date();
      let startDate: Date;

      switch (selectedTimeline) {
        case '1D':
          startDate = new Date(today);
          startDate.setDate(today.getDate() - 1);
          break;
        case '1W':
          startDate = new Date(today);
          startDate.setDate(today.getDate() - 7);
          break;
        case '1M':
          startDate = new Date(today);
          startDate.setMonth(today.getMonth() - 1);
          break;
        case '3M':
          startDate = new Date(today);
          startDate.setMonth(today.getMonth() - 3);
          break;
        case '6M':
          startDate = new Date(today);
          startDate.setMonth(today.getMonth() - 6);
          break;
        case '1Y':
          startDate = new Date(today);
          startDate.setFullYear(today.getFullYear() - 1);
          break;
        case 'YTD':
          startDate = new Date(today.getFullYear(), 0, 1);
          break;
        case 'MTD':
          startDate = new Date(today.getFullYear(), today.getMonth(), 1);
          break;
        case 'FYTD': // Assuming fiscal year starts April 1
          startDate = new Date(today.getFullYear(), 3, 1);
          if (today < startDate) {
            startDate.setFullYear(today.getFullYear() - 1);
          }
          break;
        case 'SI':
          startDate = new Date(scheme.inceptionDate);
          break;
        default:
          startDate = new Date(today);
          startDate.setFullYear(today.getFullYear() - 1);
      }

      return scheme.historicalData.filter(
        item => new Date(item.date) >= startDate && new Date(item.date) <= today
      );
    }

    // Filter based on custom date range
    return scheme.historicalData.filter(
      item => {
        const date = new Date(item.date);
        if (dateRange.from && dateRange.to) {
          return date >= dateRange.from && date <= dateRange.to;
        } else if (dateRange.from) {
          return date >= dateRange.from;
        }
        return true;
      }
    );
  };

  // Timeline buttons for quick selection
  const timeButtons: { label: string; period: TimelinePeriod }[] = [
    { label: '1D', period: '1D' },
    { label: '1W', period: '1W' },
    { label: '1M', period: '1M' },
    { label: '3M', period: '3M' },
    { label: '6M', period: '6M' },
    { label: '1Y', period: '1Y' },
    { label: 'YTD', period: 'YTD' },
    { label: 'SI', period: 'SI' },
  ];

  const filteredData = getFilteredData();
  
  // Normalize data for better visualization (starting from a common base)
  const normalizedData = filteredData.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
        normalizedScheme: 100,
        normalizedBenchmark: 100,
      };
    }

    const baseScheme = filteredData[0].schemeValue;
    const baseBenchmark = filteredData[0].benchmarkValue;

    return {
      ...item,
      normalizedScheme: (item.schemeValue / baseScheme) * 100,
      normalizedBenchmark: (item.benchmarkValue / baseBenchmark) * 100,
    };
  });

  // Format x-axis labels based on the date range
  const formatXAxis = (dateStr: string) => {
    const date = new Date(dateStr);
    
    if (filteredData.length <= 7) {
      // For very short ranges, show detailed format
      return format(date, 'dd MMM');
    } else if (filteredData.length <= 31) {
      // For ranges up to a month
      return format(date, 'dd MMM');
    } else if (filteredData.length <= 365) {
      // For ranges up to a year
      return format(date, 'MMM yy');
    } else {
      // For multi-year ranges
      return format(date, 'MMM yy');
    }
  };

  // Dynamic tick count based on viewport size and data length
  const getTickCount = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) return 3;
      if (width < 768) return 4;
      if (width < 1024) return 6;
      return 8;
    }
    return 5;
  };

  return (
    <Card className="bg-card-gradient border border-slate-200 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <CardTitle className="text-lg font-medium text-slate-800">Performance Chart</CardTitle>
          
          <div className="flex flex-wrap items-center gap-2">
            {timeButtons.map((btn) => (
              <Button 
                key={btn.label}
                variant={selectedTimeline === btn.period ? "default" : "outline"}
                size="sm"
                className={cn(
                  "h-8 bg-white border-slate-300 text-slate-800",
                  selectedTimeline === btn.period && "bg-dashboard-highlight text-slate-800 border-dashboard-highlight"
                )}
                onClick={() => {
                  setDateRange({ from: new Date(), to: undefined });
                }}
              >
                {btn.label}
              </Button>
            ))}
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 bg-white border-slate-300 text-slate-800"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "MMM d, yyyy")} -{" "}
                        {format(dateRange.to, "MMM d, yyyy")}
                      </>
                    ) : (
                      format(dateRange.from, "MMM d, yyyy")
                    )
                  ) : (
                    <span>Custom Range</span>
                  )}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white border-slate-300" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={(range) => {
                    setDateRange(range || { from: new Date() });
                  }}
                  numberOfMonths={2}
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={normalizedData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#64748b' }} 
                tickFormatter={formatXAxis} 
                tickCount={getTickCount()}
              />
              <YAxis 
                tick={{ fill: '#64748b' }} 
                domain={['auto', 'auto']} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="normalizedScheme"
                name="Scheme"
                stroke="#FFD600"
                fill="url(#schemeGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="normalizedBenchmark"
                name="Benchmark"
                stroke="#94a3b8"
                fill="url(#benchmarkGradient)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="schemeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFD600" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FFD600" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
