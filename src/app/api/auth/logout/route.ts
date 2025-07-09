import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out successfully' });
  
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    expires: new Date(0),
    path: '/',
  });
  
  response.cookies.set('userRole', '', {
    httpOnly: false,
    secure: process.env.NODE_ENV !== 'development',
    expires: new Date(0),
    path: '/',
  });
  
  return response;
}
