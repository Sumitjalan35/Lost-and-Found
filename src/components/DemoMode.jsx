import { useState } from 'react';
import toast from 'react-hot-toast';

export default function DemoMode() {
  const [demoItems, setDemoItems] = useState([
    {
      id: '1',
      title: 'iPhone 13 Pro',
      description: 'Black iPhone 13 Pro with clear case, lost near the library',
      category: 'electronics',
      location: 'University Library',
      dateLost: '2024-01-15',
      contactEmail: 'student@college.edu',
      status: 'lost',
      imageUrl: 'https://via.placeholder.com/300x200?text=iPhone+13+Pro',
      createdAt: new Date('2024-01-15T10:30:00')
    },
    {
      id: '2',
      title: 'Black Backpack',
      description: 'Nike black backpack with laptop compartment',
      category: 'bags',
      location: 'Student Center',
      dateFound: '2024-01-16',
      contactEmail: 'finder@college.edu',
      status: 'found',
      imageUrl: 'https://via.placeholder.com/300x200?text=Black+Backpack',
      createdAt: new Date('2024-01-16T14:20:00')
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    dateLost: '',
    contactEmail: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newItem = {
      id: Date.now().toString(),
      ...formData,
      status: 'lost',
      createdAt: new Date(),
      imageUrl: 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(formData.title)
    };
    
    setDemoItems(prev => [newItem, ...prev]);
    setFormData({
      title: '',
      description: '',
      category: '',
      location: '',
      dateLost: '',
      contactEmail: ''
    });
    
    toast.success('Demo item added! (Firebase not configured)');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Demo Mode Active
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>Firebase is not configured. This is a demo version with local data only.</p>
              <p className="mt-1">Run <code className="bg-yellow-100 px-1 rounded">node setup-config.js</code> to enable full functionality.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Demo Form */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Demo: Report Lost Item</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., iPhone 13, Black Backpack"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books & Stationery</option>
                <option value="jewelry">Jewelry & Accessories</option>
                <option value="bags">Bags & Backpacks</option>
                <option value="sports">Sports Equipment</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the item in detail"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location Lost *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Library, Cafeteria"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Lost *
                </label>
                <input
                  type="date"
                  name="dateLost"
                  value={formData.dateLost}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                College Email *
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="yourname@college.edu"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
              >
                Add Demo Item
              </button>
            </div>
          </form>
        </div>

        {/* Demo Items List */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Demo Items</h2>
          
          <div className="space-y-4">
            {demoItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className={`px-2 py-1 rounded-full ${
                        item.status === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {item.status.toUpperCase()}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                        {item.category}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                        {item.location}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Contact: {item.contactEmail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 