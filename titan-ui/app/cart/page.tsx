'use client';

import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useCart } from '@/lib/cart-context';
import { DEFAULT_PRODUCT_IMAGE } from '@/lib/constants';

const SHIPPING = 45;
const TAX_RATE = 0.08;

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  const shipping = items.length > 0 ? SHIPPING : 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  return (
    <>
      <Nav />
      <main className="pt-32 pb-24 max-w-screen-2xl mx-auto px-8">
        <div className="mb-16">
          <p className="font-headline text-xs uppercase tracking-[0.3em] text-secondary mb-4">
            Your Selection
          </p>
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter">
            Shopping Gallery
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-on-surface-variant mb-8">
              Your cart is empty.
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-primary text-on-primary font-semibold rounded hover:bg-primary/90 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Cart Items */}
            <div className="lg:col-span-8 space-y-12">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="group flex flex-col md:flex-row gap-8 pb-12 border-b border-outline-variant/10"
                >
                  <div className="w-full md:w-56 aspect-square bg-surface-container-low overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={item.name}
                      className="w-full h-full object-cover"
                      src={item.imageUrl || DEFAULT_PRODUCT_IMAGE}
                    />
                  </div>
                  <div className="grow flex flex-col justify-between py-2">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-headline text-2xl font-bold tracking-tight">
                          {item.name}
                        </h3>
                        <p className="font-headline text-xl font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="text-on-surface-variant text-sm">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-8 md:mt-0">
                      <div className="flex items-center space-x-8">
                        <div className="flex items-center border-b border-outline-variant/30 pb-1">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                            className="text-on-surface-variant hover:text-primary transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">
                              remove
                            </span>
                          </button>
                          <span className="mx-6 text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                            className="text-on-surface-variant hover:text-primary transition-colors"
                          >
                            <span className="material-symbols-outlined text-sm">
                              add
                            </span>
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          className="text-xs uppercase tracking-widest text-secondary hover:text-error transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">
                      Standard Shipping (Global)
                    </span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">
                      Estimated Tax
                    </span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
                <div className="pt-8 border-t border-outline-variant/20">
                  <div className="flex justify-between items-baseline mb-8">
                    <span className="font-headline text-lg font-bold uppercase tracking-widest">
                      Total
                    </span>
                    <span className="font-headline text-3xl font-extrabold tracking-tighter">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <button className="w-full bg-primary text-on-primary py-5 px-8 font-headline font-bold uppercase tracking-widest text-xs hover:bg-primary-container transition-all active:scale-[0.98] duration-200">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
