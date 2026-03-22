import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const products = [
  {
    id: 'vanguard-s-type',
    name: 'Vanguard S-Type',
    price: '$2,499',
    finish: 'Alpine White Finish',
    status: 'Available',
    statusColor: 'bg-emerald-500',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrybC7WmTICIwmP0nZuWrZ3l3LNmNjBilTaAICjlnUo55PiFc3vzRYtgtkeIC52pQgGytSGMq54gv4mFcqAC2YFSY3vRiSdmUHNZ9M5PFBQD0b8ZxmMsxVT4xiq0gA4cDGjgFBFgwYeAtC18neWJCkXFYYz4IqapHMCZK1Q-4SSTHcsN49oHCky8iph8KoXA-fSsG5v78QT93AZiTku0uLfVyW3s9sZPpYlMzsmL_6VEcwleqfXvH3HGDxb_G3XKVbKcUoT7aQg-0',
    alt: 'Minimalist white electric guitar product shot',
  },
  {
    id: 'heritage-custom',
    name: 'Heritage Custom',
    price: '$3,150',
    finish: 'Vintage Sunburst',
    status: 'Available',
    statusColor: 'bg-emerald-500',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo-eevavhbBND8UoGWltS4VtpUzr1TlZsHXIFo3GOcHsHj4CaKRYzemNtfBqN7oNdzGwYOVdzQrVkyJXr0fagPmmIvLKdOCPlkJYFEwx2D8MIxsyoIqaaMmnHxiesjksz84EAJM8zH3w7iV6NGSY3gEkOzYo_QwfxD9w7k2KzX0MTLxKAkFwCXAO6Gv8la7vPxux8VCrHkJjuuoSpPdQu3IflNod6TIFKBzZ2l4msLHfm8uCri7voKzy0dP6j1nsESx6kQyO7hoUY',
    alt: 'Sunburst vintage style electric guitar on clear background',
  },
  {
    id: 'noir-pro-series',
    name: 'Noir Pro Series',
    price: '$1,899',
    finish: 'Obsidian Matte',
    status: 'Low Stock',
    statusColor: 'bg-amber-500',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWJXYR5xGOP-OMDzZYfUCLHCk1i52dPMdAV6xbIJtutM97NsMj5PIQp0dadWXtgKRYJzUxEeab6q7G3FKu2vOiSkSGw_G5o-BQTXyQcTSrtLSrKdLIdHXW-mNDXIXVoWp9ZloA3h0-w5rigGGSod21QS-oTh8Z1JUgepUoxg8i4Np5V5ziGAdoLXRzeHvXx8U18OFIMx3mGO6VVwflkHhVZTytj7yt2mwzLz7JF3kNS2DgKGw5JS-aOVKFADF_a_1-rwuKYvUS9OA',
    alt: 'Matte black solid body electric guitar',
  },
  {
    id: 'crimson-bolt',
    name: 'Crimson Bolt',
    price: '$2,200',
    finish: 'Candy Apple Red',
    status: 'Available',
    statusColor: 'bg-emerald-500',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPiyv8P0Dr1pGktMJckM2eSzFpp149XUlvZiIjAtO2k4hv103gk8WFqWPC7_RJmD4NqEEEWvLfuotUNE3Knswy7uMK_i2ZU1ctPWcW70GWxKrt85rOL3GtVq14UASBZnpPrbj4vPtl0OJGS9RxER3spLCNDiTZAvVrpy1he2lX_kNcbR9QscuafUdJc71nczs9OXO6SKka5-59kKBt_pySlTDoWpMnw-hzW8O--gV2hblA47dRsLzNo_N6rteN7dhhbpsREsHfTfk',
    alt: 'Metallic red electric guitar professional studio photography',
  },
  {
    id: 'studio-hollow-ii',
    name: 'Studio Hollow II',
    price: '$4,250',
    finish: 'Heritage Cherry',
    status: 'Available',
    statusColor: 'bg-emerald-500',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDZYlSI4mYs3hSrDNEkt0HyAgII1FHkw0brcc-0AtWMITDeRz1SRfk4KKk59BAUsdLCEoeyg89egbJ2GjYdLxCW1FNh1kS8fTHI9u4gtycu4YcBMi5biFo456sOO8EL7bF81xNT_ae-R8RoL9bbiWfbEpgIU-LUgW08SdnZAsLL0-N7qk-aJ_1RphKtGRb9QX6455y8gBI2csP5GHLrMgMnskByZr7Vmk9aXvPllnNK1DjvG6a7_mUSb0s_cN6IyZr2jevP1Ay_rQ',
    alt: 'Classic semi-hollow body electric guitar in cherry red',
  },
  {
    id: 'skyline-retro',
    name: 'Skyline Retro',
    price: '$1,550',
    finish: 'Daphne Blue',
    status: 'Coming Soon',
    statusColor: 'bg-slate-400',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBW4o8VxXO3UGWR7OHt4M-pGVN7Prm8gnEWJ8MlFTEiw-4VlzfIs_IJ-k6Wz8Ke7u1kbhrF3OfVaggmfDSuEERMHCHV-bhrsxa8Ti3f4-XR31A6AsCDmaOcDTnkEvrj0vYOsY0yWp1Cmty-kXUX_M-5S6NZRVKCVUiF1sVekNgDVLAhaYE6O2ovg6JWYdKdn8YOnpaxSMqcLFp-GABFuHXIPFsOzRdTvJLpM5YLhTd7mIEA57XePRQzTrvpY4L53vSC28i0dhSZGLA',
    alt: 'Light blue retro style electric guitar',
  },
];

