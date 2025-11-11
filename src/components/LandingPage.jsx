import React, { useEffect, useState } from 'react'
import { stylesData } from '../data/stylesData.js'
import landingBg from '../bgimages/landingpage.png'

export default function LandingPage({ onNavigate }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stylesData.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const currentStyle = stylesData[currentIndex]
  const year = new Date().getFullYear()

  return (
    <div className="relative min-h-screen text-gray-900">
      {/* Fixed Background - stays static while content scrolls */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${landingBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          opacity: 0.5
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.75)_60%,rgba(255,255,255,1)_100%)]" />
      </div>

      {/* Full-width Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white/30 backdrop-blur-sm shadow-md border-b border-gray-200/30">
        <div className="w-full px-6 sm:px-8 md:px-12 lg:px-24">
          <div className="flex items-center justify-between h-20">
            <button onClick={() => onNavigate('landing')} className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-700 via-fuchsia-600 to-rose-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
              DreamInk
            </button>
            <div className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('signIn')}
                className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white/90 rounded-lg shadow-sm hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate('signUp')}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Scrollable Content */}
      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 sm:px-12 md:px-24 py-8">
          <div className="w-full max-w-7xl grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-indigo-600 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent drop-shadow-sm leading-tight">
                  DreamInk
                </h1>
                <p className="text-2xl md:text-3xl text-gray-800 font-semibold">
                  <span className="relative inline-block">
                    Turn your image into art
                    <span className="absolute -bottom-2 left-0 right-0 h-[6px] bg-gradient-to-r from-indigo-300/60 via-fuchsia-300/60 to-rose-300/60 rounded-full" />
                  </span>
                </p>
              </div>
              <div className="relative h-28">
                <div key={currentStyle.id} className="text-xl md:text-2xl text-gray-700 animate-fadeIn font-medium">
                  <p>{currentStyle.description}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => onNavigate('signUp')}
                  className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Start Creating
                </button>
                <button
                  onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 text-lg font-semibold text-gray-700 bg-white/90 rounded-xl shadow-md hover:shadow-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Learn More
                </button>
              </div>
            </div>

            <div className="relative h-[500px] md:h-[550px] w-full max-w-lg mx-auto flex items-center justify-center perspective-1000">
              {/* Glowing background effect - reduced */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/15 via-purple-400/15 to-rose-400/15 rounded-full blur-3xl animate-pulse" />
              
              {/* 3D Carousel Container */}
              <div 
                className="relative w-64 h-[400px] md:w-72 md:h-[450px]"
                style={{
                  perspective: '1200px',
                  perspectiveOrigin: 'center center'
                }}
              >
                {stylesData.map((style, index) => {
                  const offset = (index - currentIndex + stylesData.length) % stylesData.length
                  const totalStyles = stylesData.length
                  
                  let scale, opacity, zIndex, brightness, translateX, translateZ, rotateY, glowIntensity
                  
                  if (offset === 0) {
                    // Current card - front and center with dramatic effects
                    scale = 1
                    opacity = 1
                    zIndex = totalStyles + 5
                    brightness = 1.2
                    translateX = 0
                    translateZ = 0
                    rotateY = 0
                    glowIntensity = 1
                  } else if (offset === 1) {
                    // Right side card
                    scale = 0.75
                    opacity = 0.85
                    zIndex = totalStyles - 1
                    brightness = 0.85
                    translateX = 100
                    translateZ = -70
                    rotateY = -25
                    glowIntensity = 0.2
                  } else if (offset === totalStyles - 1) {
                    // Left side card
                    scale = 0.75
                    opacity = 0.85
                    zIndex = totalStyles - 1
                    brightness = 0.85
                    translateX = -100
                    translateZ = -70
                    rotateY = 25
                    glowIntensity = 0.2
                  } else if (offset === 2) {
                    // Far right
                    scale = 0.6
                    opacity = 0.4
                    zIndex = totalStyles - 2
                    brightness = 0.6
                    translateX = 150
                    translateZ = -130
                    rotateY = -40
                    glowIntensity = 0.05
                  } else if (offset === totalStyles - 2) {
                    // Far left
                    scale = 0.6
                    opacity = 0.4
                    zIndex = totalStyles - 2
                    brightness = 0.6
                    translateX = -150
                    translateZ = -130
                    rotateY = 40
                    glowIntensity = 0.05
                  } else {
                    // Hidden cards
                    scale = 0.4
                    opacity = 0
                    zIndex = 0
                    brightness = 0.4
                    translateX = offset > totalStyles / 2 ? 250 : -250
                    translateZ = -200
                    rotateY = offset > totalStyles / 2 ? -60 : 60
                    glowIntensity = 0
                  }
                  
                  return (
                    <div
                      key={style.id}
                      className="absolute top-1/2 left-1/2 origin-center"
                      style={{
                        transform: `translate(-50%, -50%) translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                        opacity,
                        zIndex,
                        filter: `brightness(${brightness}) ${offset === 0 ? 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.4))' : ''}`,
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden',
                        transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        willChange: 'transform, opacity'
                      }}
                    >
                      <div 
                        className={`relative w-64 h-[400px] md:w-72 md:h-[450px] ${offset === 0 ? 'animate-float' : ''}`}
                        style={{
                          transform: 'translateZ(0)',
                        }}
                      >
                        {/* Reduced glowing border effect for active card */}
                        {offset === 0 && (
                          <>
                            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 rounded-3xl opacity-30 blur-xl animate-pulse" />
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400 rounded-3xl opacity-20 blur-lg" />
                          </>
                        )}
                        
                        {/* Card shadow with depth - reduced */}
                        <div 
                          className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/30 to-rose-600/30 rounded-3xl"
                          style={{
                            transform: `translateZ(-30px) scale(${scale * 1.2})`,
                            filter: 'blur(20px)',
                            opacity: glowIntensity * 0.5
                          }}
                        />
                        
                        {/* Main card with enhanced styling */}
                        <div 
                          className="relative w-full h-full rounded-3xl overflow-hidden border-2 transition-all duration-1000"
                          style={{
                            borderColor: offset === 0 ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                            boxShadow: offset === 0 
                              ? '0 20px 40px -10px rgba(99, 102, 241, 0.4), 0 0 25px rgba(168, 85, 247, 0.3)' 
                              : '0 15px 35px -10px rgba(0, 0, 0, 0.4)',
                            transform: 'translateZ(0)'
                          }}
                        >
                          <img
                            src={style.imageUrl}
                            alt={style.title}
                            className="w-full h-full object-cover transition-transform duration-1000"
                            style={{
                              transform: offset === 0 ? 'scale(1.05)' : 'scale(1)',
                            }}
                            onError={(e) => (e.target.src = 'https://placehold.co/350x450/cccccc/333333?text=Image+Error')}
                          />
                          
                          {/* Enhanced gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
                          
                          {/* Animated title overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-5 pb-6">
                            <div className="relative">
                              <h3 
                                className="font-black text-xl md:text-2xl text-white text-center transition-transform duration-1000"
                                style={{
                                  textShadow: '0 0 20px rgba(255, 255, 255, 0.6), 0 4px 15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(99, 102, 241, 0.4)',
                                  transform: offset === 0 ? 'scale(1.1) translateY(-3px)' : 'scale(1)',
                                  letterSpacing: '0.05em'
                                }}
                              >
                                {style.title}
                              </h3>
                              
                              {/* Shimmer effect for active card */}
                              {offset === 0 && (
                                <div 
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                  style={{
                                    transform: 'skewX(-15deg)',
                                    animation: 'shimmer 3s infinite'
                                  }}
                                />
                              )}
                            </div>
                            
                            {/* Subtle decorative line for active card */}
                            {offset === 0 && (
                              <div className="mt-3 h-0.5 w-20 mx-auto bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent rounded-full opacity-60" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              {/* Navigation dots */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 mt-4">
                {stylesData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-8 bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg'
                        : 'bg-gray-400/50 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 sm:px-12 md:px-24">
          <div className="w-full max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose DreamInk?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Transform your photos with AI-powered artistry</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200/50">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
                <p className="text-gray-600">Get stunning results in seconds with our advanced AI processing technology.</p>
              </div>
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200/50">
                <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-500 to-rose-600 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Multiple Styles</h3>
                <p className="text-gray-600">Choose from a wide variety of artistic styles to match your vision.</p>
              </div>
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200/50">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-rose-500 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Secure & Private</h3>
                <p className="text-gray-600">Your images are processed securely and never stored without your permission.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Styles Showcase Section */}
        <section className="py-24 px-6 sm:px-12 md:px-24 bg-white/40 backdrop-blur-sm">
          <div className="w-full max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Artistic Styles</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover the perfect style for your image</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {stylesData.map((style) => (
                <div key={style.id} className="bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200/50">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={style.imageUrl}
                      alt={style.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      onError={(e) => (e.target.src = 'https://placehold.co/400x300/cccccc/333333?text=Image+Error')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{style.title}</h3>
                    <p className="text-gray-600">{style.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Company Section */}
        <section className="py-24 px-6 sm:px-12 md:px-24">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">About DreamInk</h2>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  <p>
                    DreamInk is a cutting-edge AI-powered platform that transforms ordinary photos into extraordinary works of art. 
                    Founded in 2023, we combine the latest advances in artificial intelligence with artistic creativity to bring your visions to life.
                  </p>
                  <p>
                    Our mission is to make professional-quality artistic transformation accessible to everyone. Whether you're a professional 
                    photographer, a digital artist, or someone who simply wants to add a creative touch to your memories, DreamInk empowers you 
                    to create stunning visuals effortlessly.
                  </p>
                  <p>
                    With over 5 unique artistic styles and continuous innovation, we're committed to providing you with the best tools to 
                    express your creativity. Join thousands of satisfied users who have transformed their images into beautiful art pieces.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-md border border-gray-200/50">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">10K+</div>
                    <div className="text-sm text-gray-600">Happy Users</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-md border border-gray-200/50">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-rose-600">50K+</div>
                    <div className="text-sm text-gray-600">Images Transformed</div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-md border border-gray-200/50">
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-600">5</div>
                    <div className="text-sm text-gray-600">Art Styles</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-rose-500/20 rounded-3xl p-12 backdrop-blur-md border border-white/50 shadow-2xl">
                <div className="space-y-6 text-gray-800">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">AI-Powered Technology</h3>
                      <p className="text-gray-700">State-of-the-art neural networks trained on millions of artistic images</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">Fast Processing</h3>
                      <p className="text-gray-700">Get results in seconds with our optimized cloud infrastructure</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-2">User-Focused</h3>
                      <p className="text-gray-700">Built with love for creators, by creators</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 sm:px-12 md:px-24">
          <div className="w-full max-w-5xl mx-auto text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 rounded-3xl p-12 md:p-16 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Images?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already using DreamInk to bring their artistic visions to life.
            </p>
            <button
              onClick={() => onNavigate('signUp')}
              className="px-10 py-4 text-lg font-semibold text-indigo-600 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition-all duration-200"
            >
              Get Started for Free
            </button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-gray-900 text-gray-300 mt-auto">
        <div className="w-full px-6 sm:px-12 md:px-24 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent mb-4">
                  DreamInk
                </h3>
                <p className="text-gray-400 mb-4">
                  Transform your images into stunning works of art with AI-powered technology.
                </p>
                <p className="text-gray-500 text-sm">
                  © {year} DreamInk. All rights reserved.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
              <p>Made with ❤️ for creators around the world</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


