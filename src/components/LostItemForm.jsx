import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { db, storage } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { format } from "date-fns";
import toast from "react-hot-toast";

export default function LostItemForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    dateLost: "",
    timeLost: "",
    contactEmail: "",
    contactPhone: "",
    reward: ""
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    maxSize: 5242880 // 5MB
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateCollegeEmail = (email) => {
    const envDomain = import.meta.env.VITE_COLLEGE_DOMAIN;
    if (envDomain && envDomain.trim() !== "") {
      // Allow both with and without @
      const domain = envDomain.startsWith("@") ? envDomain : `@${envDomain}`;
      return email.toLowerCase().endsWith(domain.toLowerCase());
    }
    // Fallback to default list
    const collegeDomains = [
      '.edu',
      'college.edu',
      'university.edu',
      'institute.edu'
    ];
    return collegeDomains.some(domain => email.toLowerCase().includes(domain));
  };

  const sendEmailNotification = async (itemData) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemData,
          type: 'lost'
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send email notification');
      }
    } catch (error) {
      console.error('Email notification error:', error);
      toast.error('Item saved but email notification failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateCollegeEmail(formData.contactEmail)) {
      toast.error('Please use your college email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      let imageUrl = null;
      
      // Upload image if provided
      if (image) {
        try {
          const imageRef = ref(storage, `lost-items/${Date.now()}-${image.name}`);
          const snapshot = await uploadBytes(imageRef, image);
          imageUrl = await getDownloadURL(snapshot.ref);
        } catch (uploadError) {
          console.error('Image upload error:', uploadError);
          toast.error('Failed to upload image. Please try again or submit without image.');
          setIsSubmitting(false);
          return;
        }
      }

      // Create item data
      const itemData = {
        ...formData,
        imageUrl,
        status: 'lost',
        createdAt: Timestamp.now(),
        dateReported: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        isActive: true
      };

      // Save to Firestore
      try {
        const docRef = await addDoc(collection(db, "lostItems"), itemData);
        
        // Send email notification
        await sendEmailNotification({
          ...itemData,
          id: docRef.id
        });

        // Reset form
        setFormData({
          title: "",
          description: "",
          category: "",
          location: "",
          dateLost: "",
          timeLost: "",
          contactEmail: "",
          contactPhone: "",
          reward: ""
        });
        setImage(null);
        setImagePreview(null);
        
        toast.success('Lost item reported successfully! Email notification sent to college community.');
      } catch (firestoreError) {
        console.error('Firestore error:', firestoreError);
        toast.error('Failed to save item. Please check your Firebase configuration.');
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Report Lost Item</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Item Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., iPhone 13, Black Backpack"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Describe the item in detail (color, brand, size, distinctive features, etc.)"
          />
        </div>

        {/* Location and Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location Lost *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., Library, Cafeteria, Parking Lot A"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date Lost *
            </label>
            <input
              type="date"
              name="dateLost"
              value={formData.dateLost}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Time and Reward */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Time Lost (Approximate)
            </label>
            <input
              type="time"
              name="timeLost"
              value={formData.timeLost}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Reward (Optional)
            </label>
            <input
              type="text"
              name="reward"
              value={formData.reward}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="e.g., $50, Coffee, etc."
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              College Email *
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="yourname@college.edu"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Must be a college email address</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Item Photo (Optional)
          </label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-blue-500 bg-blue-50 dark:border-blue-600 dark:bg-blue-900' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
          >
            <input {...getInputProps()} />
            {imagePreview ? (
              <div>
                <img src={imagePreview} alt="Preview" className="max-w-xs mx-auto mb-2 rounded" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Click or drag to replace image</p>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  {isDragActive ? 'Drop the image here' : 'Drag & drop an image here, or click to select'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Max size: 5MB</p>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-md font-medium transition-colors ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed dark:bg-gray-600'
                : 'bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Report Lost Item'}
          </button>
        </div>
      </form>
    </div>
  );
}
