import Navbar from './components/Navbar';
import FeaturedPropertyCard from './components/FeaturedPropertyCard';
import PropertyCard from './components/PropertyCard';
import HomeSearch from './components/HomeSearch';
import { supabase } from '../lib/supabase';
import { Property, FeaturedProperty } from './data/mockData';
import Link from 'next/link';

export default async function Home(
  props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  const page = typeof searchParams?.page === 'string' ? parseInt(searchParams.page, 10) : 1;
  const itemsPerPage = 8;
  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  const query = typeof searchParams?.query === 'string' ? searchParams.query : '';
  const typeFilter = typeof searchParams?.type === 'string' ? searchParams.type : '';
  const minPrice = typeof searchParams?.minPrice === 'string' ? parseInt(searchParams.minPrice, 10) : 0;
  const maxPrice = typeof searchParams?.maxPrice === 'string' ? parseInt(searchParams.maxPrice, 10) : 0;
  const beds = typeof searchParams?.beds === 'string' ? parseInt(searchParams.beds, 10) : 0;
  const baths = typeof searchParams?.baths === 'string' ? parseInt(searchParams.baths, 10) : 0;

  const hasActiveFilters = !!(query || (typeFilter && typeFilter !== 'Any Type' && typeFilter !== 'All') || minPrice > 0 || maxPrice > 0 || beds > 0 || baths > 0);

  // Fetch featured properties (is_featured = true)
  const { data: featuredData } = await supabase
    .from('properties')
    .select('*')
    .eq('is_featured', true)
    .order('id', { ascending: true });

  // Build the main query with filters for regular properties
  let dbQuery = supabase
    .from('properties')
    .select('*', { count: 'exact' });

  if (query) {
    dbQuery = dbQuery.or(`location.ilike.%${query}%,title.ilike.%${query}%`);
  }
  
  if (typeFilter && typeFilter !== 'Any Type') {
    // Basic mapping since the UI has fine-grained types but DB currently just has SALE/RENT.
    // For now, assume Apartment/Penthouse = RENT, House/Villa = SALE for demonstration,
    // or just search in 'tag'/'title' if 'type' in DB is strict. Let's search in title for exact property types if they exist.
    dbQuery = dbQuery.ilike('title', `%${typeFilter}%`);
  }

  if (minPrice > 0) {
    dbQuery = dbQuery.gte('price_numeric', minPrice);
  }
  if (maxPrice > 0) {
    dbQuery = dbQuery.lte('price_numeric', maxPrice);
  }
  if (beds > 0) {
    dbQuery = dbQuery.gte('beds', beds);
  }
  if (baths > 0) {
    dbQuery = dbQuery.gte('baths', baths);
  }

  // Execute paginated query for standard properties
  const { data: paginatedData, count } = await dbQuery
    .eq('is_featured', false)
    .order('id', { ascending: true })
    .range(from, to);

  const featuredProperties: FeaturedProperty[] = (featuredData || []).map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    location: p.location,
    price: p.price,
    beds: p.beds,
    baths: p.baths,
    area: p.area,
    images: p.images,
    tag: p.tag
  }));

  const newProperties: Property[] = (paginatedData || []).map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    location: p.location,
    price: p.price,
    beds: p.beds,
    baths: p.baths,
    area: p.area,
    images: p.images,
    type: p.type,
    priceSuffix: p.price_suffix,
    hiddenClass: p.hidden_class
  }));
  
  const totalItems = count || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Search Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-nordic-dark leading-tight">
              Find your{' '}
              <span className="relative inline-block">
                <span className="relative z-10 font-medium">sanctuary</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-mosque/20 -rotate-1 z-0"></span>
              </span>
              .
            </h1>
            <HomeSearch />
          </div>
        </section>

        {/* Featured Collections Section */}
        {!hasActiveFilters && (
          <section className="mb-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-light text-nordic-dark">
                  Featured Collections
                </h2>
                <p className="text-nordic-muted mt-1 text-sm">
                  Curated properties for the discerning eye.
                </p>
              </div>
              <a className="hidden sm:flex items-center gap-1 text-sm font-medium text-mosque hover:opacity-70 transition-opacity" href="#">
                View all <span className="material-icons text-sm">arrow_forward</span>
              </a>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProperties.map((property) => (
                <FeaturedPropertyCard key={property.id} property={property} />
              ))}
            </div>
          </section>
        )}

        {/* New in Market Section */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-light text-nordic-dark">
                {hasActiveFilters ? 'Search Results' : 'New in Market'}
              </h2>
              <p className="text-nordic-muted mt-1 text-sm">
                {hasActiveFilters ? `Found ${totalItems} properties matching your criteria.` : 'Fresh opportunities added this week.'}
              </p>
            </div>
            <div className="hidden md:flex bg-white p-1 rounded-lg">
              <button className="px-4 py-1.5 rounded-md text-sm font-medium bg-nordic-dark text-white shadow-sm">
                All
              </button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic-muted hover:text-nordic-dark">
                Buy
              </button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic-muted hover:text-nordic-dark">
                Rent
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-4">
              {hasPrevPage ? (
                <Link 
                  href={`/?page=${page - 1}`}
                  className="px-6 py-2 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-all hover:shadow-md"
                >
                  Previous
                </Link>
              ) : (
                <button disabled className="px-6 py-2 bg-gray-50 border border-gray-200 text-gray-400 font-medium rounded-lg cursor-not-allowed">
                  Previous
                </button>
              )}

              <span className="text-sm font-medium text-nordic-muted">
                Page {page} of {totalPages}
              </span>

              {hasNextPage ? (
                <Link 
                  href={`/?page=${page + 1}`}
                  className="px-6 py-2 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-all hover:shadow-md"
                >
                  Next
                </Link>
              ) : (
                <button disabled className="px-6 py-2 bg-gray-50 border border-gray-200 text-gray-400 font-medium rounded-lg cursor-not-allowed">
                  Next
                </button>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
