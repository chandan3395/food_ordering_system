import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="mt-20 border-t border-white/40 bg-white/70">
    <div className="section-shell py-12">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-lg font-heading text-white">
              B
            </div>
            <div>
              <p className="font-heading text-xl font-semibold">Bites</p>
              <p className="text-sm text-ink/50">Modern comfort food, delivered with care.</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-ink/60">
            Browse chef-crafted meals, build your cart, and check out in minutes with a seamless ordering
            experience that feels as polished as the food tastes.
          </p>
        </div>

        <div>
          <p className="font-heading text-lg font-semibold">Explore</p>
          <div className="mt-4 space-y-3 text-sm text-ink/65">
            <Link to="/" className="block transition hover:text-warm">
              Home
            </Link>
            <Link to="/menu" className="block transition hover:text-warm">
              Full menu
            </Link>
            <Link to="/cart" className="block transition hover:text-warm">
              Cart
            </Link>
            <Link to="/orders" className="block transition hover:text-warm">
              Order history
            </Link>
          </div>
        </div>

        <div>
          <p className="font-heading text-lg font-semibold">Contact</p>
          <div className="mt-4 space-y-3 text-sm text-ink/65">
            <p>support@bites.example</p>
            <p>Open daily, 10:00 AM to 11:00 PM</p>
            <p>Fast delivery in your neighborhood</p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-stone-200 pt-6 text-sm text-ink/45 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Bites. Crafted for delightful delivery.</p>
        <p>Responsive, secure, and built for real ordering workflows.</p>
      </div>
    </div>
  </footer>
);

export default Footer;

