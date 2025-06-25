import React from 'react'
import Link from 'next/link'
import { Copyright } from 'lucide-react'

export function FooterMobile() {
  return (
    <footer className="bg-zinc-900 text-zinc-100 border-t-4 border-transparent bg-gradient-to-t from-zinc-800/50 to-zinc-900">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/" className="hover:text-gray-700 transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-700 transition-colors">
            About
          </Link>
          <Link href="/services" className="hover:text-gray-700 transition-colors">
            Services
          </Link>
          <Link href="/contact" className="hover:text-gray-700 transition-colors">
            Contact
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-4">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src="https://cdn.simpleicons.org/instagram/000000"
              alt="Instagram"
              className="h-5 w-5"
            />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src="https://cdn.simpleicons.org/facebook/000000"
              alt="Facebook"
              className="h-5 w-5"
            />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src="https://cdn.simpleicons.org/twitter/000000"
              alt="Twitter"
              className="h-5 w-5"
            />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src="https://cdn.simpleicons.org/linkedin/000000"
              alt="LinkedIn"
              className="h-5 w-5"
            />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-600 flex items-center gap-1">
          <Copyright size={12} />
          <span>Desenvolvido por</span>
          <span className="font-bold bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
              Atletize
            </span>
            <img
              src="/atletize.png"
              alt="Atletize"
              className="h-6 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
            />
        </div>
      </div>
    </footer>
  )
}
