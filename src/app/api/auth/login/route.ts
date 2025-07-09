import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { email, password, role } = await req.json();

    if (!email || !password || !role) {
        return NextResponse.json({ message: 'Email, password and role are required' }, { status: 400 });
    }

    const user = await User.findOne({ email, role });

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials or role' }, { status: 401 });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json({ message: 'Invalid credentials or role' }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
    
    const response = NextResponse.json({ message: 'Logged in successfully', role: user.role });
    response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'lax',
        maxAge: 60 * 60, // 1 hour
        path: '/',
    });
    response.cookies.set('userRole', user.role, {
        httpOnly: false, // accessible from JS
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'lax',
        maxAge: 60 * 60, // 1 hour
        path: '/',
    });

    return response;

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ message: 'An internal server error occurred. Please try again later.' }, { status: 500 });
  }
}
