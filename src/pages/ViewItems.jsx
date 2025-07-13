import ItemList from "../components/ItemList";

export default function ViewItems() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Browse Lost & Found Items
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Search through all reported lost and found items. 
            Use the filters to narrow down your search by category or status.
          </p>
        </div>
        <ItemList />
      </div>
    </div>
  );
}
