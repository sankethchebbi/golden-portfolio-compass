
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  SchemeData, 
  Holding, 
  SectorAllocation, 
  IndustryAllocation 
} from '@/data/mockData';
import { useForm } from 'react-hook-form';

// Mock function to simulate data saving
const saveData = (data: any) => {
  console.log('Saving data:', data);
  // In a real app, this would send data to an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('holdings');
  const [mockSchemes, setMockSchemes] = useState<SchemeData[]>([]);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  // Forms
  const holdingsForm = useForm({
    defaultValues: {
      name: '',
      ticker: '',
      sector: '',
      industry: '',
      weight: '',
      value: '',
    },
  });
  
  const sectorForm = useForm({
    defaultValues: {
      sector: '',
      weight: '',
      industries: '',
    },
  });
  
  const schemeForm = useForm({
    defaultValues: {
      name: '',
      manager: '',
      clientType: 'PENSION',
      currency: 'USD',
      aum: '',
      inception: '',
      benchmark: '',
      description: '',
    },
  });

  const onSubmitHolding = async (data: any) => {
    const numericWeight = parseFloat(data.weight) / 100;
    const numericValue = parseFloat(data.value);
    
    const holding: Holding = {
      name: data.name,
      ticker: data.ticker,
      sector: data.sector,
      industry: data.industry,
      weight: numericWeight,
      value: numericValue,
      dayChange: 0, // Default value
    };
    
    try {
      await saveData(holding);
      holdingsForm.reset();
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  
  const onSubmitSector = async (data: any) => {
    const numericWeight = parseFloat(data.weight) / 100;
    
    // Parse industries from comma-separated list
    const industriesList = data.industries.split(',').map((industry: string) => {
      const [name, weightStr] = industry.trim().split(':');
      const weight = parseFloat(weightStr) / 100 || 0;
      
      return {
        name: name.trim(),
        weight: weight,
      } as IndustryAllocation;
    });
    
    const sectorData: SectorAllocation = {
      sector: data.sector,
      weight: numericWeight,
      industries: industriesList,
    };
    
    try {
      await saveData(sectorData);
      sectorForm.reset();
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  
  const onSubmitScheme = async (data: any) => {
    const schemeData = {
      ...data,
      aum: parseFloat(data.aum),
      id: Date.now().toString(), // Generate a unique ID
    };
    
    try {
      await saveData(schemeData);
      schemeForm.reset();
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-dashboard-background text-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            className="bg-white border-slate-300 hover:bg-slate-100"
            onClick={() => navigate('/')}
          >
            Back to Dashboard
          </Button>
        </div>
        
        <Card className="mb-8 bg-white border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Data Management</CardTitle>
            <CardDescription>
              Add and edit fund data, holdings, and sector allocations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-slate-100 border border-slate-200 mb-6">
                <TabsTrigger value="holdings">Holdings</TabsTrigger>
                <TabsTrigger value="sectors">Sector Allocations</TabsTrigger>
                <TabsTrigger value="schemes">Fund Details</TabsTrigger>
                <TabsTrigger value="raw">Raw Data</TabsTrigger>
              </TabsList>
              
              <TabsContent value="holdings">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Add New Holding</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...holdingsForm}>
                      <form onSubmit={holdingsForm.handleSubmit(onSubmitHolding)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={holdingsForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Stock Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Apple Inc." {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={holdingsForm.control}
                            name="ticker"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Ticker</FormLabel>
                                <FormControl>
                                  <Input placeholder="AAPL" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={holdingsForm.control}
                            name="sector"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Sector</FormLabel>
                                <FormControl>
                                  <Input placeholder="Technology" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={holdingsForm.control}
                            name="industry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Industry</FormLabel>
                                <FormControl>
                                  <Input placeholder="Consumer Electronics" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={holdingsForm.control}
                            name="weight"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Weight (%)</FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.01" placeholder="5.5" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={holdingsForm.control}
                            name="value"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="10000000" {...field} />
                                </FormControl>
                                <FormDescription>Value in currency units</FormDescription>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <Button type="submit" className="bg-dashboard-highlight hover:bg-dashboard-highlight/90 text-white">
                          Add Holding
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="sectors">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Add New Sector Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...sectorForm}>
                      <form onSubmit={sectorForm.handleSubmit(onSubmitSector)} className="space-y-4">
                        <FormField
                          control={sectorForm.control}
                          name="sector"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sector Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Technology" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={sectorForm.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Weight (%)</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.01" placeholder="25.5" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={sectorForm.control}
                          name="industries"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Industries</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Software:10, Hardware:8, Semiconductors:7.5" 
                                  className="min-h-[100px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Enter as comma-separated list: Industry:Weight, Industry:Weight
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="bg-dashboard-highlight hover:bg-dashboard-highlight/90 text-white">
                          Add Sector
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="schemes">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Add New Fund Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...schemeForm}>
                      <form onSubmit={schemeForm.handleSubmit(onSubmitScheme)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={schemeForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Fund Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Global Technology Fund" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={schemeForm.control}
                            name="manager"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Fund Manager</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Smith" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={schemeForm.control}
                            name="clientType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Client Type</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="PENSION/SOVEREIGN/CORPORATE" 
                                    list="clientTypes"
                                    {...field} 
                                  />
                                </FormControl>
                                <datalist id="clientTypes">
                                  <option value="PENSION" />
                                  <option value="SOVEREIGN" />
                                  <option value="CORPORATE" />
                                </datalist>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={schemeForm.control}
                            name="currency"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Currency</FormLabel>
                                <FormControl>
                                  <Input placeholder="USD" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={schemeForm.control}
                            name="aum"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>AUM</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="1000000000" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={schemeForm.control}
                            name="inception"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Inception Date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={schemeForm.control}
                            name="benchmark"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Benchmark</FormLabel>
                                <FormControl>
                                  <Input placeholder="S&P 500" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={schemeForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Fund description and investment strategy..." 
                                  className="min-h-[100px]"
                                  {...field} 
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="bg-dashboard-highlight hover:bg-dashboard-highlight/90 text-white">
                          Add Fund
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="raw">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Raw Data View</CardTitle>
                    <CardDescription>
                      View and export raw data in JSON format
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      className="min-h-[400px] font-mono text-sm"
                      readOnly
                      value={JSON.stringify(mockSchemes, null, 2)}
                    />
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        className="bg-white border-slate-300 hover:bg-slate-100"
                        onClick={() => {
                          const dataStr = JSON.stringify(mockSchemes, null, 2);
                          const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
                          const linkElement = document.createElement('a');
                          linkElement.setAttribute('href', dataUri);
                          linkElement.setAttribute('download', 'fund-data.json');
                          linkElement.click();
                        }}
                      >
                        Export JSON
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
            <DialogDescription>
              Data has been saved successfully.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowSuccessDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
