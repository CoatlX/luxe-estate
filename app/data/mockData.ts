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

export const featuredProperties: FeaturedProperty[] = [
  {
    id: 'f1',
    title: 'The Glass Pavilion',
    location: 'Beverly Hills, California',
    price: '$5,250,000',
    beds: 5,
    baths: 4.5,
    area: '4,200 m²',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCra-FKp81t0_OM8bWD55m2o9OOSnR_v7D0UilyExMImxyIcr9tIMZ2Py3HcC0ra_MtSsBkduMcwxUNKI9_iSXFFr_YRON1SF9hNM3fcYy-uG7N7uusL0Z367WINi1V7_GwfNQx-gsbUqLtzVi4ivFyqFQGb4qBs79bALeSFb6i3_ZnJnI1VVrN-VeZYHjfYyQI5C6zy90N3uxWZpwzIBhNoUDKKQjQ8EOEYPoyPTzhnh6b6AS3dkkFJ8t4xSDC6qjhMrQUoUPnAeM',
    tag: 'Exclusive'
  },
  {
    id: 'f2',
    title: 'Azure Heights Penthouse',
    location: 'Downtown, Vancouver',
    price: '$3,800,000',
    beds: 3,
    baths: 3,
    area: '2,100 m²',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDurAGHzg_fpQxFal-obkFVy1Q3WLPdueAQpz0itcQiRV-WfvulnBEDJbNeV8J06q4mX7PTtXYVJjX4-mHVr_khZLZxQ_s8f6fruGqzeqALyMu8wEHRK1EsOs9f4_jPmS7FxcdzrDkR88Wz0GjaPLXkTZRoJQfur59rxYRLi-WYcW-VU_gKS39CPLOMlftvqGvW0IOk5tXgst5mJ4WQM-ICN4vkdel9ido9YFUQga0OI10i6NSe5W4owt33-2YRi_b_ltdZW2QZC5s',
    tag: 'New Arrival'
  }
];

