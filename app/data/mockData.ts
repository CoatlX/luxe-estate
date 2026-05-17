export interface FeaturedProperty {
  id: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  image: string;
  tag: string;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  area: string;
  image: string;
  type: 'SALE' | 'RENT';
  hiddenClass?: string;
  priceSuffix?: string;
}

