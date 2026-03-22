import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#C8C5CB]/20 pt-20 pb-10 px-8 mt-24 bg-[#F5F4E8] font-body text-sm tracking-wide">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-screen-2xl mx-auto">
        <div className="md:col-span-1">
          <div className="text-lg font-headline font-bold tracking-tighter uppercase mb-6">
            Titan
          </div>
          <p className="text-[#566067] leading-relaxed">
            Defining the future of sound through meticulous craftsmanship and
            acoustic innovation.
          </p>
        </div>
        <div>
          <h5 className="font-bold text-[#000000] mb-6 uppercase tracking-widest text-[10px]">
            Products
          </h5>
          <ul className="space-y-4">
            <li>
              <Link
                className="text-[#566067] hover:text-[#000000] underline underline-offset-4 transition-all"
                href="#"
              >
                Guitars
              </Link>
            </li>
            <li>
              <Link
                className="text-[#566067] hover:text-[#000000] underline underline-offset-4 transition-all"
                href="#"
              >
                Studio Monitors
              </Link>
            </li>
            <li>
              <Link
                className="text-[#566067] hover:text-[#000000] underline underline-offset-4 transition-all"
                href="#"
              >
                Keyboards
              </Link>
            </li>
            <li>
              <Link
                className="text-[#566067] hover:text-[#000000] underline underline-offset-4 transition-all"
                href="#"
              >
                Pedalboard
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-[#000000] mb-6 uppercase tracking-widest text-[10px]">
            Brand
          </h5>
          <ul className="space-y-4">
            <li>
              <Link
                className="text-[#566067] hover:text-[#000000] underline underline-offset-4 transition-all"
                href="#"
              >
                Sustainability
              </Link>
            </li>
            <li>
              <Link
                className="text-[#566067] hover:text-[#000000] underline underline-offset-4 transition-all"
                href="#"
              >
                Technical Specs
              </Link>
            </li>
            <li>
              <Link
                className="text-[#566067] hover:text-[#000000] underline underline-offset-4 transition-all"
                href="#"
              >
                Store Locator
              </Link>
            </li>
            <li>
              <Link
                className="text-[#566067] hover:text-[#000000] underline underline-offset-4 transition-all"
                href="#"
              >
                Privacy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-[#000000] mb-6 uppercase tracking-widest text-[10px]">
            Connect
          </h5>
          <div className="flex space-x-6">
            <Link className="hover:opacity-60 transition-opacity" href="#">
              <span className="material-symbols-outlined">share</span>
            </Link>
            <Link className="hover:opacity-60 transition-opacity" href="#">
              <span className="material-symbols-outlined">mail</span>
            </Link>
            <Link className="hover:opacity-60 transition-opacity" href="#">
              <span className="material-symbols-outlined">location_on</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto mt-20 pt-8 border-t border-[#C8C5CB]/10 flex flex-col md:flex-row justify-between items-center text-[10px] text-[#9EA0A3] uppercase tracking-[0.2em]">
        <span>© 2024 Titan. Precision in Sound.</span>
        <div className="flex space-x-8 mt-4 md:mt-0">
          <Link className="hover:text-[#000000]" href="#">
            Cookies
          </Link>
          <Link className="hover:text-[#000000]" href="#">
            Terms
          </Link>
          <Link className="hover:text-[#000000]" href="#">
            Accessibility
          </Link>
        </div>
      </div>
    </footer>
  );
}