export const newProperties: Property[] = [
  {
    id: 'n1',
    title: 'Modern Family Home',
    price: '$850,000',
    location: '123 Pine St, Seattle',
    beds: 3,
    baths: 2,
    area: '120m²',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuQ9M7U6euA6_cXmYuXnej-N5IuawAW8ds-4G1mzfqmiBc13qXsPhf9_j_zTB8gfEunrBHo8xMsxYwCw_pl8fsxbxRkmyvLR1N9Tiye5ZJG7fwlLn9MwyBanXYhE0emGwp59es1FEyQTRQbmXLUKO74Yj34ZHqrqIkOtMKhP8CmRFvfoHT5LAe10105vUhKNkxIBvtt530nfLigSUTemOOcJMVNmsgactntRJUwOBU_TZzND7BYtDklr8uZcNYlQOK5U74-ufIf-E',
    type: 'SALE'
  },
  {
    id: 'n2',
    title: 'Urban Loft',
    price: '$3,200',
    priceSuffix: '/mo',
    location: '456 Elm Ave, Portland',
    beds: 1,
    baths: 1,
    area: '85m²',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4zNatD3vePhIZAi6OHHJKmamYSgeBNSKjEt32tvkkf4s6aBXCF8R4LNfDfPa9leA0t6N1OKOcP358WwZrnosbCBxSM7EaY2_P7qkx3MinRgmHQn7RvleNTwy8cLigMoR3iv0u83chBVbZYI6BcNMcqv80W-l1pIUgIWZcDIXEqtUatrsojSGfM0lTNDZpkBntBUkRY6NB4ZUymYNYvTHXKbO8NZ6N6uoyuuHqcaRWKzHCNXkOR3p-_EVFAHR8QwijIY_m1mefPZ4',
    type: 'RENT'
  },
  {
    id: 'n3',
    title: 'Highland Retreat',
    price: '$620,000',
    location: '789 Mountain Rd, Bend',
    beds: 2,
    baths: 2,
    area: '98m²',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARQWC19e7mleUpjb8CWLztEv_svJeRFOaC2i-9r9GctFuX5Barzhfai9wNM1WW8bcGlqdFM32d3KPf7SItom5ijdHOz5rGGQPeT7PlWs8-y9LkfcsHLQqsLxalhxP94XJo76_mAMp7T2dVj3hPKHNzTDLLiS6ujSdSsyo3onxQthp4ZkVE8op92gyTLUUucaGaxO8vJvyhH3HuWB07EPqT1WsW0lr9Of5lUPonjG9eiqE1XiJXTqzXUZQt5JorfPwCO1MioZA_Zro',
    type: 'SALE'
  },
  {
    id: 'n4',
    title: 'Sea View Penthouse',
    price: '$4,500',
    priceSuffix: '/mo',
    location: '321 Ocean Dr, Miami',
    beds: 3,
    baths: 3,
    area: '180m²',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGq4Phm0uDzCnjHAsnWpYTBVpOds_M6iOsJuRQQA5eUZHkztGgtc7eh_OE6wBeyW1-iZh7yyhROnvvmqkAZ9tyAWFGXk0FG52zU4kZ_EDLA0U0cRszy7byNXTeWe0_hS53SYmtCTEV8Y1AM-WxiIC38UMa15QwFDjXtCGQOxoh35K0Ol_70vfsxm0VqDbaWkr8tcEbLTLy0NXH_GcpGK4lAXizgxYOIlFWGyau-4OIfPZRpjCBDbz_qu3VlN201UUJGiuM9ajVd-U',
    type: 'RENT'
  },
  {
    id: 'n5',
    title: 'Central Studio',
    price: '$550,000',
    location: '555 Main St, Chicago',
    beds: 1,
    baths: 1,
    area: '50m²',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1w-Hb1289NqZKon3VK8bpmMiCDYYiAMT5egzTINo9m9wSZRHv-k-1IGTVoL1NT8YeZXJHa87JPNDIPrtrbP7jChHq0ypXF90uByhC6VA9O788_B4FY8JVg4chbWN9bcrn9-9FvVvfZX8Aj60Iqg_C8CsCA9DEnJqi2rJvzmK5UP5z-9XRTRjBneAPCa8iGgGWBD9yYKsziN6vn0ePBDGo3inieQtmbr46W31p6UfQ649XRxTm7ygOY2J-jxW1r0qWs8i97KGpkTE',
    type: 'SALE',
    hiddenClass: 'hidden xl:flex'
  },
  {
    id: 'n6',
    title: 'Garden Villa',
    price: '$2,800',
    priceSuffix: '/mo',
    location: '999 Oak Ln, Austin',
    beds: 2,
    baths: 2,
    area: '110m²',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfGXdY0g51ojSg0GMeTW9ndLY3mpKK3oMtWxo2nwd_dwi1pgn1Boi_ovaDGIFhUA7nwu3WdBch8ZuHxoHu3QfgM5ceAsp8pglRVyCROWNcy9zeDNP2wqLoevyKGcaEyFYHYpIx2KK46nLWthnHiHugmkKw48kJsL8IjMO1bL3T1Zwt8bvQDTTUHTgB3GqZ2RU2asRzF1jVg0rLw3LWXXTq0YF1CsbhlWpYOuCEpH5bB8zkBlbKXR4At_M46AL8rJqn5c6BrPD5PP8',
    type: 'RENT',
    hiddenClass: 'hidden lg:flex'
  },
  {
    id: 'n7',
    title: 'Sunset Hills Villa',
    price: '$1,850,000',
    location: '824 Sunset Blvd, Los Angeles',
    beds: 4,
    baths: 3.5,
    area: '280m²',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    type: 'SALE'
  },
  {
    id: 'n8',
    title: 'Cozy Forest Cabin',
    price: '$2,400',
    priceSuffix: '/mo',
    location: '104 Alpine Way, Aspen',
    beds: 2,
    baths: 1,
    area: '75m²',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    type: 'RENT'
  },
  {
    id: 'n9',
    title: 'Nordic Minimalist House',
    price: '$920,000',
    location: '42 Fjord Rd, Oslo',
    beds: 3,
    baths: 2,
    area: '140m²',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80',
    type: 'SALE'
  },
  {
    id: 'n10',
    title: 'Aesthetic Studio Loft',
    price: '$1,800',
    priceSuffix: '/mo',
    location: '88 Soho St, London',
    beds: 1,
    baths: 1,
    area: '60m²',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    type: 'RENT'
  },
  {
    id: 'n11',
    title: 'Suburban Luxury Residence',
    price: '$1,250,000',
    location: '702 Maple Ave, Boston',
    beds: 4,
    baths: 3,
    area: '220m²',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    type: 'SALE'
  },
  {
    id: 'n12',
    title: 'Beachfront Sanctuary',
    price: '$5,600',
    priceSuffix: '/mo',
    location: '15 Coastal Hwy, Malibu',
    beds: 3,
    baths: 2.5,
    area: '165m²',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    type: 'RENT'
  },
  {
    id: 'n13',
    title: 'Contemporary Penthouse',
    price: '$2,100,000',
    location: '89 Broadway, New York',
    beds: 3,
    baths: 3,
    area: '195m²',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    type: 'SALE'
  },
  {
    id: 'n14',
    title: 'Lakefront Retreat',
    price: '$3,500',
    priceSuffix: '/mo',
    location: '512 Lakeview Dr, Tahoe',
    beds: 3,
    baths: 2,
    area: '130m²',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    type: 'RENT'
  },
  {
    id: 'n15',
    title: 'Charming Country Cottage',
    price: '$450,000',
    location: '33 Meadow Lane, Cotswolds',
    beds: 2,
    baths: 1.5,
    area: '88m²',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
    type: 'SALE'
  },
  {
    id: 'n16',
    title: 'Modernist Desert Oasis',
    price: '$4,200',
    priceSuffix: '/mo',
    location: '77 Palm Canyon Dr, Palm Springs',
    beds: 3,
    baths: 3,
    area: '175m²',
    image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80',
    type: 'RENT'
  }
];
