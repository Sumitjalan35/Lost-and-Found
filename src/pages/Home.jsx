import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Campus Lost & Found
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Connect with your college community to find lost items and reunite found belongings. 
              Our automated email system ensures everyone stays informed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/report-lost"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                🔍 Report Lost Item
              </Link>
              <Link
                to="/report-found"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
              >
                🎉 Report Found Item
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Simple steps to help you find your lost items or return found belongings
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">1. Report Item</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fill out a detailed form with item description, location, and contact information. 
                Upload photos for better identification.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">2. Email Notification</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your report is automatically sent to all college domain users via email, 
                ensuring maximum visibility within the community.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">3. Connect & Reunite</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Interested parties can contact you directly through email or phone 
                to arrange the return of lost items.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Lost Item Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Lost Something?</h3>
                <p className="text-red-100">
                  Don't worry! Report your lost item and we'll help you find it.
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Upload photos for better identification
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Provide detailed description and location
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Automatic email notification to college community
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Direct contact through email/phone
                  </li>
                </ul>
                <Link
                  to="/report-lost"
                  className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Report Lost Item
                </Link>
              </div>
            </div>

            {/* Found Item Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Found Something?</h3>
                <p className="text-green-100">
                  Help reunite lost items with their owners by reporting found items.
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Upload photos of the found item
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Specify where and when you found it
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Provide your contact information
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Help someone find their lost belongings
                  </li>
                </ul>
                <Link
                  to="/report-found"
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Report Found Item
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Browse Items Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Browse All Items
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Search through all reported lost and found items. Use filters to find what you're looking for.
          </p>
          <Link
            to="/view-items"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl inline-block"
          >
            Browse Items
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Campus Lost & Found</h3>
          <p className="text-gray-300 mb-4">
            Helping college communities stay connected and reunited with their belongings.
          </p>
          <p className="text-sm text-gray-400">
            © 2024 Campus Lost & Found. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
