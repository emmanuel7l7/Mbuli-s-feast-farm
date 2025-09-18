import { NextRequest, NextResponse } from 'next/server';


export async function GET() {
  // TODO: Replace with new database logic
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  // TODO: Replace with new database logic
  return NextResponse.json(product);
}
