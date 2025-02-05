"use client";

export default function () {
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="login-card p-5 col-md-6 col-lg-4">
        <div className="text-center mb-4">
          <img
            src="/assets/img/logo.png"
            alt="Logo"
            className="mb-3"
            width="80"
          />
          <h3 className="fw-bold">Client Portal</h3>
          <p className="text-muted">Secure access for legal professionals</p>
        </div>
        <form>
          <div className="mb-3">
            <label for="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@lawfirm.com"
              required
            />
          </div>
          <div className="mb-4">
            <label for="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="••••••••"
              required
            />
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="rememberMe" />
            <label class="form-check-label" for="rememberMe">
              Remember Me
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2">
            Sign In
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="#" className="text-decoration-none text-secondary">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}
