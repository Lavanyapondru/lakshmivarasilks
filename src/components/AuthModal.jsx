
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function AuthModal() {
  const {
    isAuthOpen,
    closeAuth,
    authMode,
    setAuthMode,
    authNotice,
    login,
    signup,
    loginDemo,
    adminLogin,
  } = useShop();

  const navigate = useNavigate();

  // Customer login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Customer signup state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPass, setSignupConfirmPass] = useState("");
  const [showSignupPass, setShowSignupPass] = useState(false);
  const [signupError, setSignupError] = useState("");

  // Admin login state
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdminPass, setShowAdminPass] = useState(false);
  const [adminError, setAdminError] = useState("");

  if (!isAuthOpen) return null;

  // Customer login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail.trim()) {
      setLoginError("Please enter your email or phone number.");
      return;
    }

    if (!loginPassword) {
      setLoginError("Please enter your password.");
      return;
    }

    const res = login(loginEmail, loginPassword);

    if (!res.success) {
      setLoginError(res.error || "Unable to sign in.");
    }
  };

  // Customer signup
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setSignupError("");

    if (!signupName.trim()) {
      setSignupError("Please enter your full name.");
      return;
    }

    if (!signupEmail.trim() || !signupEmail.includes("@")) {
      setSignupError("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(signupPhone.trim())) {
      setSignupError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (signupPassword.length < 6) {
      setSignupError("Password must be at least 6 characters long.");
      return;
    }

    if (signupPassword !== signupConfirmPass) {
      setSignupError("Passwords do not match.");
      return;
    }

    const res = signup({
      name: signupName,
      email: signupEmail,
      phone: signupPhone,
      password: signupPassword,
    });

    if (!res.success) {
      setSignupError(res.error || "Unable to create your account.");
    }
  };

  // Demo admin login
  const handleAdminLogin = (e) => {
    if (e) e.preventDefault();
    setAdminError("");

    const res = adminLogin(adminEmail, adminPassword);
    if (res.success) {
      closeAuth();
      setShowAdminLogin(false);
      navigate("/admin/dashboard");
    } else {
      setAdminError(res.error || "Invalid admin email or password.");
    }
  };

  return (
    <div
      className="modal fade show d-block modal-backdrop-custom"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered auth-modal-dialog">
        <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">

          {/* Header */}
          <div className="modal-header border-bottom-0 pb-0 pt-4 px-4 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <span className="brand-mark small-mark">LVS</span>
              <div>
                <h5 className="modal-title fw-bold text-wine m-0">
                  Laxmi Vara Silks
                </h5>
                <small className="text-muted">Everything She Needs</small>
              </div>
            </div>

            <button
              type="button"
              className="btn-close"
              onClick={closeAuth}
              aria-label="Close"
            />
          </div>

          {/* Notice */}
          {authNotice && (
            <div className="px-4 pt-3">
              <div className="alert alert-warning border-0 rounded-3 py-2 px-3 small d-flex align-items-center gap-2 mb-0">
                <i className="bi bi-shield-lock-fill fs-5" />
                <span className="text-dark fw-medium">{authNotice}</span>
              </div>
            </div>
          )}

          {/* Customer tabs */}
          <div className="px-4 pt-3">
            <div className="nav nav-pills nav-fill p-1 bg-light rounded-pill border">
              <button
                type="button"
                className={`nav-link rounded-pill py-2 fw-semibold small ${
                  authMode === "login"
                    ? "active bg-brand text-white"
                    : "text-muted"
                }`}
                onClick={() => {
                  setAuthMode("login");
                  setLoginError("");
                }}
              >
                Sign In
              </button>

              <button
                type="button"
                className={`nav-link rounded-pill py-2 fw-semibold small ${
                  authMode === "signup"
                    ? "active bg-brand text-white"
                    : "text-muted"
                }`}
                onClick={() => {
                  setAuthMode("signup");
                  setSignupError("");
                }}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Customer forms */}
          <div className="modal-body p-4">
            {authMode === "login" ? (
              <form onSubmit={handleLoginSubmit}>
                {loginError && (
                  <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3">
                    <i className="bi bi-exclamation-circle me-1" />
                    {loginError}
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">
                    Email or Phone Number
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="bi bi-envelope text-muted" />
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="e.g. priya@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between">
                    <label className="form-label small fw-bold text-muted">
                      Password
                    </label>
                    <button
                      type="button"
                      className="btn btn-link p-0 text-decoration-none small text-brand"
                      onClick={() =>
                        alert(
                          "Password reset instructions have been simulated. Use the demo login for testing."
                        )
                      }
                    >
                      Forgot?
                    </button>
                  </div>

                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="bi bi-lock text-muted" />
                    </span>
                    <input
                      type={showLoginPass ? "text" : "password"}
                      className="form-control border-start-0 border-end-0"
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="input-group-text bg-light text-muted"
                      onClick={() => setShowLoginPass(!showLoginPass)}
                      aria-label="Toggle password visibility"
                    >
                      <i
                        className={`bi ${
                          showLoginPass ? "bi-eye-slash" : "bi-eye"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-brand w-100 py-2 fw-bold rounded-pill mb-3 shadow-sm"
                >
                  Sign In
                </button>

                {/* Demo customer login */}
                <div className="demo-login-box p-3 rounded-3 bg-light border text-center">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-secondary-subtle text-dark">
                      Quick Test
                    </span>
                    <small className="text-muted">Demo customer account</small>
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline-brand btn-sm w-100 fw-bold rounded-pill"
                    onClick={loginDemo}
                  >
                    <i className="bi bi-lightning-charge-fill text-warning me-1" />
                    One-Click Demo Login (Priya Sharma)
                  </button>
                </div>

                {/* Admin option at the end */}
                <div className="admin-divider my-4">
                  <span>OR</span>
                </div>

                <button
                  type="button"
                  className="admin-entry-button w-100"
                  onClick={() => {
                    setShowAdminLogin(true);
                    setAdminError("");
                  }}
                >
                  <span className="admin-entry-icon">
                    <i className="bi bi-shield-lock-fill" />
                  </span>

                  <span className="text-start flex-grow-1">
                    <strong>Admin Login</strong>
                    <small>Store management portal</small>
                  </span>

                  <i className="bi bi-arrow-right" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit}>
                {signupError && (
                  <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3">
                    <i className="bi bi-exclamation-circle me-1" />
                    {signupError}
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label small fw-bold text-muted">
                    Full Name
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="bi bi-person text-muted" />
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="e.g. Ananya Reddy"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-sm-6">
                    <label className="form-label small fw-bold text-muted">
                      Email
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-envelope text-muted" />
                      </span>
                      <input
                        type="email"
                        className="form-control border-start-0"
                        placeholder="you@email.com"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label small fw-bold text-muted">
                      Mobile Number
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-telephone text-muted" />
                      </span>
                      <input
                        type="tel"
                        className="form-control border-start-0"
                        placeholder="10-digit mobile"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-sm-6">
                    <label className="form-label small fw-bold text-muted">
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-lock text-muted" />
                      </span>
                      <input
                        type={showSignupPass ? "text" : "password"}
                        className="form-control border-start-0"
                        placeholder="Min 6 chars"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label small fw-bold text-muted">
                      Confirm Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-shield-check text-muted" />
                      </span>
                      <input
                        type={showSignupPass ? "text" : "password"}
                        className="form-control border-start-0"
                        placeholder="Repeat password"
                        value={signupConfirmPass}
                        onChange={(e) => setSignupConfirmPass(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="showSignupPassCheck"
                    checked={showSignupPass}
                    onChange={(e) => setShowSignupPass(e.target.checked)}
                  />
                  <label
                    className="form-check-label small text-muted"
                    htmlFor="showSignupPassCheck"
                  >
                    Show password
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-brand w-100 py-2 fw-bold rounded-pill shadow-sm"
                >
                  Create My Account
                </button>
              </form>
            )}
          </div>

          {/* Separate Admin Login form */}
          {showAdminLogin && (
            <div className="admin-login-overlay">
              <div
                className="admin-login-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="adminLoginTitle"
              >
                <button
                  type="button"
                  className="admin-close-button"
                  onClick={() => {
                    setShowAdminLogin(false);
                    setAdminError("");
                  }}
                  aria-label="Close admin login"
                >
                  <i className="bi bi-x-lg" />
                </button>

                <div className="admin-login-logo">
                  <i className="bi bi-shield-lock-fill" />
                </div>

                <h4 id="adminLoginTitle">Admin Portal</h4>
                <p className="text-muted small mb-4">
                  Sign in to manage Laxmi Vara Silks
                </p>

                {adminError && (
                  <div className="alert alert-danger py-2 small text-start">
                    <i className="bi bi-exclamation-circle me-1" />
                    {adminError}
                  </div>
                )}

                <form onSubmit={handleAdminLogin}>
                  <div className="mb-3 text-start">
                    <label className="form-label small fw-semibold">
                      Admin Email
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-envelope" />
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="admin@laxmivarasilks.com"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        autoComplete="username"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3 text-start">
                    <label className="form-label small fw-semibold">
                      Admin Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-lock" />
                      </span>
                      <input
                        type={showAdminPass ? "text" : "password"}
                        className="form-control"
                        placeholder="Enter admin password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                      />
                      <button
                        type="button"
                        className="input-group-text"
                        onClick={() => setShowAdminPass(!showAdminPass)}
                        aria-label="Toggle admin password visibility"
                      >
                        <i
                          className={`bi ${
                            showAdminPass ? "bi-eye-slash" : "bi-eye"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn admin-submit-button w-100 py-3 fw-bold rounded-3"
                  >
                    <i className="bi bi-shield-check me-2" />
                    Sign In to Dashboard
                  </button>
                </form>

                {/* Demo credentials */}
                <div className="admin-demo-credentials mt-4">
                  <div className="small fw-bold mb-2">
                    <i className="bi bi-info-circle me-1" />
                    Demo Credentials
                  </div>
                  <div className="small text-start mb-2">
                    <div>
                      <strong>Email:</strong> admin@laxmivarasilks.com
                    </div>
                    <div>
                      <strong>Password:</strong> Admin@123
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-brand btn-sm w-100 rounded-pill py-1"
                    onClick={() => {
                      setAdminEmail("admin@laxmivarasilks.com");
                      setAdminPassword("Admin@123");
                      const res = adminLogin("admin@laxmivarasilks.com", "Admin@123");
                      if (res.success) {
                        closeAuth();
                        setShowAdminLogin(false);
                        navigate("/admin/dashboard");
                      }
                    }}
                  >
                    <i className="bi bi-lightning-charge-fill text-warning me-1" />
                    One-Click Admin Sign In
                  </button>
                </div>

                <div className="admin-security-note mt-3">
                  <i className="bi bi-shield-check me-1" />
                  Demonstration login only
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
