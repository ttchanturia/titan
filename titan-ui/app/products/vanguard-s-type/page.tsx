import Link from 'next/link';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

export default function VanguardSTypePage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24">
        {/* Product Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32 px-8 max-w-screen-2xl mx-auto">
          {/* Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-surface-container-low aspect-[4/5] overflow-hidden group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                alt="High-end electric guitar in Alpine White finish"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI6NMJenkrH8JuqOJAccc3g6NzkwoInYK5w-5S6vJsMQxciTO3SS4R-7Kyda9TX7zLueWxCBwtdxPS3EIJphwQkJK1bgzyndpPQ1E1G2NX_v8SlKaqeI0zhHtJPCyWSq-hHoKeegBuLrxdqAaUQobyqWMxE7LAkRe0RImKWjStrmD0928S6ajobk_rK7pBigHEsa2WGPH_vUnGbTgMlfOUYQRh3hoMUkWacvM5T0fdBOYOdQXqQa5JAMnD-oMImQidYZI0_ZiFVU4"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-surface-container-low aspect-square overflow-hidden cursor-pointer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                  alt="Detail of guitar headstock and tuners"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCvpsvp-2fDVh9wXvhbTxOEcFYYNclcRq2YViJQ5khTbsUO_Hhqn0XDToKLyodDGjs64EEZVaT6fG9suiSwoyx-PLbvgsBWFLpLPhnVhfXVMP6xrCDOL7d8IsuWdfREn1MJlqbhDZsw_iHwkOgdoBTuP61CCc42Nvoku9lUr_1k_aeUTctBo6JBuM75R-UT96Z508bynalmYa4C47CninXH9Q5m2LJAXeYHKQTQ8UHr_XAlfKBOq_XmIkKLrfPVqZxxlcpnSF4Bbs"
                />
              </div>
              <div className="bg-surface-container-low aspect-square overflow-hidden cursor-pointer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                  alt="Close up of guitar pickups and bridge"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1poGwoEmy9rgaMfe_KGRqfOJRRmHTGNSiSQzDNRzY-8Rtq2uECQphshcY3y0VckuOAh21-41rMOiiHJei-eIiY3W-w_GNqA5ZGA7WV_HPNH27WnMbmabK1DRh5AyGFy7q0CE4EVAgjGK_5szhtHgCe191IK9_m6ArW-7rAt_CDw5TAfHzIkknEgWKg8GW6rCadzxO1q2dMcWyhcPMtphFfjfuoiNryv6cbFYc1PBvb2RF9PyLhUVKpe4yj9eFM6jUUFKvx9QBhkE"
                />
              </div>
              <div className="bg-surface-container-low aspect-square overflow-hidden cursor-pointer flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant">
                  play_circle
                </span>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="space-y-1">
              <span className="font-headline text-xs uppercase tracking-[0.2em] text-on-surface-variant font-semibold">
                Titan Signature Series
              </span>
              <h1 className="font-headline text-5xl font-bold tracking-tight text-primary leading-tight">
                Vanguard S-Type
              </h1>
            </div>
            <div className="mt-8 flex items-baseline gap-4">
              <span className="font-headline text-3xl font-medium text-primary">
                $2,499.00
              </span>
              <span className="font-label text-sm text-green-700 bg-green-50 px-2 py-1 flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{
                    fontVariationSettings:
                      "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  check_circle
                </span>
                In Stock
              </span>
            </div>
            <p className="mt-8 text-on-surface-variant leading-relaxed text-lg max-w-md">
              Engineered for the discerning professional. The Vanguard S-Type
              combines vintage resonance with modern precision engineering,
              featuring our proprietary noiseless pickups and an ultra-satin
              Alpine White finish.
            </p>

            {/* Color Swatches */}
            <div className="mt-12 space-y-4">
              <span className="font-headline text-xs uppercase tracking-widest text-on-surface-variant font-bold">
                Finish: Alpine White
              </span>
              <div className="flex gap-3">
                <button
                  className="w-10 h-10 rounded-full bg-[#FFFFFF] border-2 border-primary ring-offset-2 ring-1 ring-primary transition-all"
                  title="Alpine White"
                ></button>
                <button
                  className="w-10 h-10 rounded-full bg-[#131317] border border-outline-variant/20 hover:scale-110 transition-transform"
                  title="Midnight Black"
                ></button>
                <button
                  className="w-10 h-10 rounded-full bg-[#A52A2A] border border-outline-variant/20 hover:scale-110 transition-transform"
                  title="Candy Apple Red"
                ></button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 space-y-4">
              <Link href="/cart">
                <button className="w-full bg-primary text-on-primary py-5 font-headline font-bold uppercase tracking-widest text-sm hover:bg-primary-container transition-all active:scale-[0.98]">
                  Add to Gallery
                </button>
              </Link>
              <button className="w-full border border-primary/20 text-primary py-5 font-headline font-bold uppercase tracking-widest text-sm hover:bg-surface-container-low transition-all">
                Find a Showroom
              </button>
            </div>

            {/* Value Props */}
            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-outline-variant/20 pt-12">
              <div className="flex flex-col gap-2">
                <span className="material-symbols-outlined text-primary">
                  local_shipping
                </span>
                <span className="text-xs font-bold uppercase tracking-tighter">
                  White Glove Delivery
                </span>
                <span className="text-xs text-on-surface-variant">
                  Insured worldwide shipping in custom flight cases.
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="material-symbols-outlined text-primary">
                  verified
                </span>
                <span className="text-xs font-bold uppercase tracking-tighter">
                  Lifetime Calibration
                </span>
                <span className="text-xs text-on-surface-variant">
                  Complimentary annual setup and string replacement.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="mt-32 pt-24 border-t border-outline-variant/10 px-8 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="font-headline text-3xl font-bold tracking-tight mb-4">
                Technical Specifications
              </h2>
              <p className="text-on-surface-variant leading-relaxed">
                The architecture of sound. Every component of the Vanguard
                S-Type is selected for its acoustic transparency and structural
                integrity.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              <div className="space-y-4">
                {[
                  ['Body Wood', 'Select European Ash'],
                  ['Neck Shape', "Modern 'C' to 'D' Taper"],
                  ['Scale Length', '25.5" (648 mm)'],
                  ['Fingerboard', 'Ebony with Rolled Edges'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="pb-4 border-b border-outline-variant/10 flex justify-between items-end"
                  >
                    <span className="text-xs font-bold uppercase text-on-surface-variant tracking-widest">
                      {label}
                    </span>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {[
                  ['Pickups', 'Sonic-Gen 4 Noiseless'],
                  ['Bridge', 'Synchronized Tremolo 2pt'],
                  ['Tuners', 'Deluxe Locking Tuners'],
                  ['Hardware', 'Brushed Nickel Finish'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="pb-4 border-b border-outline-variant/10 flex justify-between items-end"
                  >
                    <span className="text-xs font-bold uppercase text-on-surface-variant tracking-widest">
                      {label}
                    </span>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What's in the Box */}
        <section className="mt-32 px-8 max-w-screen-2xl mx-auto">
          <div className="bg-surface-container-high p-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-headline text-3xl font-bold tracking-tight mb-16 text-center">
                What&apos;s in the Box
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-full aspect-[4/3] bg-surface-container-lowest flex items-center justify-center p-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="w-full h-full object-contain"
                      alt="Premium hard-shell guitar case"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJByoaJH3MvGOpQT6DSKKgpm9qYMgjvbaMGXy2-KX9rnOcARfwBJg1gTPP3Bm2svcJbVjs3ZkAU7zvP3YOkS8ktUSkQRm9qt3kfQ5ZunZUmsxjRHW9bXNd_340nF_keRxqECtIqVdpZH-qRefhMrWnrhVDUW8dfLVZs4n6uvK0RY2ofjtnvKZV4tKxM7mBNeLQ-rvzdxqH5YnhdWonDfkdFck9WCTnzPg84j3DzENFrap0IfQnqvjL9Umxxmjf4cz4LnZBp2M_VyM"
                    />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold uppercase text-xs tracking-[0.2em] mb-2">
                      Signature Flight Case
                    </h3>
                    <p className="text-sm text-on-surface-variant">
                      Custom-molded interior for maximum protection.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-full aspect-[4/3] bg-surface-container-lowest flex items-center justify-center p-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="w-full h-full object-contain"
                      alt="Leather guitar strap and care kit"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjqZ3v-3WBSKrRND3RBiGke545UiMHgzP59WTwS4thpFaMqRGFxv134mnwTuogphaa9Cjmv_Ol-AH0Gpd85Vxj_BsVBuSbYRqXz7LvpO8InWWyEmmrZTMYDMuN_-4wE4ygd_2Sp9Rkks3BdGnMHs1nucOtmA4CNXOPwWichsEnN4HHNbMqp44c0Sp6sb_9-60Oo_gN9wGmAoZZxO4xNfB6W8RC_Qyu_eN-HTua-IhccwRdZThQYs9aUf4U-SCHxDdb_0ryZZR6NAQ"
                    />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold uppercase text-xs tracking-[0.2em] mb-2">
                      Essentials Kit
                    </h3>
                    <p className="text-sm text-on-surface-variant">
                      Premium Italian leather strap and cleaning micro-fiber.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-full aspect-[4/3] bg-surface-container-lowest flex items-center justify-center p-8">
                    <span className="material-symbols-outlined text-6xl text-primary/10">
                      verified_user
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold uppercase text-xs tracking-[0.2em] mb-2">
                      COA &amp; Manual
                    </h3>
                    <p className="text-sm text-on-surface-variant">
                      Certificate of Authenticity and technical guide.
                    </p>
                  </div>
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
