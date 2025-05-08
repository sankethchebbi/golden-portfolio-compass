
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ClientType, FundManager, Scheme, fundManagers, schemes } from '@/data/mockData';

interface SelectionFiltersProps {
  onSelectionChange: (clientType: ClientType, manager: string, schemeId: string) => void;
}

export const SelectionFilters: React.FC<SelectionFiltersProps> = ({ onSelectionChange }) => {
  const [clientType, setClientType] = useState<ClientType | ''>('');
  const [selectedManager, setSelectedManager] = useState<string>('');
  const [selectedScheme, setSelectedScheme] = useState<string>('');

  // Filter managers based on client type
  const filteredManagers = clientType
    ? fundManagers.filter(manager => 
        schemes[manager]?.some(scheme => scheme.clientType === clientType)
      )
    : [];

  // Filter schemes based on selected manager and client type
  const filteredSchemes = selectedManager
    ? schemes[selectedManager]?.filter(
        scheme => !clientType || scheme.clientType === clientType
      ) || []
    : [];

  const handleClientTypeChange = (value: ClientType) => {
    setClientType(value);
    setSelectedManager('');
    setSelectedScheme('');
  };

  const handleManagerChange = (value: string) => {
    setSelectedManager(value);
    setSelectedScheme('');
  };

  const handleSchemeChange = (value: string) => {
    setSelectedScheme(value);
    if (clientType && selectedManager) {
      onSelectionChange(clientType, selectedManager, value);
    }
  };

  return (
    <Card className="bg-card-gradient border-none shadow-md">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label htmlFor="client-type" className="text-sm font-medium text-slate-300">
              Client Type
            </label>
            <Select value={clientType} onValueChange={handleClientTypeChange}>
              <SelectTrigger id="client-type" className="bg-dashboard-card border-slate-700 text-slate-100">
                <SelectValue placeholder="Select client type" />
              </SelectTrigger>
              <SelectContent className="bg-dashboard-card border-slate-700 text-slate-100">
                <SelectItem value="client">Client Facing</SelectItem>
                <SelectItem value="prop">Proprietary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="fund-manager" className="text-sm font-medium text-slate-300">
              Fund Manager
            </label>
            <Select 
              value={selectedManager} 
              onValueChange={handleManagerChange} 
              disabled={!clientType}
            >
              <SelectTrigger id="fund-manager" className="bg-dashboard-card border-slate-700 text-slate-100">
                <SelectValue placeholder="Select fund manager" />
              </SelectTrigger>
              <SelectContent className="bg-dashboard-card border-slate-700 text-slate-100">
                {filteredManagers.map((manager) => (
                  <SelectItem key={manager} value={manager}>
                    {manager}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="scheme" className="text-sm font-medium text-slate-300">
              Scheme
            </label>
            <Select 
              value={selectedScheme} 
              onValueChange={handleSchemeChange} 
              disabled={!selectedManager}
            >
              <SelectTrigger id="scheme" className="bg-dashboard-card border-slate-700 text-slate-100">
                <SelectValue placeholder="Select scheme" />
              </SelectTrigger>
              <SelectContent className="bg-dashboard-card border-slate-700 text-slate-100">
                {filteredSchemes.map((scheme) => (
                  <SelectItem key={scheme.id} value={scheme.id}>
                    {scheme.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
