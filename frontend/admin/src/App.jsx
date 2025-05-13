import { useState, useEffect } from 'react';
import DiscountManager from './components/DiscountManager';
import api from './api';

function App() {
  const [restaurantId, setRestaurantId] = useState(
    localStorage.getItem('restaurant_id') || ''
  );
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    api.get('/admin/restaurants')
      .then(res => {
        setRestaurantList(res.data);
        if (!restaurantId && res.data.length > 0) {
          const first = res.data[0].restaurant_id;
          setRestaurantId(first);
          localStorage.setItem('restaurant_id', first);
        }
      });
  }, []);

  useEffect(() => {
    if (restaurantId) {
      localStorage.setItem('restaurant_id', restaurantId);
    }
  }, [restaurantId]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <h1 className="text-3xl text-center font-bold text-blue-700 mb-4">Admin Dashboard</h1>

      <div className="max-w-md mx-auto text-center mb-6">
        <label className="block mb-2 font-medium text-gray-700">Select Restaurant</label>
        <select
          value={restaurantId}
          onChange={(e) => setRestaurantId(e.target.value)}
          className="border p-2 rounded w-full"
        >
          {restaurantList.map(r => (
            <option key={r.restaurant_id} value={r.restaurant_id}>
              {r.restaurant_name}
            </option>
          ))}
        </select>
      </div>

      {restaurantId && <DiscountManager restaurantId={restaurantId} />}
    </div>
  );
}

export default App;
