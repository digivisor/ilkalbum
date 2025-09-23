import { NextRequest, NextResponse } from 'next/server';
import { ServerPricingService } from '@/services';

export async function GET() {
  try {
    // Use service layer instead of direct fetch
    const campaigns = await ServerPricingService.getActiveCampaignsSSR();
    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('API Error:', error);
    
    // Backend çalışmıyorsa mock data döndür
    const mockCampaigns = [
      {
        "_id": "68cbdd665bb907584c2b559a",
        "title": "Özel Kampanya",
        "description": "Düğün sezonuna özel %25 indirim fırsatını kaçırmayın!",
        "note": "",
        "discountPercent": 25,
        "expiresAt": "2025-10-31T00:00:00.000Z",
        "isActive": true,
        "type": "homepage",
        "packages": [
          {
            "name": "Düğün Paketi",
            "oldPrice": "₺4500",
            "newPrice": "₺3375",
            "description": "8 saat çekim + dijital albüm",
            "_id": "68cbdd665bb907584c2b559b"
          }
        ],
        "createdAt": "2025-09-18T10:22:30.676Z",
        "updatedAt": "2025-09-18T10:25:06.334Z",
        "__v": 0
      }
    ];
    
    return NextResponse.json(mockCampaigns);
  }
}