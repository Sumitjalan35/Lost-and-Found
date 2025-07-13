import LostItemForm from "../components/LostItemForm";

export default function ReportLost() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Report Lost Item
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Help us find your lost item by providing detailed information. 
            Your report will be automatically shared with the college community via email.
          </p>
        </div>
        <LostItemForm />
      </div>
    </div>
  );
}