export default function ProductsPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24">
        {/* Hero Header */}
        <header className="px-8 max-w-screen-2xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
              <span className="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant mb-4 block">
                Collection 01
              </span>
              <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-none text-primary">
                Electric Guitars
              </h1>
              <p className="mt-6 text-lg text-on-surface-variant font-light leading-relaxed">
                Engineered for the stage, refined for the studio. Discover our
                curated selection of high-fidelity solid bodies and hollow-core
                masterpieces.
              </p>
            </div>
            <div className="text-sm font-medium tracking-widest uppercase border-b border-primary/10 pb-2">
              24 Instruments Showing
            </div>
          </div>
        </header>

        {/* Listing Layout */}
        <section className="px-8 max-w-screen-2xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-32 space-y-12">
                {/* Brand Filter */}
                <div>
                  <h3 className="font-headline text-xs font-bold uppercase tracking-widest mb-6">
                    Brand
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between group cursor-pointer">
                      <span className="text-sm text-on-surface hover:text-primary transition-colors">
                        Stratosphere
                      </span>
                      <span className="text-[10px] text-on-surface-variant/40 group-hover:text-primary transition-colors">
                        08
                      </span>
                    </li>
                    <li className="flex items-center justify-between group cursor-pointer">
                      <span className="text-sm font-semibold text-primary">
                        Gibson Custom
                      </span>
                      <span className="text-[10px] text-primary">12</span>
                    </li>
                    <li className="flex items-center justify-between group cursor-pointer">
                      <span className="text-sm text-on-surface hover:text-primary transition-colors">
                        PRS Heritage
                      </span>
                      <span className="text-[10px] text-on-surface-variant/40 group-hover:text-primary transition-colors">
                        04
                      </span>
                    </li>
                  </ul>
                </div>
                {/* Price Range */}
                <div>
                  <h3 className="font-headline text-xs font-bold uppercase tracking-widest mb-6">
                    Price Range
                  </h3>
                  <div className="space-y-4">
                    <div className="h-[2px] bg-surface-container-highest relative">
                      <div className="absolute left-0 right-1/4 h-full bg-primary"></div>
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full"></div>
                      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-[11px] font-medium text-on-surface-variant uppercase">
                      <span>$800</span>
                      <span>$4,500</span>
                    </div>
                  </div>
                </div>
                {/* Finish Filter */}
                <div>
                  <h3 className="font-headline text-xs font-bold uppercase tracking-widest mb-6">
                    Finish
                  </h3>
                  <div className="grid grid-cols-4 gap-3">
                    <button className="w-full aspect-square bg-[#1B1B1F] rounded-sm ring-1 ring-offset-2 ring-primary"></button>
                    <button className="w-full aspect-square bg-[#8B0000] rounded-sm"></button>
                    <button className="w-full aspect-square bg-[#F5F5DC] rounded-sm"></button>
                    <button className="w-full aspect-square bg-[#4682B4] rounded-sm"></button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[4/5] bg-surface-container-low mb-6 overflow-hidden flex items-center justify-center p-12 transition-colors group-hover:bg-surface-container-high">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt={product.alt}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                        src={product.img}
                      />
                      <div className="absolute top-6 left-6 flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${product.statusColor}`}
                        ></span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                          {product.status}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-headline text-lg font-bold tracking-tight">
                          {product.name}
                        </h3>
                        <span className="font-body text-sm font-light">
                          {product.price}
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant/70 uppercase tracking-widest">
                        {product.finish}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-24 flex items-center justify-between pt-8 border-t border-outline-variant/10">
                <span className="text-xs text-on-surface-variant uppercase tracking-widest font-medium">
                  Page 01 of 04
                </span>
                <div className="flex gap-4">
                  <button className="w-12 h-12 flex items-center justify-center border border-outline-variant/30 hover:bg-primary hover:text-on-primary transition-all duration-300">
                    <span className="material-symbols-outlined">
                      chevron_left
                    </span>
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center border border-primary bg-primary text-on-primary hover:bg-primary-container transition-all duration-300">
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
