import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">Legal Docs</h1>
          </div>
          <div className="flex space-x-4">
            {/* Add your navigation items here */}
          </div>
        </div>
      </div>
    </nav>
  )
}