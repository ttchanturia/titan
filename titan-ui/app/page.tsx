'use client';

import Link from 'next/link';
import Nav from './components/Nav';
import Footer from './components/Footer';
import NewsletterForm from './components/NewsletterForm';
import { useProducts } from '@/lib/hooks';
import { DEFAULT_PRODUCT_IMAGE } from '@/lib/constants';

export default function HomePage() {
  const { data: products } = useProducts();
  const latestProduct = products?.reduce<(typeof products)[number] | undefined>(
    (latest, p) => (!latest || p.id > latest.id ? p : latest),
    undefined,
  );

  return (
    <>
      <Nav />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-surface">
          <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            <div className="lg:col-span-5 z-10">
              <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase mb-6 text-on-surface-variant">
                The 2024 Collection
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-headline font-extrabold tracking-tighter leading-[0.9] mb-8">
                The Soul of <br />
                <span className="text-outline">Precision.</span>
              </h1>
              <p className="text-lg text-on-surface-variant max-w-md mb-12 font-light leading-relaxed">
                Experience the resonant depth of the MK-II Signature Series.
                Crafted for those who hear the difference between a note and a
                story.
              </p>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  href="/products"
                  className="bg-primary text-on-primary px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-primary-container active:scale-95 transition-all duration-200"
                >
                  Explore Series
                </Link>
                <Link
                  href="/products/sg-240"
                  className="text-sm font-bold uppercase tracking-widest flex items-center group"
                >
                  Technical Specs
                  <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7 relative">
              <div className="aspect-4/5 bg-surface-container-low relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={latestProduct?.name ?? 'Featured instrument'}
                  className="w-full h-full object-cover grayscale contrast-125"
                  src={latestProduct?.imageUrl || DEFAULT_PRODUCT_IMAGE}
                />
                <div className="absolute bottom-10 -left-5 bg-primary text-on-primary px-8 py-4 -rotate-90 origin-left text-[10px] tracking-[0.5em] font-bold uppercase">
                  Handcrafted in London
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Instruments */}
        <section className="bg-surface-container-low py-32 overflow-hidden">
          <div className="max-w-screen-2xl mx-auto px-8 mb-20">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-4xl font-headline font-bold tracking-tight">
                  Featured Instruments
                </h2>
                <div className="w-12 h-1 bg-primary mt-4"></div>
              </div>
              <Link
                href="/products"
                className="text-sm font-semibold underline underline-offset-8 decoration-1"
              >
                View Entire Gallery
              </Link>
            </div>
          </div>
          <div className="flex gap-8 px-8 overflow-x-auto no-scrollbar snap-x snap-mandatory">
            {/* Card 1 */}
            <div className="flex-none w-75 md:w-112.5 snap-center">
              <div className="aspect-3/4 bg-surface relative group mb-6 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Vintage acoustic guitar against a minimal studio background"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUiyuTKRup-WCp7nzD5vZJ8hJJYrl5qV19vyMpNvncMwREkP4BPwinYxCXPZ06J3Y5ryZGR5Wps0Eguhdo-EJrC-zlupAvHu-ef8b00Ir0M6tcW6Z53f_lHHyTcHAJqCsUwbU5c4P-QR4WNzUHIaMykPpqT9YEnH_biNNJ60fs6BoJxWjkcZEAGl1Z7AuFecL58C0xZWUJhnkDOwWKl0y2bgZsavXsyFe9L_BpOJlmoN-rJKqHPR78TVctqCFnxyoZYkBn3B0zxHY"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-lg font-headline font-bold mb-1">
                Dreadnought Series
              </h3>
              <p className="text-sm text-on-surface-variant font-medium">
                Acoustic Engineering
              </p>
            </div>
            {/* Card 2 */}
            <div className="flex-none w-75 md:w-112.5 snap-center">
              <div className="aspect-3/4 bg-surface relative group mb-6 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Modern electric bass guitar detail"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtYnaHbOcrQazuyhunYvGs0PsaSblTAKsOlHDeQ89k0ZKQLfs1BpZ3a9poaS5Ra7jxTDL2ZUF82SvjpdvH5vdZ_u1_zajR6sbFzY5nmoAeCQf5sGxFJ3ffWBVw3QRPwfECwkuY4RK1yEHHiXisnj93Hn73qpAyx77eYqHBZ5J3bjtd5-t-cjzQAMHQkEF4T2-vYOtNLaM3XucUQ-ENN9xEUY9wpxo6c0q6175NqWDBmkAbmcFC2v0D1PVG4r-iqsbSnZ7AUCjMLfc"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-lg font-headline font-bold mb-1">
                Deep Resonance Bass
              </h3>
              <p className="text-sm text-on-surface-variant font-medium">
                Precision Low-End
              </p>
            </div>
            {/* Card 3 */}
            <div className="flex-none w-75 md:w-112.5 snap-center">
              <div className="aspect-3/4 bg-surface relative group mb-6 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Close up of a premium piano keyboard"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBosCeO_YIJGT_egoD5caDhk2A_uGG6YhRs2HWxlpO481sdXunr2zZa9EaEhCcnPq1ji5AJPW_rp3yeBKxDgVRzVmCMXE-pO0QxLcQFcNgAZ5MnHUzUiXtua6ilqxK9tvhhI5h6wfDuhJBveRiJjIJeqQ2PvFJpbHuGQ52-t4fB57UZDE4n4u01hl3yr3yARXyatwuhfyWUiOmLHTVoHulXuwl-MPa56W_ayY-G0sqqEKUsmS4JTEoGnT6pSksA7vLOfohgL--8Dts"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <h3 className="text-lg font-headline font-bold mb-1">
                Grand Concert Series
              </h3>
              <p className="text-sm text-on-surface-variant font-medium">
                Studio Keys
              </p>
            </div>
          </div>
        </section>

        {/* New Arrivals Bento */}
        <section className="py-32 bg-surface">
          <div className="max-w-screen-2xl mx-auto px-8">
            <div className="mb-20 text-center max-w-2xl mx-auto">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-outline mb-4 block">
                New Arrivals
              </span>
              <h2 className="text-5xl font-headline font-extrabold tracking-tighter">
                Engineered for the Uncompromising.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-200">
              {/* Large Feature */}
              <div className="md:col-span-7 bg-surface-container relative group overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  alt="Professional studio monitors on a minimalist desk"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5s0J6LvIwjgs6QFQjNotHWSB2fyIpstOTlKLQQM9w5zcobi6O35Q4PonYTl1jkWoZKXohd3Ccue-vmNsl6rwU1Di8V11J0xmVb5utFPhq3DVmm_TF8i1nkXjCXujp6Cw3c3HLi9iTMIBv7Z_BfMvr4E0xTwPre2gnKabM2UmnZHRXJBE5GftdlSZK6kRvrdFma2ZpKCKZoCu98V-OiPn4SxXIJfgTiKqhcCQCLNEK7lG1T184tLtEfTJTK-yR-L6S7FH523OI66o"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex flex-col justify-end p-12">
                  <h3 className="text-3xl text-white font-headline font-bold mb-4">
                    Carbon Studio Monit-X
                  </h3>
                  <button className="w-fit text-white text-xs font-bold uppercase tracking-widest border-b border-white pb-2">
                    Learn More
                  </button>
                </div>
              </div>
              {/* Vertical Split */}
              <div className="md:col-span-5 grid grid-rows-2 gap-6">
                <div className="bg-surface-container-high p-12 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xl font-bold mb-2">
                      Pedalboard Precision
                    </h4>
                    <p className="text-sm text-on-surface-variant">
                      The 2024 Analog Series
                    </p>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-32 object-contain grayscale"
                    alt="Minimalist silver guitar pedal"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOE4mNHpCaCGJ0BVeXd1eIjgpwSk0Cmg4nYSHhLAxfvUTZ3oPR-5qz71v9ElOhLNLLim_9rdm0ZA2mhJDALsKcR6FoUSTcMoJg-6y30W7amvvTfGMsxycTpHKr0WXygENTcfjdomj9WOao9tOjrNzyK6hz7yQANy_EKomSYqxqSvPcIMhZjrqeTupJRGurvmNNZUBzC3_3bNi3lTIQOTvD5uHzoDY0HwFdB64zrZ2d9PbJ1X-M4mjEy-_hgoGFl1tuzHiI3CDEMg4"
                  />
                </div>
                <div className="bg-primary text-white p-12 flex flex-col justify-between">
                  <span
                    className="material-symbols-outlined text-4xl"
                    style={{
                      fontVariationSettings:
                        "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24",
                    }}
                  >
                    star
                  </span>
                  <div>
                    <h4 className="text-xl font-bold mb-2">
                      Artist Collaborations
                    </h4>
                    <p className="text-sm text-surface-dim">
                      Limited edition artifacts designed with world-class
                      engineers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-32 bg-surface-container-low border-t border-outline-variant/10">
          <div className="max-w-screen-2xl mx-auto px-8 text-center">
            <h2 className="text-3xl font-headline font-bold mb-8">
              Join the Sonic Circle.
            </h2>
            <p className="text-on-surface-variant max-w-xl mx-auto mb-12 font-light">
              Gain exclusive access to limited instrument drops, technical
              masterclasses, and gallery events.
            </p>
            <NewsletterForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
