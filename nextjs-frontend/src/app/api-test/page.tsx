'use client';

import ApiTest from '@/components/ApiTest';

export default function ApiTestPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">API Connection Test</h1>
      <ApiTest />
    </div>
  );
} 