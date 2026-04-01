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
      <div className="signup-left">
        <div className="constellation-nodes">
            <div className="node" style={{top: '55%', left: '20%'}}></div>
            <div className="node" style={{top: '35%', left: '35%'}}></div>
            <div className="node" style={{top: '25%', left: '55%'}}></div>
            <div className="node" style={{top: '30%', left: '75%'}}></div>
            <div className="node" style={{top: '52%', left: '85%'}}></div>
            <div className="node" style={{top: '75%', left: '78%'}}></div>
            <div className="node" style={{top: '85%', left: '55%'}}></div>
            <div className="node" style={{top: '78%', left: '35%'}}></div>
            <div className="node" style={{top: '68%', left: '18%'}}></div>
            <div className="node n-center" style={{top: '50%', left: '50%'}}></div>
            
            <svg className="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon className="constellation-polygon" points="20,55 35,35 55,25 75,30 85,52 78,75 55,85 35,78 20,55" />
                
                <line x1="20%" y1="55%" x2="35%" y2="35%" />
                <line x1="35%" y1="35%" x2="55%" y2="25%" />
                <line x1="55%" y1="25%" x2="75%" y2="30%" />
                <line x1="75%" y1="30%" x2="85%" y2="52%" />
                <line x1="85%" y1="52%" x2="78%" y2="75%" />
                <line x1="78%" y1="75%" x2="55%" y2="85%" />
                <line x1="55%" y1="85%" x2="35%" y2="78%" />
                <line x1="35%" y1="78%" x2="20%" y2="55%" />
                
                <line x1="50%" y1="50%" x2="20%" y2="55%" />
                <line x1="50%" y1="50%" x2="35%" y2="35%" />
                <line x1="50%" y1="50%" x2="55%" y2="25%" />
                <line x1="50%" y1="50%" x2="75%" y2="30%" />
                <line x1="50%" y1="50%" x2="85%" y2="52%" />
                <line x1="50%" y1="50%" x2="78%" y2="75%" />
                <line x1="50%" y1="50%" x2="55%" y2="85%" />
                <line x1="50%" y1="50%" x2="35%" y2="78%" />
                
                <polygon className="constellation-polygon" points="15,50 30,30 50,20 70,30 85,50 70,70 50,80 30,70 15,50" />
                
                <line x1="15%" y1="50%" x2="30%" y2="30%" />
                <line x1="30%" y1="30%" x2="50%" y2="20%" />
                <line x1="50%" y1="20%" x2="70%" y2="30%" />
                <line x1="70%" y1="30%" x2="85%" y2="50%" />
                <line x1="85%" y1="50%" x2="70%" y2="70%" />
                <line x1="70%" y1="70%" x2="50%" y2="80%" />
                <line x1="50%" y1="80%" x2="30%" y2="70%" />
                <line x1="30%" y1="70%" x2="15%" y2="50%" />
                
                <line x1="50%" y1="50%" x2="15%" y2="50%" />
                <line x1="50%" y1="50%" x2="30%" y2="30%" />
                <line x1="50%" y1="50%" x2="50%" y2="20%" />
                <line x1="50%" y1="50%" x2="70%" y2="30%" />
                <line x1="50%" y1="50%" x2="85%" y2="50%" />
                <line x1="50%" y1="50%" x2="70%" y2="70%" />
                <line x1="50%" y1="50%" x2="50%" y2="80%" />
                <line x1="50%" y1="50%" x2="30%" y2="70%" />
            </svg>
        </div>
        
        <div className="branding-container">
          <h2 className="branding-title">Start generating leads in minutes</h2>
          <div className="branding-features">
            <div className="feature-row">
              <span className="feature-icon" style={{color: '#ff4d6d'}}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                </svg>
              </span>
              <p>Extract leads from LinkedIn profiles, groups & posts</p>
            </div>
            <div className="feature-row">
              <span className="feature-icon" style={{color: '#94a3b8'}}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </span>
              <p>Enrich with verified emails and phone numbers</p>
            </div>
            <div className="feature-row">
              <span className="feature-icon" style={{color: '#ff85a2'}}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </span>
              <p>AI-powered lead scoring and persona matching</p>
            </div>
            <div className="feature-row">
              <span className="feature-icon" style={{color: '#ff9f1c'}}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M13.13 22.19L11.5 18.36L9.87 22.19L11.5 21L13.13 22.19ZM11.5 2L10.19 5.81H4.13L9.06 9.38L7.19 15.19L11.5 11.5L15.81 15.19L13.94 9.38L18.87 5.81H12.81L11.5 2Z"/>
                </svg>
              </span>
              <p>Multi-channel outreach campaigns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Community Form */}
      <div className="signup-right">
        <div className="signup-nav">
          <div className="app-logo-mini">
              <span className="logo-badge">LG</span>
              <span className="logo-label">LeadGenius</span>
          </div>
          <button className="btn-back" onClick={onBack}>
            <i className="fas fa-arrow-left"></i> Back to Software
          </button>
        </div>

        <div className="signup-form-scrollable">
          <div className="form-intro">
            <h2>Join Leadnius Community</h2>
            <p>Verified early access to elite software tools.</p>
          </div>

          <form onSubmit={handleSubmit} className="community-form">
            <div className="form-block">
              <h4 className="block-title">IDENTITY & AUTHENTICITY</h4>
              <div className="block-row">
                 <div className="input-wrap">
                    <label>Full Name</label>
                    <span className="input-hint">For community trust</span>
                    <input type="text" name="fullName" placeholder="e.g. John Doe" required />
                 </div>
                 <div className="input-wrap">
                    <label>LinkedIn Profile</label>
                    <span className="input-hint">Verification required</span>
                    <input type="url" name="linkedin" placeholder="https://linkedin.com/in/..." required />
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
