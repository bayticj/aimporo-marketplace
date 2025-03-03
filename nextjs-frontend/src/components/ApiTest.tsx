import { useState, useEffect } from 'react';
import axios from 'axios';

const ApiTest = () => {
  const [status, setStatus] = useState<string>('Loading...');
  const [error, setError] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test the connection using our test endpoint
        const response = await axios.get(`${apiUrl}/test`);
        setStatus('Connection successful!');
        setApiResponse(response.data);
      } catch (err) {
        console.error('API connection error:', err);
        setError(`Connection failed: ${err instanceof Error ? err.message : String(err)}`);
        setStatus('Failed');
      }
    };

    testConnection();
  }, [apiUrl]);

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-4">API Connection Test</h2>
      <div className="mb-2">
        <strong>API URL:</strong> {apiUrl}
      </div>
      <div className="mb-2">
        <strong>Status:</strong>{' '}
        <span className={status === 'Failed' ? 'text-red-500' : status.includes('successful') ? 'text-green-500' : 'text-yellow-500'}>
          {status}
        </span>
      </div>
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm mb-4">
          {error}
        </div>
      )}
      {apiResponse && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">API Response:</h3>
          <pre className="bg-gray-50 p-3 rounded border text-sm overflow-auto">
            {JSON.stringify(apiResponse, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiTest; 