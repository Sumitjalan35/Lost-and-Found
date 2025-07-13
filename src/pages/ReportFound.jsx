import FoundItemForm from "../components/FoundItemForm";

export default function ReportFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Report Found Item
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Help reunite lost items with their owners by reporting found items. 
            Your report will be automatically shared with the college community via email.
          </p>
        </div>
        <FoundItemForm />
      </div>
    </div>
  );
} 