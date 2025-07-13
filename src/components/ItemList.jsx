import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";
import { format } from "date-fns";

export default function ItemList() {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [filter, setFilter] = useState("all"); // all, lost, found
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("ItemList: Setting up Firestore listeners...");
    
    // Subscribe to lost items - temporarily removing isActive filter to debug
    const lostQuery = query(
      collection(db, "lostItems"),
      orderBy("createdAt", "desc")
    );

    const foundQuery = query(
      collection(db, "foundItems"),
      orderBy("createdAt", "desc")
    );

    const unsubscribeLost = onSnapshot(lostQuery, (snapshot) => {
      console.log("Lost items snapshot:", snapshot.docs.length, "items");
      const items = snapshot.docs.map(doc => {
        const data = doc.data();
        console.log("Lost item:", { id: doc.id, title: data.title, isActive: data.isActive });
        return {
          id: doc.id,
          ...data
        };
      });
      setLostItems(items);
    }, (error) => {
      console.error("Error fetching lost items:", error);
    });

    const unsubscribeFound = onSnapshot(foundQuery, (snapshot) => {
      console.log("Found items snapshot:", snapshot.docs.length, "items");
      const items = snapshot.docs.map(doc => {
        const data = doc.data();
        console.log("Found item:", { id: doc.id, title: data.title, isActive: data.isActive });
        return {
          id: doc.id,
          ...data
        };
      });
      setFoundItems(items);
    }, (error) => {
      console.error("Error fetching found items:", error);
    });

    setLoading(false);

    return () => {
      unsubscribeLost();
      unsubscribeFound();
    };
  }, []);

  const getFilteredItems = () => {
    let items = [];
    
    console.log("getFilteredItems called with filter:", filter);
    console.log("lostItems count:", lostItems.length);
    console.log("foundItems count:", foundItems.length);
    
    if (filter === "all" || filter === "lost") {
      const lostWithType = lostItems.map(item => ({ ...item, type: 'lost' }));
      console.log("Adding lost items:", lostWithType.length);
      items = [...items, ...lostWithType];
    }
    
    if (filter === "all" || filter === "found") {
      const foundWithType = foundItems.map(item => ({ ...item, type: 'found' }));
      console.log("Adding found items:", foundWithType.length);
      items = [...items, ...foundWithType];
    }

    console.log("Items before category filter:", items.length);

    if (categoryFilter) {
      items = items.filter(item => item.category === categoryFilter);
      console.log("Items after category filter:", items.length);
    }

    // Sort items by creation date, handling cases where createdAt might be missing
    const sortedItems = items.sort((a, b) => {
      try {
        if (!a.createdAt || !b.createdAt) return 0;
        if (a.createdAt.toDate && b.createdAt.toDate) {
          return b.createdAt.toDate() - a.createdAt.toDate();
        }
        return 0;
      } catch (error) {
        console.error("Error sorting items:", error);
        return 0;
      }
    });

    console.log("Final filtered items:", sortedItems.length);
    return sortedItems;
  };

  const getStatusColor = (type) => {
    return type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
  };

  const getStatusIcon = (type) => {
    return type === 'lost' ? '🔍' : '🎉';
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown';
    return format(timestamp.toDate(), 'MMM dd, yyyy');
  };

  const categories = [
    "electronics", "clothing", "books", "jewelry", "bags", "sports", "other"
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const filteredItems = getFilteredItems();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Lost & Found Items
        </h2>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              All Items ({lostItems.length + foundItems.length})
            </button>
            <button
              onClick={() => setFilter("lost")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                filter === "lost"
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Lost ({lostItems.length})
            </button>
            <button
              onClick={() => setFilter("found")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                filter === "found"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Found ({foundItems.length})
            </button>
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
            No items found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {filter === "all" 
              ? "No lost or found items have been reported yet."
              : `No ${filter} items have been reported yet.`
            }
          </p>
          
          {/* Debug info */}
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Debug: Lost Items: {lostItems.length} | Found Items: {foundItems.length} | Filter: {filter}
            </p>
            {lostItems.length > 0 && (
              <div className="mt-2 text-xs text-gray-500">
                Lost Items: {lostItems.map(item => item.title || 'No title').join(', ')}
              </div>
            )}
            {foundItems.length > 0 && (
              <div className="mt-2 text-xs text-gray-500">
                Found Items: {foundItems.map(item => item.title || 'No title').join(', ')}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {console.log("Rendering", filteredItems.length, "items")}
          {filteredItems.map((item, index) => {
            console.log("Rendering item", index, ":", item.title, item.id);
            return (
              <div
                key={`${item.type}-${item.id}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
              {/* Item Image */}
              {item.imageUrl && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Item Content */}
              <div className="p-6">
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.type)}`}>
                    <span className="mr-1">{getStatusIcon(item.type)}</span>
                    {item.type === 'lost' ? 'Lost' : 'Found'}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(item.createdAt)}
                  </span>
                </div>

                {/* Title and Category */}
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 capitalize">
                  {item.category}
                </p>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {item.description}
                </p>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Location:</span>
                    <span className="font-medium dark:text-white">{item.location}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Date:</span>
                    <span className="font-medium dark:text-white">
                      {item.type === 'lost' ? item.dateLost : item.dateFound}
                    </span>
                  </div>
                  
                  {item.type === 'found' && item.currentLocation && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Current Location:</span>
                      <span className="font-medium dark:text-white">{item.currentLocation}</span>
                    </div>
                  )}
                  
                  {item.reward && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Reward:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">{item.reward}</span>
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Contact:</span>
                      <span className="font-medium dark:text-white">{item.contactEmail}</span>
                    </div>
                    {item.contactPhone && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Phone:</span>
                        <span className="font-medium dark:text-white">{item.contactPhone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-2">
                  <a
                    href={`mailto:${item.contactEmail}?subject=Regarding your ${item.type} item: ${item.title}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Contact
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`${item.title} - ${item.description} - Contact: ${item.contactEmail}`);
                      alert('Item details copied to clipboard!');
                    }}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      )}
    </div>
  );
}
