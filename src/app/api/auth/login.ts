import { NextRequest, NextResponse } from 'next/server';

import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { email, password, role } = await req.json();
  if (!email || !password || !role) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  // TODO: Replace with new database logic
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid || user.role !== role) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  // For demo: return user info (never return password in production)
  return NextResponse.json({ id: user.id, email: user.email, role: user.role });
}
