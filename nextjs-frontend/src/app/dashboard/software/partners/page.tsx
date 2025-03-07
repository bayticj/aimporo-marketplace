'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import axios from '@/lib/axios';

interface Partner {
  id: number;
  name: string;
  company_name: string;
  email: string;
  integration_type: 'api' | 'redemption';
  created_at: string;
}

export default function PartnersPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setIsLoading(true);
        
        // In a real implementation, we would fetch actual partners from the API
        // For now, we'll use placeholder data
        const placeholderPartners: Partner[] = [
          {
            id: 1,
            name: 'John Smith',
            company_name: 'Design Pro Tools',
            email: 'john@designprotools.com',
            integration_type: 'api',
            created_at: '2025-03-01T00:00:00.000Z',
          },
          {
            id: 2,
            name: 'Sarah Johnson',
            company_name: 'WebBuilder Pro',
            email: 'sarah@webbuilder.pro',
            integration_type: 'redemption',
            created_at: '2025-03-02T00:00:00.000Z',
          },
          {
            id: 3,
            name: 'Michael Brown',
            company_name: 'SEO Analytics',
            email: 'michael@seoanalytics.com',
            integration_type: 'api',
            created_at: '2025-03-03T00:00:00.000Z',
          },
        ];
        
        setPartners(placeholderPartners);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching partners:', error);
        toast({
          title: 'Error',
          description: 'Failed to load partners',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, [toast]);

  const handleDelete = async (id: number) => {
    // In a real implementation, we would call the API to delete the partner
    // For now, we'll just update the local state
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPartners(partners.filter(partner => partner.id !== id));
      
      toast({
        title: 'Success',
        description: 'Partner deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting partner:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete partner',
        variant: 'destructive',
      });
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Please log in to access the Partners page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Software Partners</h1>
        <Button asChild>
          <Link href="/dashboard/software/partners/create">
            <Plus className="mr-2 h-4 w-4" /> Add Partner
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Partners</CardTitle>
          <CardDescription>
            Manage your software partners and their integration settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading partners...</p>
          ) : partners.length === 0 ? (
            <p className="text-sm text-muted-foreground">No partners found. Add your first partner to get started.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Integration Type</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partners.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell className="font-medium">{partner.name}</TableCell>
                    <TableCell>{partner.company_name}</TableCell>
                    <TableCell>{partner.email}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        partner.integration_type === 'api' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {partner.integration_type === 'api' ? 'API' : 'Redemption'}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(partner.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/dashboard/software/partners/${partner.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleDelete(partner.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 