import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function CartPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24 max-w-screen-2xl mx-auto px-8">
        {/* Title */}
        <div className="mb-16">
          <p className="font-headline text-xs uppercase tracking-[0.3em] text-secondary mb-4">
            Your Selection
          </p>
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter">
            Shopping Gallery
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-12">
            {/* Item 1: Analog Synth */}
            <div className="group flex flex-col md:flex-row gap-8 pb-12 border-b border-outline-variant/10">
              <div className="w-full md:w-56 aspect-square bg-surface-container-low overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Professional Synthesizer"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ_bFkCFoATSWa3WYI00YNUaPQaU_aWDxWbM_6utyfWC9OT-2vVq-2yXwjtjbc8woGG4agOtCW_FefL0S9DUJtIjsYytaWNtB5SFP1dXlsggqbhe-VBhmDmQqPrh7OGyeJ6UaHtrv5mxXyHFNrcOQXnOr9RzKzk7fHNCTEFZyBCY5xNcjb0EsBlgaZfvcyWpeb8gUyi2Z14Z6tkBk3B-cuDx0NpljYGHpo42yNTdrc1ce1LKximv-uwO4fFEPoU6Kb41oDdoK_al8"
                />
              </div>
              <div className="grow flex flex-col justify-between py-2">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline text-2xl font-bold tracking-tight">
                      Vanguard MK-II Analog Synth
                    </h3>
                    <p className="font-headline text-xl font-medium">
                      $2,499.00
                    </p>
                  </div>
                  <p className="text-on-surface-variant text-sm max-w-md leading-relaxed">
                    Hand-crafted in Berlin. Featuring discrete oscillators and
                    the signature Titan filter circuit.
                  </p>
                  <div className="mt-4 flex items-center space-x-6 text-xs tracking-widest uppercase text-secondary">
                    <span>Ref: SG-2024-V2</span>
                    <span>In Stock</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-8 md:mt-0">
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center border-b border-outline-variant/30 pb-1">
                      <button className="text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-sm">
                          remove
                        </span>
                      </button>
                      <span className="mx-6 text-sm font-medium">1</span>
                      <button className="text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-sm">
                          add
                        </span>
                      </button>
                    </div>
                    <button className="text-xs uppercase tracking-widest text-secondary hover:text-error transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 2: Reference Monitors */}
            <div className="group flex flex-col md:flex-row gap-8 pb-12 border-b border-outline-variant/10">
              <div className="w-full md:w-56 aspect-square bg-surface-container-low overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Studio Headphones"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbkAgY3s2xLMUfjqKTvAS-LBLdBu2cWDXNkjSaA_gksv1TTvBnABgsNonrdP-7GkpzjEsbnYeX82uPqSTF2oibEXUGQcX5UbBpbRPlAnl1vXRIH-QVtLXBXudejZtaTzW1yepihW4ojRDzrZngOCzmKxsDyDsVQ5S0Df9mq_dCfU3OXj3dRMsXyLnm5qJ1xDeGsRbdpi0-Oq94v_Z1tWgOvlN5Pp5cFwCqNvfq1f83-dfltEYPQiccb4lQdmncpNBkk8U68s_gTGY"
                />
              </div>
              <div className="flex-grow flex flex-col justify-between py-2">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline text-2xl font-bold tracking-tight">
                      Onyx Reference Monitors
                    </h3>
                    <p className="font-headline text-xl font-medium">$850.00</p>
                  </div>
                  <p className="text-on-surface-variant text-sm max-w-md leading-relaxed">
                    Open-back design with carbon fiber transducers for ultimate
                    linear response and spatial clarity.
                  </p>
                  <div className="mt-4 flex items-center space-x-6 text-xs tracking-widest uppercase text-secondary">
                    <span>Ref: SG-99-ONYX</span>
                    <span>Limited Edition</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-8 md:mt-0">
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center border-b border-outline-variant/30 pb-1">
                      <button className="text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-sm">
                          remove
                        </span>
                      </button>
                      <span className="mx-6 text-sm font-medium">1</span>
                      <button className="text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-sm">
                          add
                        </span>
                      </button>
                    </div>
                    <button className="text-xs uppercase tracking-widest text-secondary hover:text-error transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Upsell */}
            <div className="bg-surface-container-low p-8 flex items-center justify-between group cursor-pointer transition-colors hover:bg-surface-container">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-surface-container-highest flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">
                    cable
                  </span>
                </div>
                <div>
                  <p className="font-headline font-bold text-sm">
                    Add Premium Signal Cables
                  </p>
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest">
                    + $120.00
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 sticky top-32">
            <div className="bg-surface-container-low p-10 space-y-8">
              <h2 className="font-headline text-xl font-bold tracking-tight uppercase">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span>$3,349.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">
                    Standard Shipping (Global)
                  </span>
                  <span>$45.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Estimated Tax</span>
                  <span>$267.92</span>
                </div>
              </div>
              <div className="pt-8 border-t border-outline-variant/20">
                <div className="flex justify-between items-baseline mb-8">
                  <span className="font-headline text-lg font-bold uppercase tracking-widest">
                    Total
                  </span>
                  <span className="font-headline text-3xl font-extrabold tracking-tighter">
                    $3,661.92
                  </span>
                </div>
                <button className="w-full bg-primary text-on-primary py-5 px-8 font-headline font-bold uppercase tracking-widest text-xs hover:bg-primary-container transition-all active:scale-[0.98] duration-200">
                  Proceed to Checkout
                </button>
                <div className="mt-6 flex flex-col items-center space-y-4 opacity-50">
                  <div className="flex items-center space-x-4">
                    <span
                      className="material-symbols-outlined text-sm"
                      style={{
                        fontVariationSettings:
                          "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24",
                      }}
                    >
                      lock
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em]">
                      Encrypted Security
                    </span>
                  </div>
                  <div className="flex space-x-4 grayscale opacity-60">
                    <span className="material-symbols-outlined">
                      credit_card
                    </span>
                    <span className="material-symbols-outlined">
                      account_balance
                    </span>
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                </div>
              </div>
              {/* Discount Code */}
              <div className="pt-4">
                <div className="relative">
                  <input
                    className="w-full bg-transparent border-b border-outline-variant/30 py-3 text-xs tracking-widest uppercase placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-0 transition-colors outline-none"
                    placeholder="GIFT OR DISCOUNT CODE"
                    type="text"
                  />
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-widest">
                    Apply
                  </button>
                </div>
              </div>
            </div>
            {/* Assistance */}
            <div className="mt-8 px-2 flex items-center justify-between text-[11px] uppercase tracking-widest text-on-surface-variant">
              <Link
                href="#"
                className="hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">
                  support_agent
                </span>
                Speak with a curator
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
