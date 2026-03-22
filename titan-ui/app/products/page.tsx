import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { ProductGrid } from '../components/ProductGrid';

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
          </div>
        </header>

        {/* Product Grid Section */}
        <section className="px-8 max-w-screen-2xl mx-auto">
          <ProductGrid />
        </section>
      </main>
      <Footer />
    </>
  );
}
