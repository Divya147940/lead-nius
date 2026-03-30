import React from 'react';

const RegistrationModal = ({ isActive, onClose }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [selectedLookingFor, setSelectedLookingFor] = React.useState([]);
  const [selectedPerk, setSelectedPerk] = React.useState('');

  if (!isActive) return null;

  const handleRegistration = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const formData = new FormData(event.target);
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
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            document.getElementById('registration-form').style.display = 'none';
            document.getElementById('registration-success').style.display = 'block';
            
            setTimeout(() => {
                onClose();
                setTimeout(() => {
                    document.getElementById('registration-form').style.display = 'block';
                    document.getElementById('registration-success').style.display = 'none';
                    event.target.reset();
                    setSelectedLookingFor([]);
                    setSelectedPerk('');
                    setIsSubmitting(false);
                }, 500);
            }, 3000);
        } else {
            const errorData = await response.json().catch(() => ({}));
            setErrorMessage(errorData.error || 'Something went wrong. Please try again.');
            setIsSubmitting(false);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        setErrorMessage('Could not connect to the server. Please ensure the backend is running.');
        setIsSubmitting(false);
    }
  };

  const toggleLookingFor = (value) => {
    setSelectedLookingFor(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  return (
    <div className={`modal-overlay ${isActive ? 'active' : ''}`}>
      <div className="registration-modal">
        <span className="close-modal" onClick={onClose}>&times;</span>
        <div id="registration-form">
          <div className="modal-header">
            <h2>Join Leadnius</h2>
            <p>Verified early access to elite software tools.</p>
          </div>
          
          <form onSubmit={handleRegistration}>
            {/* Section 1: Identity */}
            <div className="form-section">
              <div className="section-title">Identity & Authenticity</div>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <span className="label-hint">Verification required for community trust</span>
                  <input type="text" name="fullName" className="form-input" placeholder="e.g. John Doe" required />
                </div>
                <div className="form-group">
                  <label>LinkedIn Profile</label>
                  <span className="label-hint">Must be public for verification</span>
                  <input type="url" name="linkedin" className="form-input" placeholder="https://linkedin.com/in/..." required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Startup Name</label>
                  <span className="label-hint">Your current main project</span>
                  <input type="text" name="startupName" className="form-input" placeholder="e.g. Acme AI" required />
                </div>
                <div className="form-group">
                  <label>Startup URL</label>
                  <span className="label-hint">Landing page or live product</span>
                  <input type="url" name="startupUrl" className="form-input" placeholder="https://..." required />
                </div>
              </div>
            </div>

            {/* Section 2: Product Insights */}
            <div className="form-section">
                <div className="section-title">Product & Industry</div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Product Stage</label>
                        <span className="label-hint">Where are you today?</span>
                        <select name="stage" className="form-select" required defaultValue="">
                        <option value="" disabled>Select current stage</option>
                        <option value="Ideation">Ideation</option>
                        <option value="MVP/Beta">MVP / Beta</option>
                        <option value="Launched/Scaling">Launched / Scaling</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Industry / Niche</label>
                        <span className="label-hint">What is your primary focus?</span>
                        <select name="industry" className="form-select" required defaultValue="">
                          <option value="" disabled>Select industry</option>
                          <option value="SaaS">SaaS</option>
                          <option value="FinTech">FinTech</option>
                          <option value="AI">AI</option>
                          <option value="HealthTech">HealthTech</option>
                          <option value="Other">Other</option>
                        </select>
                    </div>

                </div>
            </div>

            {/* Section 3: Community Commitment */}
            <div className="form-section">
              <div className="section-title">Community Alignment</div>
              
              <div className="form-group">
                <label>What are you looking for most?</label>
                <span className="label-hint">Select all that apply</span>
                <div className="choice-cards">
                  {[
                    { val: "Beta Testers & Feedback", icon: "🚀", desc: "Get early feedback from fellow founders" },
                    { val: "First Paying Customers", icon: "💰", desc: "Find your initial early-adopter market" },
                    { val: "Networking & Collab", icon: "🤝", desc: "Connect with like-minded builders" }
                  ].map(item => (
                    <div 
                      key={item.val}
                      className={`choice-card ${selectedLookingFor.includes(item.val) ? 'selected' : ''}`}
                      onClick={() => toggleLookingFor(item.val)}
                    >
                      <div className="card-icon">{item.icon}</div>
                      <div className="card-title">{item.val}</div>
                      <div className="card-desc">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Proposed "Beta Perk"</label>
                <span className="label-hint">Required to join our curated network</span>
                <div className="choice-cards">
                  {[
                    { val: "Lifetime Access (LTD)", icon: "✨", desc: "Offer permanent access to early birds" },
                    { val: "Extended Free Trial", icon: "⏳", desc: "6-12 months of free premium usage" },
                    { val: "Significant Discount", icon: "🏷️", desc: "70%+ off for our community" },
                    { val: "Networking only", icon: "🌐", desc: "Barter / Community contribution" }
                  ].map(item => (
                    <div 
                      key={item.val}
                      className={`choice-card ${selectedPerk === item.val ? 'selected' : ''}`}
                      onClick={() => setSelectedPerk(item.val)}
                    >
                      <div className="card-icon">{item.icon}</div>
                      <div className="card-title">{item.val}</div>
                      <div className="card-desc">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="error-message-box">
                {errorMessage}
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Processing Registration...' : 'Complete Registration'}
            </button>
          </form>
        </div>

        <div id="registration-success" className="success-message">
          <div className="success-icon">✓</div>
          <h3>Welcome Aboard!</h3>
          <p>Your application is being reviewed. We'll be in touch via LinkedIn soon.</p>
        </div>
      </div>
    </div>
  );
};


export default RegistrationModal;
