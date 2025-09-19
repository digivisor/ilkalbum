// Central SEO helpers & structured data builders
// Adjust SITE_URL to your production domain
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ilkalbum.com';

// Base organization / service provider info (edit real data)
export const ORG = {
  name: 'İlkalbüm Fotoğrafçılık',
  legalName: 'İlkalbüm Fotoğrafçılık',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`, // ensure exists
  image: `${SITE_URL}/og-cover.jpg`, // ensure exists
  description: 'Düğün, nişan, bebek ve dış çekim profesyonel fotoğrafçılık hizmetleri.',
  locality: 'Antalya',
  country: 'TR',
  phone: '+90-545-784-56-67',
  social: [
    'https://www.instagram.com/hesabiniz'
  ]
};

export function buildWebsiteLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'İlkalbüm',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/arama?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

export function buildOrganizationLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: ORG.name,
    legalName: ORG.legalName,
    url: ORG.url,
    logo: ORG.logo,
    image: ORG.image,
    description: ORG.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: ORG.locality,
      addressCountry: ORG.country
    },
    areaServed: ['TR', 'Antalya'],
    priceRange: '₺₺',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: ORG.phone,
      contactType: 'customer service',
      availableLanguage: ['tr']
    },
    sameAs: ORG.social
  };
}

// LocalBusiness builder for location-rich pages (optional geo)
export interface LocalBusinessInput {
  name: string;
  telephone: string;
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string; // default TR
  url?: string; // default SITE_URL
  areaServed?: string[]; // default ['Antalya']
  sameAs?: string[];
  geo?: { latitude: number; longitude: number };
}

export function buildLocalBusinessLD(input: LocalBusinessInput) {
  const addr: any = {
    '@type': 'PostalAddress',
    streetAddress: input.streetAddress,
    addressLocality: input.addressLocality || ORG.locality,
    addressRegion: input.addressRegion || ORG.locality,
    postalCode: input.postalCode,
    addressCountry: input.addressCountry || ORG.country
  };
  const base: any = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: input.name,
    url: input.url || SITE_URL,
    telephone: input.telephone,
    address: addr,
    areaServed: input.areaServed || ['Antalya'],
    sameAs: input.sameAs || ORG.social
  };
  if (input.geo) {
    base.geo = {
      '@type': 'GeoCoordinates',
      latitude: input.geo.latitude,
      longitude: input.geo.longitude
    };
  }
  return base;
}

export function buildBreadcrumbLD(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: it.url
    }))
  };
}

export function buildFaqLD(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

export interface ServicePackageInput {
  id: string;
  name: string;
  price: string; // formatted (e.g. "8500₺")
  numericPrice?: number; // if available
  category?: string;
  url?: string;
  currency?: string; // TRY default
  description?: string;
}

// Convert pricing packages to Service + Offer JSON-LD list
export function buildServicesLD(packages: ServicePackageInput[]) {
  return packages.map(p => {
    const raw = p.numericPrice || parseInt(p.price.replace(/[^0-9]/g, '') || '0', 10);
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: p.name,
      category: p.category || 'Fotoğrafçılık',
      provider: { '@type': 'Organization', name: ORG.name, url: SITE_URL },
      offers: {
        '@type': 'Offer',
        price: raw.toString(),
        priceCurrency: p.currency || 'TRY',
        availability: 'https://schema.org/InStock',
        url: p.url || `${SITE_URL}/fiyatlandirma#${encodeURIComponent(p.id)}`
      }
    };
  });
}

export function buildWebPageLD({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${SITE_URL}${path}`
  };
}
