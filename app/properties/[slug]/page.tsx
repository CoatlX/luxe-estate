import { supabase } from '../../../lib/supabase';
import { notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';
import PropertyMapWrapper from '../../components/PropertyMapWrapper';
import { Metadata } from 'next';
import Image from 'next/image';

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const { data } = await supabase
    .from('properties')
    .select('title, location, images')
    .eq('slug', params.slug)
    .single();

  if (!data) {
    return { title: 'Property Not Found' };
  }

  return {
    title: `${data.title} - LuxeEstate`,
    description: `Beautiful property located in ${data.location}`,
    openGraph: {
      images: [data.images[0]],
    },
  };
}

export default async function PropertyDetails(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  
  const { data: property } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!property) {
    notFound();
  }

  const galleryImages = property.images && property.images.length > 0 ? property.images : [];

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Left Column - Gallery */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-sm group">
              <Image 
                alt={property.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={property.images[0]}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {property.is_featured && (
                  <span className="bg-mosque text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">Premium</span>
                )}
                {property.tag && (
                  <span className="bg-white/90 backdrop-blur text-nordic text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">{property.tag}</span>
                )}
              </div>
              <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-nordic px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur transition-all flex items-center gap-2">
                <span className="material-icons text-sm">grid_view</span>
                View All Photos
              </button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x">
              {galleryImages.map((img: string, index: number) => (
                <div key={index} className={`relative flex-none w-48 aspect-[4/3] rounded-lg overflow-hidden cursor-pointer snap-start transition-opacity ${index === 0 ? 'ring-2 ring-mosque ring-offset-2 ring-offset-clear-day' : 'opacity-70 hover:opacity-100'}`}>
                  <Image 
                    alt={`${property.title} - Image ${index + 1}`} 
                    className="w-full h-full object-cover" 
                    src={img}
                    fill
                    sizes="192px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Overview & Action Card */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-28 space-y-6">
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-mosque/5">
                <div className="mb-4">
                  <h1 className="text-4xl font-display font-light text-nordic mb-2">{property.price}{property.price_suffix && <span className="text-xl text-nordic/50">{property.price_suffix}</span>}</h1>
                  <p className="text-nordic/60 font-medium flex items-center gap-1">
                    <span className="material-icons text-mosque text-sm">location_on</span>
                    {property.location}
                  </p>
                </div>
                
                <div className="h-px bg-slate-100 my-6"></div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm relative">
                    <Image 
                      alt="Agent Profile" 
                      className="object-cover" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w"
                      fill
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-nordic">Sarah Jenkins</h3>
                    <div className="flex items-center gap-1 text-xs text-mosque font-medium">
                      <span className="material-icons text-[14px]">star</span>
                      <span>Top Rated Agent</span>
                    </div>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <button className="p-2 rounded-full bg-mosque/10 text-mosque hover:bg-mosque hover:text-white transition-colors">
                      <span className="material-icons text-sm">chat</span>
                    </button>
                    <button className="p-2 rounded-full bg-mosque/10 text-mosque hover:bg-mosque hover:text-white transition-colors">
                      <span className="material-icons text-sm">call</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-mosque hover:bg-primary-hover text-white py-4 px-6 rounded-lg font-medium transition-all shadow-lg shadow-mosque/20 flex items-center justify-center gap-2 group">
                    <span className="material-icons text-xl group-hover:scale-110 transition-transform">calendar_today</span>
                    Schedule Visit
                  </button>
                  <button className="w-full bg-transparent border border-nordic/10 hover:border-mosque text-nordic/80 hover:text-mosque py-4 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2">
                    <span className="material-icons text-xl">mail_outline</span>
                    Contact Agent
                  </button>
                </div>
              </div>

              {/* Map Container */}
              <div className="bg-white p-2 rounded-xl shadow-sm border border-mosque/5 h-64 relative z-0">
                 <PropertyMapWrapper />
              </div>
              
            </div>
          </div>
        </div>

        {/* Bottom Description & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-mosque/5">
              <h2 className="text-lg font-semibold mb-6 text-nordic">Property Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10">
                  <span className="material-icons text-mosque text-2xl mb-2">square_foot</span>
                  <span className="text-xl font-bold text-nordic">{property.area}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10">
                  <span className="material-icons text-mosque text-2xl mb-2">bed</span>
                  <span className="text-xl font-bold text-nordic">{property.beds}</span>
                  <span className="text-xs uppercase tracking-wider text-nordic/50">Bedrooms</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10">
                  <span className="material-icons text-mosque text-2xl mb-2">shower</span>
                  <span className="text-xl font-bold text-nordic">{property.baths}</span>
                  <span className="text-xs uppercase tracking-wider text-nordic/50">Bathrooms</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-mosque/5 rounded-lg border border-mosque/10">
                  <span className="material-icons text-mosque text-2xl mb-2">directions_car</span>
                  <span className="text-xl font-bold text-nordic">2</span>
                  <span className="text-xs uppercase tracking-wider text-nordic/50">Garage</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-mosque/5">
              <h2 className="text-lg font-semibold mb-4 text-nordic">About this home</h2>
              <div className="prose prose-slate max-w-none text-nordic/70 leading-relaxed">
                <p className="mb-4">
                  Experience modern luxury in this architecturally stunning home located in the heart of {property.location}. Designed with an emphasis on indoor-outdoor living, the residence features floor-to-ceiling glass walls that flood the interiors with natural light.
                </p>
                <p>
                  The open-concept kitchen is equipped with top-of-the-line appliances and custom cabinetry, perfect for culinary enthusiasts. Retreat to the primary suite, a sanctuary of relaxation with a spa-inspired bath and private balcony.
                </p>
              </div>
              <button className="mt-4 text-mosque font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                Read more
                <span className="material-icons text-sm">arrow_forward</span>
              </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-mosque/5">
              <h2 className="text-lg font-semibold mb-6 text-nordic">Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                <div className="flex items-center gap-3 text-nordic/70">
                  <span className="material-icons text-mosque/60 text-sm">check_circle</span>
                  <span>Smart Home System</span>
                </div>
                <div className="flex items-center gap-3 text-nordic/70">
                  <span className="material-icons text-mosque/60 text-sm">check_circle</span>
                  <span>Swimming Pool</span>
                </div>
                <div className="flex items-center gap-3 text-nordic/70">
                  <span className="material-icons text-mosque/60 text-sm">check_circle</span>
                  <span>Central Heating & Cooling</span>
                </div>
                <div className="flex items-center gap-3 text-nordic/70">
                  <span className="material-icons text-mosque/60 text-sm">check_circle</span>
                  <span>Electric Vehicle Charging</span>
                </div>
              </div>
            </div>

            <div className="bg-mosque/5 p-6 rounded-xl border border-mosque/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-full text-mosque shadow-sm">
                  <span className="material-icons">calculate</span>
                </div>
                <div>
                  <h3 className="font-semibold text-nordic">Estimated Payment</h3>
                  <p className="text-sm text-nordic/60">Calculate your monthly rate based on down payment.</p>
                </div>
              </div>
              <button className="whitespace-nowrap px-4 py-2 bg-white border border-nordic/10 rounded-lg text-sm font-semibold hover:border-mosque transition-colors text-nordic">
                Calculate Mortgage
              </button>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
