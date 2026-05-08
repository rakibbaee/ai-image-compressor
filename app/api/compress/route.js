import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('image');
    const qualityValue = parseInt(data.get('quality')) || 80; 

    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const compressedBuffer = await sharp(buffer)
      .webp({ quality: qualityValue, effort: 6 }) 
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
