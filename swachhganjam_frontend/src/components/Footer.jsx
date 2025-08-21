import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>
  © {currentYear} Solid Waste Management System. All rights reserved.</p>

          
        </div>
      </footer>
  )
}
