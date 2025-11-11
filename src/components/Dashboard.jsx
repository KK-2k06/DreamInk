import React, { useState, useRef } from 'react'
import { stylesData } from '../data/stylesData.js'

export default function Dashboard({ user, onNavigate }) {
  const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ') || 'Guest'
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [outputImage, setOutputImage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef(null)

  const handleStyleSelect = (style) => {
    setSelectedStyle(style)
    setUploadedImage(null)
    setOutputImage(null)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result)
        setOutputImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProcessImage = () => {
    if (!uploadedImage || !selectedStyle) return
    
    setIsProcessing(true)
    // Simulate processing delay (UI only - no backend)
    setTimeout(() => {
      // For demo purposes, we'll use the uploaded image as output
      // In a real app, this would be the processed image from the backend
      setOutputImage(uploadedImage)
      setIsProcessing(false)
    }, 2000)
  }

  const handleLogout = () => {
    setSelectedStyle(null)
    setUploadedImage(null)
    setOutputImage(null)
    onNavigate('landing')
  }

  const handleReset = () => {
    setSelectedStyle(null)
    setUploadedImage(null)
    setOutputImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-700 via-fuchsia-600 to-rose-600 bg-clip-text text-transparent">
                DreamInk
              </h1>
              <p className="text-sm text-gray-600 mt-1">Welcome, {displayName}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24 py-8">
        {/* Step 1: Style Selection */}
        {!selectedStyle && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Art Style</h2>
            <p className="text-gray-600 mb-6">Select a style to transform your image</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stylesData.map((style) => (
                <div
                  key={style.id}
                  onClick={() => handleStyleSelect(style)}
                  className="bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200/50 cursor-pointer group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={style.imageUrl}
                      alt={style.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white mb-1">{style.title}</h3>
                      <p className="text-sm text-white/90">{style.description}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <button className="w-full px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                      Select Style
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Upload and Process */}
        {selectedStyle && (
          <div className="space-y-8">
            {/* Selected Style Info */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-200/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                    <img
                      src={selectedStyle.imageUrl}
                      alt={selectedStyle.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedStyle.title}</h2>
                    <p className="text-gray-600 text-sm">{selectedStyle.description}</p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Choose Different Style
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Upload Section */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Upload Your Image</h3>
                
                {!uploadedImage ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/50 transition-all duration-200"
                  >
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400 mb-4"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold text-indigo-600">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative rounded-xl overflow-hidden border-2 border-gray-200">
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="w-full h-auto max-h-96 object-contain bg-gray-50"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Change Image
                      </button>
                      <button
                        onClick={handleProcessImage}
                        disabled={isProcessing}
                        className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        {isProcessing ? 'Processing...' : 'Transform Image'}
                      </button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                )}
              </div>

              {/* Output Section */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Transformed Image</h3>
                
                {isProcessing ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mb-4"></div>
                    <p className="text-gray-600">Processing your image...</p>
                    <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
                  </div>
                ) : outputImage ? (
                  <div className="space-y-4">
                    <div className="relative rounded-xl overflow-hidden border-2 border-indigo-200 bg-gray-50">
                      <img
                        src={outputImage}
                        alt="Transformed"
                        className="w-full h-auto max-h-96 object-contain"
                      />
                      <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        {selectedStyle.title}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={outputImage}
                        download={`dreamink-${selectedStyle.title.toLowerCase().replace(/\s+/g, '-')}.png`}
                        className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 text-center transition-all duration-200"
                      >
                        Download
                      </a>
                      <button
                        onClick={() => {
                          setOutputImage(null)
                          setUploadedImage(null)
                          if (fileInputRef.current) {
                            fileInputRef.current.value = ''
                          }
                        }}
                        className="flex-1 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Try Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center bg-gray-50">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-gray-600">Your transformed image will appear here</p>
                    <p className="text-sm text-gray-500 mt-2">Upload an image and click "Transform Image"</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


