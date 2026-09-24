import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    document.title = 'Sign in · Ledgerly';
    const description = 'A calm, clear home for managing your personal finances with Ledgerly.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, []);

  const validate = () => {
    const nextErrors = {};
    if (!email.trim()) {
      nextErrors.email = 'Enter the email you use for Ledgerly.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!password) {
      nextErrors.password = 'Enter your password to continue.';
    } else if (password.length < 6) {
      nextErrors.password = 'Your password needs at least 6 characters.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('');
    if (!validate()) return;

    setIsSigningIn(true);
    window.setTimeout(() => {
      setIsSigningIn(false);
      setStatus(
        rememberMe
          ? 'Demo sign in ready. Your session preference has been remembered on this device.'
          : 'Demo sign in ready. No account information was sent.',
      );
    }, 650);
  };

  const handleForgotPassword = () => {
    setStatus('Password recovery is available in the full Ledgerly experience.');
    setErrors({});
  };

  const handleCreateAccount = () => {
    setStatus('Account creation is ready for the full Ledgerly experience.');
    setErrors({});
  };

  return (
    <main className="login-page">
      <section className="login-shell" aria-label="Ledgerly sign in">
        <div className="brand-panel">
          <div className="brand-mark" data-testid="text-brand-name">
            <span className="brand-mark-icon" aria-hidden="true">
              <BarChart3 size={19} strokeWidth={2.4} />
            </span>
            Ledgerly
          </div>

          <div className="brand-copy">
            <p className="eyebrow">A clearer view of your money</p>
            <h1 className="brand-title">
              Make space for what <em>matters.</em>
            </h1>
            <p className="brand-description">
              A calm place to see your whole financial picture, make confident decisions,
              and keep moving forward.
            </p>
          </div>

          <div className="brand-note" data-testid="text-security-note">
            <ShieldCheck size={15} strokeWidth={2} aria-hidden="true" />
            <span>Private by design. Clear by default.</span>
          </div>

        </div>

        <div className="form-panel">
          <div className="form-wrap">
            <header>
              <h2 className="form-heading">Welcome back</h2>
              <p className="form-subheading">
                Your finances are waiting, right where you left them.
              </p>
            </header>

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <div className="field-group">
                <div className="field-label-row">
                  <label className="field-label" htmlFor="email">Email address</label>
                </div>
                <div className="input-shell">
                  <Mail className="input-icon" size={18} aria-hidden="true" />
                  <input
                    id="email"
                    className="input-control"
                    data-testid="input-email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (errors.email) setErrors((current) => ({ ...current, email: undefined }));
                    }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                </div>
                {errors.email && (
                  <span className="field-error" id="email-error" role="alert" data-testid="error-email">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="field-group">
                <div className="field-label-row">
                  <label className="field-label" htmlFor="password">Password</label>
                </div>
                <div className="input-shell">
                  <LockKeyhole className="input-icon" size={18} aria-hidden="true" />
                  <input
                    id="password"
                    className="input-control"
                    data-testid="input-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      if (errors.password) setErrors((current) => ({ ...current, password: undefined }));
                    }}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    data-testid="button-toggle-password"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="field-error" id="password-error" role="alert" data-testid="error-password">
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="form-options">
                <label className="remember-box">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    data-testid="checkbox-remember-me"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  className="forgot-link"
                  onClick={handleForgotPassword}
                  data-testid="button-forgot-password"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="signin-button"
                data-testid="button-sign-in"
                disabled={isSigningIn}
              >
                {isSigningIn ? <span className="loading-line" aria-label="Signing in" /> : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="button-arrow" size={17} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>

            <div className="divider" aria-hidden="true"><span>new to ledgerly</span></div>

            <button
              type="button"
              className="register-button"
              data-testid="button-create-account"
              onClick={handleCreateAccount}
            >
              <span>Create Account / Register</span>
              <Check size={16} aria-hidden="true" />
            </button>

            {status && (
              <p className="status-message" role="status" data-testid="status-message">
                {status}
              </p>
            )}

            <p className="form-footnote">
              By continuing, you agree to Ledgerly&apos;s terms and privacy policy.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}


export default Login;