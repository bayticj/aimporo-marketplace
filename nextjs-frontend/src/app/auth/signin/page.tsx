'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import './styles.css';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const { login, loading, error, clearError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting login form with:', { email, password });
    
    if (!email || !password) {
      setLocalError('Please enter both email and password');
      return;
    }
    
    try {
      await login(email, password);
    } catch (err) {
      console.error('Error during login submission:', err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <Image 
                  src="/assets/img/aimporo-logo.png" 
                  alt="Aimporo Logo" 
                  width={150} 
                  height={40}
                  style={{ 
                    maxHeight: '40px', 
                    width: 'auto', 
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
                <h3 className="mt-3">Welcome Back!</h3>
                <p className="text-muted">Sign in to your account</p>
              </div>
              
              {(error || localError) && (
                <div className="alert alert-danger">
                  {error || localError}
                  <button 
                    type="button" 
                    className="btn-close float-end" 
                    onClick={() => {
                      clearError();
                      setLocalError('');
                    }}
                  ></button>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary w-100" 
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
                
                <div className="text-center mt-3">
                  <Link href="/auth/forgot-password" className="text-decoration-none">
                    Forgot Password?
                  </Link>
                </div>
              </form>
              
              <div className="mt-4 text-center">
                <p>Don't have an account? <Link href="/auth/signup" className="text-decoration-none">Sign Up</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 