import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Spinner from '../components/common/Spinner';
import { useAuth } from '../context/AuthContext';
import { getErrorMessage } from '../utils/getErrorMessage';

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
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
      await login(formValues);
      toast.success('Welcome back to Bites.');
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
        <div className="soft-gradient p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-warm">Secure login</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">Pick up where you left off.</h1>
          <p className="mt-5 max-w-md text-base leading-8 text-ink/68">
            Sign in to view previous orders, save your delivery details, and move through checkout without friction.
          </p>
          <div className="mt-10 space-y-4">
            {['Protected checkout', 'Persistent cart experience', 'Private order history'].map((item) => (
              <div key={item} className="rounded-[22px] border border-white/60 bg-white/70 px-5 py-4 text-sm font-semibold text-ink">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <h2 className="text-3xl font-semibold">Welcome back</h2>
          <p className="mt-2 text-sm text-ink/60">Use your email and password to continue.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
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
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-[52px] w-full items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? <Spinner size="sm" /> : 'Login'}
            </button>
          </form>

          <p className="mt-6 text-sm text-ink/60">
            Need an account?{' '}
            <Link to="/signup" className="font-semibold text-warm">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
