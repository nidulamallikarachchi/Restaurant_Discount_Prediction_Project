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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8">
      <header className="mb-8">
        <h1 className="text-4xl text-center font-extrabold text-blue-800">Admin Dashboard</h1>
      </header>

      <div className="max-w-md mx-auto mb-8 bg-white p-4 rounded shadow">
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
