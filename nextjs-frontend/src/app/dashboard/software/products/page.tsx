'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import axios from '@/lib/axios';

interface SoftwareProduct {
  id: number;
  name: string;
  slug: string;
  partner_name: string;
  version: string;
  is_active: boolean;
  created_at: string;
}

export default function ProductsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState<SoftwareProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        
        // In a real implementation, we would fetch actual products from the API
        // For now, we'll use placeholder data
        const placeholderProducts: SoftwareProduct[] = [
          {
            id: 1,
            name: 'Design Pro Suite',
            slug: 'design-pro-suite',
            partner_name: 'Design Pro Tools',
            version: '2.5.1',
            is_active: true,
            created_at: '2025-03-01T00:00:00.000Z',
          },
          {
            id: 2,
            name: 'WebBuilder Pro',
            slug: 'webbuilder-pro',
            partner_name: 'WebBuilder Pro',
            version: '3.0.0',
            is_active: true,
            created_at: '2025-03-02T00:00:00.000Z',
          },
          {
            id: 3,
            name: 'SEO Analytics Dashboard',
            slug: 'seo-analytics-dashboard',
            partner_name: 'SEO Analytics',
            version: '1.8.3',
            is_active: false,
            created_at: '2025-03-03T00:00:00.000Z',
          },
        ];
        
        setProducts(placeholderProducts);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast({
          title: 'Error',
          description: 'Failed to load products',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  const handleDelete = async (id: number) => {
    // In a real implementation, we would call the API to delete the product
    // For now, we'll just update the local state
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProducts(products.filter(product => product.id !== id));
      
      toast({
        title: 'Success',
        description: 'Product deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete product',
        variant: 'destructive',
      });
    }
  };

  const toggleStatus = async (id: number, currentStatus: boolean) => {
    // In a real implementation, we would call the API to update the product status
    // For now, we'll just update the local state
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProducts(products.map(product => 
        product.id === id 
          ? { ...product, is_active: !currentStatus } 
          : product
      ));
      
      toast({
        title: 'Success',
        description: `Product ${currentStatus ? 'deactivated' : 'activated'} successfully`,
      });
    } catch (error) {
      console.error('Error updating product status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update product status',
        variant: 'destructive',
      });
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Please log in to access the Products page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Software Products</h1>
        <Button asChild>
          <Link href="/dashboard/software/products/create">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your software products and their details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-sm text-muted-foreground">No products found. Add your first product to get started.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Partner</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.partner_name}</TableCell>
                    <TableCell>{product.version}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        product.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(product.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/dashboard/software/products/${product.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/dashboard/software/products/${product.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => toggleStatus(product.id, product.is_active)}
                        >
                          <span className={`h-4 w-4 rounded-full ${
                            product.is_active ? 'bg-green-500' : 'bg-red-500'
                          }`} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleDelete(product.id)}
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