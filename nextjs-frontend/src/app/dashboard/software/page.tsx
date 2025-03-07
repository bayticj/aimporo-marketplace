'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Users, Package, Tag, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import axios from '@/lib/axios';

interface StatCard {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  change?: string;
  link: string;
}

export default function SoftwareDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<StatCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        
        // In a real implementation, we would fetch actual stats from the API
        // For now, we'll use placeholder data
        const placeholderStats: StatCard[] = [
          {
            title: 'Partners',
            value: 12,
            description: 'Total software partners',
            icon: <Users className="h-5 w-5 text-muted-foreground" />,
            change: '+2 this month',
            link: '/dashboard/software/partners'
          },
          {
            title: 'Products',
            value: 28,
            description: 'Available software products',
            icon: <Package className="h-5 w-5 text-muted-foreground" />,
            change: '+5 this month',
            link: '/dashboard/software/products'
          },
          {
            title: 'Plans',
            value: 64,
            description: 'Active subscription plans',
            icon: <Tag className="h-5 w-5 text-muted-foreground" />,
            change: '+12 this month',
            link: '/dashboard/software/plans'
          },
          {
            title: 'Purchases',
            value: 187,
            description: 'Total software purchases',
            icon: <ShoppingCart className="h-5 w-5 text-muted-foreground" />,
            change: '+32 this month',
            link: '/dashboard/software/purchases'
          }
        ];
        
        setStats(placeholderStats);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching software stats:', error);
        toast({
          title: 'Error',
          description: 'Failed to load software statistics',
          variant: 'destructive',
        });
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [toast]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Please log in to access the Software License System.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Software License System</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              {stat.change && (
                <p className="mt-1 text-xs text-green-500">{stat.change}</p>
              )}
              <Link href={stat.link} className="mt-3 inline-flex items-center text-sm text-primary">
                View details <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Purchases</CardTitle>
            <CardDescription>
              Latest software license purchases
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading recent purchases...</p>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">No recent purchases to display.</p>
                <Button asChild variant="outline">
                  <Link href="/dashboard/software/purchases">
                    View all purchases
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Products</CardTitle>
            <CardDescription>
              Most popular software products
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading popular products...</p>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">No popular products to display.</p>
                <Button asChild variant="outline">
                  <Link href="/dashboard/software/products">
                    View all products
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 