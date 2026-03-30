import React, { useState, useEffect } from 'react';

const RegistrationsView = ({ onBack }) => {
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/registrations');
      if (response.ok) {
        const data = await response.json();
        setRegistrations(data);
      } else {
        setError('Could not fetch registrations from server');
      }
    } catch (err) {
      setError('Connection refused. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registrations-view">
      <div className="view-header">
        <button className="btn-back" onClick={onBack}>
          <i className="fas fa-arrow-left"></i> Back to Home
        </button>
        <h2>Live Database Dashboard</h2>
        <p>Total Registrations: {registrations.length}</p>
      </div>

      {isLoading && <div className="loading">Connecting to database...</div>}
      {error && <div className="error-box">{error}</div>}

      {!isLoading && !error && (
        <div className="registrations-table-container">
          <table className="registrations-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Full Name</th>
                <th>Startup</th>
                <th>Stage</th>
                <th>Beta Perk</th>
              </tr>
            </thead>
            <tbody>
              {registrations.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty">No registrations yet. Try registering!</td>
                </tr>
              ) : (
                registrations.map((reg, index) => (
                  <tr key={index}>
                    <td>{new Date(reg.timestamp).toLocaleDateString()}</td>
                    <td>
                      <div className="name-cell">
                        <strong>{reg.fullName || reg.fullname}</strong>
                        <a href={reg.linkedin} target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-linkedin"></i>
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="startup-cell">
                        {reg.startupName || reg.startupname}
                        <span className="industry">{reg.industry}</span>
                      </div>
                    </td>
                    <td><span className="badge-stage">{reg.stage}</span></td>
                    <td><span className="badge-perk">{reg.betaPerk || reg.betaperk}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RegistrationsView;
