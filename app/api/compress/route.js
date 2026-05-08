import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('image');

    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // AI smart compression logic with Sharp
    const compressedBuffer = await sharp(buffer)
      .webp({ quality: 60, effort: 6 }) 
      .toBuffer();

    return new NextResponse(compressedBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/webp',
        'Content-Disposition': 'attachment; filename="compressed_by_rakib_bae.webp"',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Compression failed' }, { status: 500 });
  }
}
