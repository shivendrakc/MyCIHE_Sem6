import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                
                {/* Company Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-400 mb-4">Company</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:text-sky-400 text-gray-300">About us</a></li>
                    <li><a href="#" className="hover:text-sky-400 text-gray-300">Blog</a></li>
                    <li><a href="#" className="hover:text-sky-400 text-gray-300">Contact us</a></li>
                  </ul>
                </div>
    
                {/* Support Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-400 mb-4">Support</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:text-sky-400 text-gray-300">Help center</a></li>
                    <li><a href="#" className="hover:text-sky-400 text-gray-300">Terms of service</a></li>
                    <li><a href="#" className="hover:text-sky-400 text-gray-300">Legal</a></li>
                    <li><a href="#" className="hover:text-sky-400 text-gray-300">Privacy policy</a></li>
                    <li><a href="#" className="hover:text-sky-400 text-gray-300">Status</a></li>
                  </ul>
                </div>
    
                {/* Stay Up to Date Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-400 mb-4">Stay up to date</h3>
                  <div className="flex items-center border-b border-gray-600 py-2">
                    <input type="email" placeholder="Your email address" className="bg-transparent text-gray-300 focus:outline-none flex-1" />
                    <button className="text-gray-400">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </button>
                  </div>
                  <div className="flex space-x-4 mt-6">
                    <a href="#" className="hover:text-sky-400">
                      <FontAwesomeIcon icon={faInstagram} size="lg" />
                    </a>
                    <a href="#" className="hover:text-sky-400">
                      <FontAwesomeIcon icon={faTwitter} size="lg" />
                    </a>
                    <a href="#" className="hover:text-sky-400">
                      <FontAwesomeIcon icon={faYoutube} size="lg" />
                    </a>
                  </div>
                </div>
              </div>
    
              {/* Copyright */}
              <div className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-400">
                Copyright © 2020 Learnify UI Kit . All rights reserved
              </div>
            </div>
          </footer>
  )
}

export default Footer
