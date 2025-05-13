import { useEffect, useState } from 'react';
import api from '../api';

function DiscountBrowser() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/user/active-discounts')
      .then(res => {
        console.log('💡 API Response:', res.data);
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          console.warn('Expected array but got:', res.data);
          setData([]);
        }
      })
      .catch(err => {
        console.error('❌ Error fetching discounts:', err);
        alert("Failed to load discounts");
      });
  }, []);

  if (!Array.isArray(data) || data.length === 0) {
    return <div className="text-center mt-10 text-gray-500">No active discounts today.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Today’s Restaurant Discounts</h2>
      <div className="space-y-6">
        {data.map((restaurant) => (
          <div key={restaurant.restaurant_id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {restaurant.restaurant_name} (ID: {restaurant.restaurant_id})
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(restaurant.active_discounts)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([hour, discount]) => (
                  <div
                    key={hour}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {hour}:00 → {discount}%
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiscountBrowser;
