import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Spinner from '../components/common/Spinner';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../utils/getErrorMessage';

const SignupPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectPath = location.state?.from || '/';

  const handleChange = (event) => {
    setFormValues((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      await register(formValues);
      toast.success('Your Bites account is ready.');
      navigate(redirectPath, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section-shell py-12">
      <div className="grid overflow-hidden rounded-[36px] border border-white/60 bg-white/75 shadow-card lg:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-ink p-8 text-white sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-300">Create account</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">Make checkout feel easier every time.</h1>
          <p className="mt-5 max-w-md text-base leading-8 text-white/72">
            Register to save your delivery details, keep your history in one place, and reorder favorite meals
            without starting over.
          </p>
          <div className="mt-10 grid gap-4">
            {['Easy reordering', 'Order history on demand', 'Faster address entry'].map((item) => (
              <div key={item} className="rounded-[22px] border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white/90">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <h2 className="text-3xl font-semibold">Join Bites</h2>
          <p className="mt-2 text-sm text-ink/60">Create your profile to unlock secure ordering.</p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-ink">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formValues.name}
                onChange={handleChange}
                className="h-[52px] w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-ink"
                placeholder="Your full name"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                className="h-[52px] w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-ink"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-ink">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formValues.phone}
                onChange={handleChange}
                className="h-[52px] w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-ink"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-ink">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formValues.password}
                onChange={handleChange}
                className="h-[52px] w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-ink"
                placeholder="Minimum 6 characters"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-[52px] w-full items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? <Spinner size="sm" /> : 'Create account'}
              </button>
            </div>
          </form>

          <p className="mt-6 text-sm text-ink/60">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-warm">
              Login instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
