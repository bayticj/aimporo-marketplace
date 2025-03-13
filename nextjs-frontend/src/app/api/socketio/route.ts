import { NextResponse } from 'next/server';

// This is a dummy API route to handle Socket.IO path
// The actual Socket.IO server is running in server.js
export async function GET() {
  return NextResponse.json({ message: 'Socket.IO server is running on a custom server' });
}

export async function POST() {
  return NextResponse.json({ message: 'Socket.IO server is running on a custom server' });
}

// Configure the route to handle all HTTP methods
export const dynamic = 'force-dynamic'; 