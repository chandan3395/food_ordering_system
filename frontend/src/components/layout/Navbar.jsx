import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  ClipboardList,
  LogOut,
  Menu,
  ShoppingBag,
  UserRound,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
    setIsMobileOpen(false);
    toast.success('You have been logged out.');
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold transition ${
      isActive ? 'text-warm' : 'text-ink/75 hover:text-ink'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/45 bg-canvas/80 backdrop-blur-xl">
      <div className="section-shell">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-lg font-heading text-white">
              B
            </div>
            <div>
              <p className="font-heading text-xl font-semibold">Bites</p>
              <p className="text-xs uppercase tracking-[0.24em] text-ink/40">Food crafted better</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/cart"
              className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/85 text-ink shadow-soft transition hover:-translate-y-0.5"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-warm px-1 text-xs font-bold text-white">
                  {itemCount}
                </span>
              ) : null}
            </Link>

            {!isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-stone-200 bg-white px-5 text-sm font-semibold text-ink transition hover:border-warm/30"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition hover:bg-ink/90"
                >
                  Create account
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((current) => !current)}
                  className="flex h-12 items-center gap-3 rounded-full border border-white/70 bg-white/85 px-4 text-sm font-semibold text-ink shadow-soft"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-warm/15 text-warm">
                    <UserRound className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <p className="max-w-[130px] truncate">{user?.name}</p>
                    <p className="text-xs font-medium text-ink/45">Member</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-ink/55" />
                </button>

                <AnimatePresence>
                  {isProfileOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-56 rounded-[24px] border border-white/70 bg-white p-3 shadow-card"
                    >
                      <Link
                        to="/orders"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-ink transition hover:bg-orange-50"
                      >
                        <ClipboardList className="h-4 w-4 text-warm" />
                        My orders
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-ink transition hover:bg-orange-50"
                      >
                        <LogOut className="h-4 w-4 text-warm" />
                        Logout
                      </button>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <Link
              to="/cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/85 text-ink"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-warm px-1 text-[11px] font-bold text-white">
                  {itemCount}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/85 text-ink"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/35 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 32 }}
              className="ml-auto flex h-full w-full max-w-sm flex-col bg-white px-6 py-6 shadow-2xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="font-heading text-xl font-semibold">Bites</p>
                  <p className="text-sm text-ink/50">Fresh meals, ready to order.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-stone-100 text-ink"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                        isActive ? 'bg-orange-50 text-warm' : 'text-ink hover:bg-stone-50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <NavLink
                  to="/orders"
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      isActive ? 'bg-orange-50 text-warm' : 'text-ink hover:bg-stone-50'
                    }`
                  }
                >
                  Orders
                </NavLink>
              </div>

              <div className="mt-auto rounded-[28px] bg-orange-50 p-5">
                {isAuthenticated ? (
                  <>
                    <p className="font-heading text-xl">Hi, {user?.name?.split(' ')[0]}</p>
                    <p className="mt-2 text-sm leading-6 text-ink/60">
                      Track recent orders, review delivery details, and jump back into your favorites.
                    </p>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <p className="font-heading text-xl">Sign in for faster checkout</p>
                    <p className="mt-2 text-sm leading-6 text-ink/60">
                      Save your details, review your order history, and reorder in seconds.
                    </p>
                    <div className="mt-5 flex gap-3">
                      <Link
                        to="/login"
                        onClick={() => setIsMobileOpen(false)}
                        className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-white"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setIsMobileOpen(false)}
                        className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-ink/10 bg-white px-5 text-sm font-semibold text-ink"
                      >
                        Sign up
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

