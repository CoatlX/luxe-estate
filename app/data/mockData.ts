export interface FeaturedProperty {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  images: string[];
  tag: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  images: string[];
  type: 'SALE' | 'RENT';
  hiddenClass?: string;
  priceSuffix?: string;
}

