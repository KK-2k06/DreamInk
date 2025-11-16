import React, { useEffect, useRef, useState } from 'react'
import signinBg from '../bgimages/signin.png'

export default function SignInPage({ onNavigate, onSignIn, defaultEmail = '' }) {
  const [visible, setVisible] = useState(false)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => setVisible(true), [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = (emailRef.current?.value || '').trim()
    const password = passwordRef.current?.value || ''
    setLoading(true)
    await onSignIn?.({ email, password })
    setLoading(false)
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <button
        onClick={() => onNavigate('landing')}
        className="absolute top-4 left-4 z-20 px-3 py-2 text-sm font-medium text-gray-800 bg-white/80 rounded-lg shadow-sm hover:bg-white backdrop-blur-md border border-white/40"
      >
        ← Back to Landing
      </button>
      <div className="pointer-events-none absolute inset-0 z-0">
        <img src={signinBg} alt="" className="h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-white/40" />
      </div>
      <div className={`w-full max-w-md p-8 space-y-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <div>
          <h2
            onClick={() => onNavigate('landing')}
            className="text-4xl font-black text-center bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-600 bg-clip-text text-transparent cursor-pointer"
          >
            AI Image Transformation
          </h2>
          <h3 className="mt-2 text-2xl font-bold text-center text-gray-900">
            Sign in to your account
          </h3>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input id="email" name="email" type="email" autoComplete="email" required defaultValue={defaultEmail} ref={emailRef}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required ref={passwordRef}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pr-10"
              />
              <button type="button" onClick={() => setShowPassword(p => !p)}
                className="absolute inset-y-0 right-0 px-3 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => onNavigate('signUp')}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Get Started
          </button>
        </p>
      </div>
    </div>
  )
}


