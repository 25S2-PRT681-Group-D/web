import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-charcoalgrey w-full px-6 py-12'>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">AgroScan</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Plant health analysis for modern agriculture. 
              Get instant, accurate diagnoses and health recommendations.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-savannagreen rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🌱</span>
              </div>
              <div className="w-8 h-8 bg-arafurablue rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🤖</span>
              </div>
              <div className="w-8 h-8 bg-territoryochre rounded-full flex items-center justify-center">
                <span className="text-white text-sm">📊</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-white transition-colors duration-200">Home</Link>
              <Link to="/dashboard" className="block text-gray-300 hover:text-white transition-colors duration-200">Dashboard</Link>
              <Link to="/new-inspection" className="block text-gray-300 hover:text-white transition-colors duration-200">New Inspection</Link>
              <Link to="/my-records" className="block text-gray-300 hover:text-white transition-colors duration-200">My Records</Link>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Features</h4>
            <div className="space-y-2">
              <span className="block text-gray-300">Plant Analysis</span>
              <span className="block text-gray-300">Health Monitoring</span>
              <span className="block text-gray-300">Health Recommendations</span>
              <span className="block text-gray-300">Analytics Dashboard</span>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <div className="space-y-2">
              <span className="block text-gray-300">support@agroscan.com</span>
              <span className="block text-gray-300">+1 (555) 123-4567</span>
              <span className="block text-gray-300">Available 24/7</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-300 text-sm">
              © 2025 AgroScan. All Rights Reserved. Powered by AI Technology.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-gray-300 text-sm">Privacy Policy</span>
              <span className="text-gray-300 text-sm">Terms of Service</span>
              <span className="text-gray-300 text-sm">Cookie Policy</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;