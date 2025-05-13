import { useEffect, useState } from 'react';
import api from '../api';

const restaurantId = '0001';

function DiscountManager() {
  const [data, setData] = useState(null);
  const [accepted, setAccepted] = useState({});

  useEffect(() => {
    api.get(`/discounts/${restaurantId}`)
      .then(res => {
        setData(res.data);
        setAccepted(res.data.accepted_discounts || {});
      })
      .catch(() => alert("Failed to fetch discounts"));
  }, []);

  const toggle = (hour) => {
    setAccepted(prev => ({
      ...prev,
      [hour]: !prev[hour]
    }));
  };

  const submit = () => {
    api.post('/discounts/respond', {
      restaurant_id: restaurantId,
      accepted_discounts: accepted
    }).then(() => alert("Submitted!"))
      .catch(() => alert("Failed to submit"));
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>Discounts for {restaurantId}</h2>
      <ul>
        {Object.keys(data.discounts).map(hour => (
          <li key={hour}>
            {hour}:00 → {data.discounts[hour]}%
            <input
              type="checkbox"
              checked={!!accepted[hour]}
              onChange={() => toggle(hour)}
            />
          </li>
        ))}
      </ul>
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default DiscountManager;
