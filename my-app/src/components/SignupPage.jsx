import React from 'react';
import './SignupPage.css';

const SignupPage = ({ onBack }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [selectedLookingFor, setSelectedLookingFor] = React.useState([]);
  const [selectedPerk, setSelectedPerk] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const formData = new FormData(e.target);
    const data = {
      fullName: formData.get('fullName'),
      linkedin: formData.get('linkedin'),
      startupName: formData.get('startupName'),
      startupUrl: formData.get('startupUrl'),
      stage: formData.get('stage'),
      industry: formData.get('industry'),
      lookingFor: selectedLookingFor,
      betaPerk: selectedPerk
    };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          onBack();
        }, 3000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Registration failed. Please try again.');
        setIsSubmitting(false);
      }
    } catch (err) {
      setErrorMessage('Could not connect to the server. Please ensure the backend is running.');
      setIsSubmitting(false);
    }
  };

  const toggleLookingFor = (value) => {
    setSelectedLookingFor(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  if (success) {
    return (
      <div className="signup-page-success">
        <div className="success-content">
          <div className="success-icon">✓</div>
          <h2>Welcome Aboard!</h2>
          <p>Your application is being reviewed. We'll be in touch via LinkedIn soon.</p>
          <div className="success-loader">Redirecting to software...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-page">
      {/* Left Column: Constellation Branding (100% Exact Mesh) */}
      <div className="signup-left bg-[#050814]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,255,0.25),transparent_75%),radial-gradient(circle_at_70%_30%,rgba(34,211,238,0.12),transparent_55%),linear-gradient(180deg,#050814,#070B13)]" />

          {/* Network style SVG */}
          <div className="absolute inset-0 flex items-center justify-center opacity-100">
              <svg width="100%" height="100%" viewBox="0 100 1000 600" preserveAspectRatio="xMidYMid slice">
                  <defs>
                      <filter id="glow">
                          <feGaussianBlur stdDeviation="3.5" result="blur" />
                          <feMerge>
                              <feMergeNode in="blur" />
                              <feMergeNode in="SourceGraphic" />
                          </feMerge>
                      </filter>
                  </defs>

                  {/* Dark Internal Polygon - Exact from Image */}
                  <polygon 
                    points="110,430 250,520 300,530 460,510 600,600 810,500 880,280 770,370 560,260 380,350 250,370" 
                    fill="rgba(0,0,0,0.75)" 
                    stroke="none"
                  />

                  {/* Connections */}
                  <g stroke="#56E0FF" strokeOpacity="0.6" strokeWidth="1.5">
                      <path d="M110,430 L250,520 L300,530 L460,510 L600,600 L810,500 L880,280 L770,370 L560,260 L380,350 L250,370 Z" fill="none" />
                      <line x1="250" y1="520" x2="380" y2="350" />
                      <line x1="110" y1="430" x2="250" y2="370" />
                      <line x1="380" y1="350" x2="560" y2="260" />
                      <line x1="460" y1="510" x2="560" y2="260" />
                      <line x1="770" y1="370" x2="560" y2="260" />
                  </g>

                  {/* Nodes */}
                  <g filter="url(#glow)" fill="#9EE7FF">
                      {[
                        [110,430], [250,520], [300,530], [460,510], [600,600], 
                        [810,500], [880,280], [770,370], [560,260], [380,350], [250,370]
                      ].map(([x, y], i) => (
                          <circle key={i} cx={x} cy={y} r={9} />
                      ))}
                  </g>
              </svg>
          </div>

          {/* Integrated Features (Pixel Perfect Positioning) */}
          <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none flex flex-col justify-center items-center">
              <div className="mb-20 text-center">
                  <h2 className="text-[2.2rem] font-extrabold text-white tracking-tight">
                      Start generating leads in minutes
                  </h2>
              </div>

              <div className="mr-[220px] space-y-5">
                  <div className="flex items-center gap-3 text-white">
                      <span className="text-[#f43f5e] text-xl"><i className="fas fa-crosshairs"></i></span>
                      <p className="text-[0.95rem] font-medium opacity-90">Extract leads from LinkedIn profiles, groups & posts</p>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                      <span className="text-[#94a3b8] text-xl"><i className="fas fa-envelope"></i></span>
                      <p className="text-[0.95rem] font-medium opacity-90">Enrich with verified emails and phone numbers</p>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                      <span className="text-[#ec4899] text-xl"><i className="fas fa-brain"></i></span>
                      <p className="text-[0.95rem] font-medium opacity-90">AI-powered lead scoring and persona matching</p>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                      <span className="text-[#f97316] text-xl"><i className="fas fa-rocket"></i></span>
                      <p className="text-[0.95rem] font-medium opacity-90">Multi-channel outreach campaigns</p>
                  </div>
              </div>
          </div>
      </div>

      {/* Right Column: Community Form */}
      <div className="signup-right">
        <div className="signup-nav">
          <div className="app-logo-mini" style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1', gap: '2px', alignItems: 'flex-start' }}>
              <span style={{ 
                fontSize: '1.8rem', 
                fontWeight: 800, 
                background: 'linear-gradient(90deg, #1e40af 0%, #2173df 50%, #38bdf8 100%)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-1px'
              }}>Leadnius</span>
              <span style={{ 
                fontSize: '1rem', 
                fontWeight: 800, 
                color: '#334155', 
                letterSpacing: '0px',
                paddingLeft: '0.8rem'
              }}>Community</span>
          </div>
          <button className="btn-back" onClick={onBack}>
            <i className="fas fa-arrow-left"></i> Back to Software
          </button>
        </div>

        <div className="signup-form-scrollable">
          <div className="form-intro">
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>
              Apply for Early Access
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#64748b' }}>Verified early access to elite software tools.</p>
          </div>

          <form onSubmit={handleSubmit} className="community-form">
            <div className="social-login-row">
              <button type="button" className="btn-social">
                <i className="fab fa-google"></i> Continue with Google
              </button>
              <button type="button" className="btn-social">
                <i className="fab fa-linkedin"></i> Continue with LinkedIn
              </button>
            </div>

            <div className="form-separator">
              <span>OR APPLY MANUALLY</span>
            </div>

            <div className="form-block">
              <h4 className="block-title">IDENTITY & AUTHENTICITY</h4>
              <div className="block-row">
                 <div className="input-wrap">
                    <label>Full Name</label>
                    <span className="input-hint">For community trust</span>
                    <input type="text" name="fullName" placeholder="e.g. John Doe" required />
                 </div>
                 <div className="input-wrap">
                    <label>Work Email</label>
                    <span className="input-hint">No spam, just elite tools</span>
                    <input type="email" name="email" placeholder="name@company.com" required />
                 </div>
              </div>
              <div className="block-row">
                 <div className="input-wrap">
                    <label>LinkedIn Profile</label>
                    <span className="input-hint">Verification required</span>
                    <input type="url" name="linkedin" placeholder="https://linkedin.com/in/..." required />
                 </div>
                 <div className="input-wrap">
                    <label>Create Password</label>
                    <span className="input-hint">At least 8 characters</span>
                    <input type="password" name="password" placeholder="••••••••" required />
                 </div>
              </div>
              <div className="block-row">
                 <div className="input-wrap">
                    <label>Startup Name</label>
                    <span className="input-hint">Current project</span>
                    <input type="text" name="startupName" placeholder="e.g. Acme AI" required />
                 </div>
                 <div className="input-wrap">
                    <label>Startup URL</label>
                    <span className="input-hint">Landing page or product</span>
                    <input type="url" name="startupUrl" placeholder="https://..." required />
                 </div>
              </div>
            </div>

            <div className="form-block">
              <h4 className="block-title">PRODUCT & INDUSTRY</h4>
              <div className="block-row">
                 <div className="input-wrap">
                    <label>Product Stage</label>
                    <select name="stage" required defaultValue="">
                      <option value="" disabled>Select current stage</option>
                      <option value="Ideation">Ideation</option>
                      <option value="MVP/Beta">MVP / Beta</option>
                      <option value="Launched/Scaling">Launched / Scaling</option>
                    </select>
                 </div>
                 <div className="input-wrap">
                    <label>Industry</label>
                    <select name="industry" required defaultValue="">
                      <option value="" disabled>Select industry</option>
                      <option value="SaaS">SaaS</option>
                      <option value="AI">AI</option>
                      <option value="FinTech">FinTech</option>
                      <option value="HealthTech">HealthTech</option>
                      <option value="Other">Other</option>
                    </select>
                 </div>
              </div>
            </div>

            <div className="form-block">
              <h4 className="block-title">COMMUNITY ALIGNMENT</h4>
              <div className="choice-section">
                <label className="choice-label">What are you looking for most?</label>
                <div className="hybrid-choice-grid">
                   {[
                      { val: "Beta Testers & Feedback", icon: "🚀", desc: "Get early feedback" },
                      { val: "First Paying Customers", icon: "💰", desc: "Initial early-adopters" },
                      { val: "Networking & Collab", icon: "🤝", desc: "Connect with builders" }
                   ].map(item => (
                      <div 
                        key={item.val}
                        className={`hybrid-card ${selectedLookingFor.includes(item.val) ? 'selected' : ''}`}
                        onClick={() => toggleLookingFor(item.val)}
                      >
                         <span className="card-emoji">{item.icon}</span>
                         <span className="card-name">{item.val}</span>
                      </div>
                   ))}
                </div>
              </div>

              <div className="choice-section">
                <label className="choice-label">Proposed "Beta Perk"</label>
                <div className="hybrid-choice-grid">
                   {[
                      { val: "Lifetime Access (LTD)", icon: "✨" },
                      { val: "Extended Trial", icon: "⏳" },
                      { val: "Significant Discount", icon: "🏷️" },
                      { val: "Networking only", icon: "🌐" }
                   ].map(item => (
                      <div 
                        key={item.val}
                        className={`hybrid-card ${selectedPerk === item.val ? 'selected' : ''}`}
                        onClick={() => setSelectedPerk(item.val)}
                      >
                         <span className="card-emoji">{item.icon}</span>
                         <span className="card-name">{item.val}</span>
                      </div>
                   ))}
                </div>
              </div>
            </div>

            {errorMessage && <div className="error-indicator">{errorMessage}</div>}

            <div className="privacy-consent">
              <input type="checkbox" id="consent" required />
              <label htmlFor="consent">I verify that all information provided is accurate for verification.</label>
            </div>

            <button type="submit" className="btn-hybrid-complete" disabled={isSubmitting}>
              {isSubmitting ? 'Processing Application...' : 'Complete Registration'}
            </button>
            <div className="form-footer-alt">
               <p>Already have an account? <a href="#">Log in</a></p>
               <span className="soc2-footer">SOC2 Type II Compliant & Encrypted</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

function Feature({ icon, text }) {
    return (
        <div className="flex items-center gap-3 text-white/80">
            <span className="text-xl">{icon}</span>
            <span className="text-sm">{text}</span>
        </div>
    );
}
