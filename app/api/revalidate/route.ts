import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const { path, tag } = await request.json();
    
    // Admin token kontrolü (güvenlik için)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Path bazlı revalidation
    if (path) {
      revalidatePath(path);
      console.log(`Revalidated path: ${path}`);
    }

    // Tag bazlı revalidation
    if (tag) {
      revalidateTag(tag);
      console.log(`Revalidated tag: ${tag}`);
    }

    // Pricing ile ilgili tüm sayfaları revalidate et
    revalidatePath('/fiyatlandirma');
    revalidatePath('/galeri');
    revalidatePath('/');
    revalidateTag('pricing');
    revalidateTag('campaigns');
    revalidateTag('gallery');

    return NextResponse.json({ 
      success: true, 
      message: 'Cache cleared successfully',
      revalidated: { path, tag }
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Failed to revalidate cache' }, 
      { status: 500 }
    );
  }
}