import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';


const MOCK_POSTS = [
  { id: 101, crop: "Tomato", grade: "Grade A", quantity: "50kg", price: 1800, rating: 4.5, isPredicted: false, createdAt: new Date().toISOString() },
  { id: 102, crop: "Onion", grade: "Grade B", quantity: "100kg", price: 2500, rating: 4.2, isPredicted: false, createdAt: new Date().toISOString() },
  { id: 103, crop: "Potato", grade: "Grade A", quantity: "200kg", price: 4400, rating: 4.8, isPredicted: false, createdAt: new Date().toISOString() },
  { id: 104, crop: "Carrot", grade: "Grade C", quantity: "30kg", price: 900, rating: 3.5, isPredicted: false, createdAt: new Date().toISOString() },
];

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.warn('Prisma error, falling back to mock posts:', error);
    return NextResponse.json(MOCK_POSTS);
  }
}

export async function POST(req: NextRequest) {
  let data;
  try {
    data = await req.json();
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        crop: data.crop,
        grade: data.grade,
        quantity: data.quantity || "100kg",
        price: Number(data.price),
        rating: data.rating || 4.5,
        isPredicted: data.isPredicted || false,
      },
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.warn('Prisma error, returning mock created post:', error);
    const mockCreated = {
      id: Math.floor(Math.random() * 10000) + 200,
      crop: data.crop,
      grade: data.grade,
      quantity: data.quantity || "100kg",
      price: Number(data.price),
      rating: data.rating || 4.5,
      isPredicted: data.isPredicted || false,
      createdAt: new Date().toISOString()
    };
    return NextResponse.json(mockCreated, { status: 201 });
  }
}
