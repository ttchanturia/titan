import Link from 'next/link';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

export default function SG240Page() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24">
        {/* Hero Product Section */}
        <section className="max-w-screen-2xl mx-auto px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Product Gallery */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-surface-container-low p-12 relative overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Professional Acoustic Guitar"
                  className="w-full h-[700px] object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoI3hxdEkrOd4JH73yNau5PMd6t9u69SE-V9bj5BA5AzgiMLJGgoTRJPNv2pCcpDD5JpdgK7lZIRXjyjnxWGvU44HfkwdK68OXL1Lr_SQ0nihqRXuS3kXQNHlhA2157DqDgVMpn7rYwFmzj5FffA48wBVUAeUs8682rfzApkiVS45FU1JnfwHUBEdAjpzSW4rfcKNBSKWaZUsFLcytFX_u6FsgzmZDQfBsJjnNJqfMOvzD5VmpiOj-V2lmM4NIzeg-NyS-uhqdY0U"
                />
                <div className="absolute bottom-8 left-8">
                  <span className="bg-primary text-on-primary px-3 py-1 text-[10px] tracking-widest uppercase font-bold">
                    Limited Edition
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-8">
                <div className="bg-surface-container aspect-square overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover"
                    alt="Guitar headstock detail with chrome tuners"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIRaZ_m4I7Bt3bvf2dvp6icLQE1xoL4-iiHjZqtqQ02lfmKYLrDN8WMCb4QctZImlgMvhYFWYwbLt-lzd8Zl--DXaV-THOAel-wqyDp-laeSKIMDYviEnVtT1vx6SNxWC_txCjG2rCOx3kRgj0AC4oJlgOC6gjrGMspn996kI5XWC5pjFT5eBizFg5SDVYCuavm2Q0qo_SkDwOni9YU3DIpetI6nLRInV9EOK2F4PDa-2Bzisyr0mlhiQzG7oom7Vm9u5lPnSwTYg"
                  />
                </div>
                <div className="bg-surface-container aspect-square overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover"
                    alt="Guitar bridge and strings detail close-up"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCO87BmTZ2CFFQLrTpxl5rf_lzFqyr-AEKovU6r6v4PB3PSwgK4wc9jhaSvvfi1NC8O6A4JtYLSAk6HSvqJFcIoHzDoAyBGqlXs4l4s2ki_qwh8oepQVUp7mUk0Sh8DJQqm0LErql3BzzRwUx8twy-fSjWK_RvYJTQWd1VVMEFQpSYZBYMUTMgCnXwC3USCBDRG_kNn39ooXPYupoxrWbkBYw_Lp_aYQl5ePFPhTp_HmKtZlmx_Otc6Zy4iyAzLptUla7AlDw73mto"
                  />
                </div>
                <div className="bg-surface-container aspect-square overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover"
                    alt="Guitar soundhole and intricate rosette design"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3S68USnBoAG_p5O4Ah6FRsu7jPZHNGfUbNRqipv2XXw3i1wLAVTL2Dl14jA0u3QhfgnfpoAxU_4euxrueHribOCHUWTkHI_3fo5R46u288IGWqR3VjlaO2hZw9_FnQmzw90ykBNoWnzzIrnQqPzxbsgZvvXIr97oK4Yjl8ZMdRge2WgsuaEF3v8xfkcBuGV3aM_sAtG9OD_3LR0ZIUIydsqr0aM67mYzfLhM_tD_slOG9L342ttMMEBLuNNtWRoV4yrkcZIr4iOY"
                  />
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:col-span-5 sticky top-32">
              <div className="mb-12">
                <p className="font-headline font-bold text-on-surface-variant uppercase tracking-[0.2em] text-xs mb-4">
                  Masterpiece Series
                </p>
                <h1 className="font-headline text-5xl font-extrabold tracking-tighter mb-4 leading-none">
                  SG-240 Heritage Dreadnought
                </h1>
                <p className="text-xl text-on-surface-variant font-light leading-relaxed">
                  A resonance that defines a generation. Hand-crafted with Solid
                  Sitka Spruce and East Indian Rosewood.
                </p>
              </div>
              <div className="mb-10 flex items-baseline gap-4">
                <span className="text-4xl font-bold font-headline">
                  $4,299.00
                </span>
                <span className="text-on-surface-variant line-through text-lg font-light">
                  $4,850.00
                </span>
              </div>

              {/* Finish Options */}
              <div className="mb-10">
                <span className="block text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-4">
                  Select Finish
                </span>
                <div className="flex gap-4">
                  <button className="group flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#D4A76A] ring-2 ring-primary ring-offset-4 ring-offset-surface"></div>
                    <span className="text-[10px] uppercase font-medium tracking-tighter">
                      Natural
                    </span>
                  </button>
                  <button className="group flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#3D2517] ring-1 ring-outline-variant/20 hover:ring-primary/40 transition-all"></div>
                    <span className="text-[10px] uppercase font-medium tracking-tighter text-on-surface-variant">
                      Sunburst
                    </span>
                  </button>
                  <button className="group flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#1B1B1F] ring-1 ring-outline-variant/20 hover:ring-primary/40 transition-all"></div>
                    <span className="text-[10px] uppercase font-medium tracking-tighter text-on-surface-variant">
                      Onyx
                    </span>
                  </button>
                </div>
              </div>

              {/* Availability & Actions */}
              <div className="mb-10 p-6 bg-surface-container-low rounded-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-error"></div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-error">
                    Only 2 Left in Stock
                  </span>
                </div>
                <div className="space-y-4">
                  <Link href="/cart">
                    <button className="w-full bg-primary text-on-primary py-5 px-8 font-bold text-sm tracking-widest uppercase hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                      Add to Collection
                      <span className="material-symbols-outlined text-lg">
                        chevron_right
                      </span>
                    </button>
                  </Link>
                  <button className="w-full border border-outline-variant/40 py-5 px-8 font-bold text-sm tracking-widest uppercase hover:bg-surface-container-high transition-colors">
                    Find a Showroom
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-8 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">
                    verified
                  </span>
                  Lifetime Warranty
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">
                    local_shipping
                  </span>
                  White Glove Delivery
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Craftsmanship Editorial */}
        <section className="bg-surface-container-low py-32 overflow-hidden">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="relative">
                <div className="absolute -top-12 -left-12 w-64 h-64 bg-surface-container-high -z-10"></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full grayscale brightness-90"
                  alt="Macro of wood grain on acoustic guitar body"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4ldf54eXrEhD3mq5yYE5IA9wdsi6C89H6mdqcJVnxZgBSPkT5Co8t2bofwm2emyLkj8bjc3uqVPlCLT7RYCIowIcc6UZ2AjEFK1veV10LnCyxDNP6XIdyP756rOfBFJskhsDeVPvQgJacWvpqnPsKKFUhsx1Wk5rjz_NJ8JBLLfbas8xO_JTfTrNwQkcFTlpt6PyUZuf6Cn95862qzpzWwY5l-cqM5Sl3bQIGxfhckuW7IR4kHyiyw9aBYRuXh_5CkMG70jx2bcU"
                />
              </div>
              <div>
                <h2 className="font-headline text-4xl font-bold tracking-tighter mb-8 max-w-md leading-tight">
                  The Geometry of Unrivaled Clarity.
                </h2>
                <div className="space-y-6 text-on-surface-variant leading-relaxed font-light text-lg">
                  <p>
                    Every SG-240 begins as a single block of tonewood, selected
                    for its visual character and acoustic potential. Our
                    luthiers spend over 200 hours carving, sanding, and voicing
                    each instrument to ensure a balanced response across the
                    entire frequency spectrum.
                  </p>
                  <p>
                    The innovative V-Class bracing system acts as a new sonic
                    engine for the guitar, transforming the way the soundboard
                    vibrates to improve volume, sustain, and intonation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-32 bg-surface">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="mb-20">
              <h3 className="font-headline text-2xl font-bold tracking-tight mb-2">
                Technical Specifications
              </h3>
              <div className="w-12 h-1 bg-primary"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-24">
              <div>
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-6 pb-2 border-b border-outline-variant/20">
                  Body &amp; Construction
                </h4>
                <ul className="space-y-4">
                  {[
                    ['Body Shape', 'Dreadnought'],
                    ['Top Material', 'Solid Sitka Spruce'],
                    ['Back & Sides', 'Indian Rosewood'],
                    ['Bracing', 'V-Class Signature'],
                  ].map(([label, value]) => (
                    <li
                      key={label}
                      className="flex justify-between items-end border-b border-outline-variant/10 pb-2"
                    >
                      <span className="text-xs font-medium">{label}</span>
                      <span className="text-sm font-semibold">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-6 pb-2 border-b border-outline-variant/20">
                  Neck &amp; Fingerboard
                </h4>
                <ul className="space-y-4">
                  {[
                    ['Neck Material', 'Tropical Mahogany'],
                    ['Fingerboard', 'West African Ebony'],
                    ['Scale Length', '25.5"'],
                    ['Nut Width', '1.75"'],
                  ].map(([label, value]) => (
                    <li
                      key={label}
                      className="flex justify-between items-end border-b border-outline-variant/10 pb-2"
                    >
                      <span className="text-xs font-medium">{label}</span>
                      <span className="text-sm font-semibold">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-6 pb-2 border-b border-outline-variant/20">
                  Hardware &amp; Extras
                </h4>
                <ul className="space-y-4">
                  {[
                    ['Tuners', 'Sonic Chrome 24:1'],
                    ['Bridge', 'Ebony with Bone Saddle'],
                    ['Electronics', 'Acoustics ES-Premium'],
                    ['Case', 'Deluxe Hardshell Shell'],
                  ].map(([label, value]) => (
                    <li
                      key={label}
                      className="flex justify-between items-end border-b border-outline-variant/10 pb-2"
                    >
                      <span className="text-xs font-medium">{label}</span>
                      <span className="text-sm font-semibold">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What's in the Box */}
        <section className="py-32 bg-surface-container-high/30">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="flex justify-between items-end mb-16">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-on-surface-variant block mb-2">
                  Unboxing Experience
                </span>
                <h2 className="font-headline text-4xl font-extrabold tracking-tighter">
                  What&apos;s in the Box
                </h2>
              </div>
              <p className="max-w-xs text-xs text-on-surface-variant leading-relaxed">
                Everything you need for a lifetime of musical exploration,
                protected and curated.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2 bg-surface-container-low p-8 aspect-video flex flex-col justify-between group relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-20 group-hover:scale-110 transition-transform duration-1000"
                  alt="Premium leather guitar case interior"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUmSD_ZsO5c9aIzyGFLP5-1QnCtImg9jitvi3KJ9jN2_oUROyA1SvS5GCF8at-UupK27r9bfmIQAUvPuJAd5Otz9ZAuwpAxV59ULayAdiwPgYjtf3F1wchY9pJAhiVkjl7Tbe8ji_kCrsVneZU_JEhFXa5HiXI9pFHQkyiDaKtt8ZJvMBdZA3orVb2zpUN7tW4OEfqkN5ASjpFCHXEEN1iSHWfcnJgR46KZ1MYwGUajW4rgJeoLcZbRfj0fGMybiJkSku7t0Cu6PM"
                />
                <h5 className="relative text-xl font-bold tracking-tight">
                  Deluxe Hardshell Case
                </h5>
                <p className="relative text-xs font-medium max-w-[200px] text-on-surface-variant">
                  Military-grade protection with plush velvet interior lining.
                </p>
              </div>
              <div className="bg-surface p-8 flex flex-col justify-between border border-outline-variant/10">
                <div className="w-12 h-12 bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <div>
                  <h5 className="font-bold mb-1">Ownership Pack</h5>
                  <p className="text-[10px] text-on-surface-variant leading-tight">
                    Certificate of Authenticity and Warranty documentation.
                  </p>
                </div>
              </div>
              <div className="bg-surface p-8 flex flex-col justify-between border border-outline-variant/10">
                <div className="w-12 h-12 bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined">build</span>
                </div>
                <div>
                  <h5 className="font-bold mb-1">Adjustment Kit</h5>
                  <p className="text-[10px] text-on-surface-variant leading-tight">
                    Branded truss rod wrench and micro-fiber polishing cloth.
                  </p>
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
