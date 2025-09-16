import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const deliveries = await prisma.delivery.findMany({
    include: { user: true },
  });
  return NextResponse.json(deliveries);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const delivery = await prisma.delivery.create({ data });
  return NextResponse.json(delivery);
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const { id, ...update } = data;
  const delivery = await prisma.delivery.update({ where: { id }, data: update });
  return NextResponse.json(delivery);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.delivery.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
