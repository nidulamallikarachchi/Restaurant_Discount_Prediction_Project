import { useState, useEffect } from 'react';
import DiscountManager from './components/DiscountManager';

function App() {
  const [restaurantId, setRestaurantId] = useState(
    localStorage.getItem('restaurant_id') || '0001'
  );

  useEffect(() => {
    localStorage.setItem('restaurant_id', restaurantId);
  }, [restaurantId]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <h1 className="text-3xl text-center font-bold text-blue-700 mb-4">Admin Dashboard</h1>

      {/* Simulated Login Dropdown */}
      <div className="max-w-md mx-auto text-center mb-6">
        <label className="block mb-2 font-medium text-gray-700">Select Restaurant</label>
        <select
          value={restaurantId}
          onChange={(e) => setRestaurantId(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="0001">Tasty Food</option>
          <option value="0002">Fat Burger</option>
          {/* Add more options as you simulate more */}
        </select>
      </div>

      <DiscountManager restaurantId={restaurantId} />
    </div>
  );
}

export default App;
