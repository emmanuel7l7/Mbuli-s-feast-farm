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

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const { id, ...update } = data;
  // TODO: Replace with new database logic
  return NextResponse.json(product);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  // TODO: Replace with new database logic
  return NextResponse.json({ success: true });
}
