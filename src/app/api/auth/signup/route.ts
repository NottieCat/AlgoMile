import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { fullName, email, password, role } = await req.json();

    if (!fullName || !email || !password || !role) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    if (!['customer', 'retailer', 'driver'].includes(role)) {
        return NextResponse.json({ message: 'Invalid role' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      passwordHash,
      role,
    });

    await newUser.save();

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
