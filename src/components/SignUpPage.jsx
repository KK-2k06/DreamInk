import React, { useEffect, useRef, useState } from 'react'
import signupBg from '../bgimages/signup.png'

export default function SignUpPage({ onNavigate, onSignUp }) {
  const [visible, setVisible] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)
  const firstRef = useRef(null)
  const lastRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmRef = useRef(null)
  useEffect(() => setVisible(true), [])

  const calculatePasswordStrength = (pwd) => {
    let strength = 0
    if (pwd.length >= 6) strength += 1
    if (pwd.length >= 10) strength += 1
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength += 1
    if (/\d/.test(pwd)) strength += 1
    if (/[^a-zA-Z0-9]/.test(pwd)) strength += 1
    return strength
  }

  const handlePasswordChange = (e) => {
    const pwd = e.target.value
    setPassword(pwd)
    setPasswordStrength(calculatePasswordStrength(pwd))
  }

  const getStrengthColor = () => {
    if (passwordStrength === 0) return 'border-gray-300'
    if (passwordStrength <= 2) return 'border-red-500'
    if (passwordStrength === 3) return 'border-yellow-500'
    if (passwordStrength === 4) return 'border-green-500'
    return 'border-green-600'
  }

  const getStrengthBarWidth = () => {
    return `${(passwordStrength / 5) * 100}%`
  }

  const getStrengthBarColor = () => {
    if (passwordStrength === 0) return 'bg-gray-300'
    if (passwordStrength <= 2) return 'bg-red-500'
    if (passwordStrength === 3) return 'bg-yellow-500'
    if (passwordStrength === 4) return 'bg-green-500'
    return 'bg-green-600'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const firstName = (firstRef.current?.value || '').trim()
    const lastName = (lastRef.current?.value || '').trim()
    const email = (emailRef.current?.value || '').trim()
    const password = passwordRef.current?.value || ''
    const confirm = confirmRef.current?.value || ''
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    await onSignUp?.({ firstName, lastName, email, password })
    setLoading(false)
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen py-12">
      <button
        onClick={() => onNavigate('landing')}
        className="absolute top-4 left-4 z-20 px-3 py-2 text-sm font-medium text-gray-800 bg-white/80 rounded-lg shadow-sm hover:bg-white backdrop-blur-md border border-white/40"
      >
        ← Back to Landing
      </button>
      <div className="pointer-events-none absolute inset-0 z-0">
        <img src={signupBg} alt="" className="h-full w-full object-cover opacity-25 z-50" />
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
            Create your account
          </h3>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <div>
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
              <input id="firstname" name="firstname" type="text" required ref={firstRef}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input id="lastname" name="lastname" type="text" required ref={lastRef}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email-signup" className="block text-sm font-medium text-gray-700">Email address</label>
            <input id="email-signup" name="email" type="email" autoComplete="email" required ref={emailRef}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password-signup" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <input 
                id="password-signup" 
                name="password" 
                type={showPassword ? 'text' : 'password'} 
                required 
                ref={passwordRef}
                value={password}
                onChange={handlePasswordChange}
                className={`w-full px-3 py-2 border-2 ${getStrengthColor()} rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10 transition-colors duration-300`}
              />
              <button type="button" onClick={() => setShowPassword(p => !p)}
                className="absolute inset-y-0 right-0 px-3 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {password && (
              <div className="mt-2">
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getStrengthBarColor()} transition-all duration-300`}
                    style={{ width: getStrengthBarWidth() }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {passwordStrength === 0 && 'Too weak'}
                  {passwordStrength === 1 && 'Weak'}
                  {passwordStrength === 2 && 'Fair'}
                  {passwordStrength === 3 && 'Good'}
                  {passwordStrength === 4 && 'Strong'}
                  {passwordStrength === 5 && 'Very Strong'}
                </p>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="mt-1 relative">
              <input id="confirm-password" name="confirm-password" type={showConfirmPassword ? 'text' : 'password'} required ref={confirmRef}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 pr-10"
              />
              <button type="button" onClick={() => setShowConfirmPassword(p => !p)}
                className="absolute inset-y-0 right-0 px-3 text-gray-600 hover:text-gray-800"
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
          {error ? (
            <p className="text-sm text-rose-600">{error}</p>
          ) : null}
          <button type="submit" disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing up...
              </>
            ) : 'Sign Up'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate('signIn')}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  )
}


