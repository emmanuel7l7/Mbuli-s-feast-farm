import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { email, password, role } = await req.json();
    
    if (!email || !password || !role) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    const valid = await bcrypt.compare(password, user.password);
    
    if (!valid || user.role !== role) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    // Return user info (never return password in production)
    return NextResponse.json({ 
      id: user.id, 
      email: user.email, 
      role: user.role 
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}