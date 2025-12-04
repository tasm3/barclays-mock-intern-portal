import { useState } from 'react'
import barclaysLogo from '../assets/barclays-logo.png'

function LoginScreen({ onLogin }) {
  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-logo-container">
          <div
            className="logo-placeholder"
            style={{
              width: '90px',
              height: '90px',
              margin: '0 auto 1.5rem',
              borderRadius: '8px'
            }}
          >
            <img src={barclaysLogo} alt="Barclays logo" className="logo-image" />
          </div>
        </div>
        <h1 className="login-title">The Barclays Blueprint</h1>
        <p className="login-subtitle">Choose a Demo Experience:</p>
        <div className="login-buttons">
          <button className="btn btn-primary" onClick={() => onLogin('intern')}>
            Participants
          </button>
          <button className="btn btn-primary" onClick={() => onLogin('manager')}>
            Manager
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen

