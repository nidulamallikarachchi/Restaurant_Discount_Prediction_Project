import {useEffect, useState} from 'react';
import api from '../api';
import toast from 'react-hot-toast';

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
            .catch(() => toast.error("Failed to fetch discounts"));
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
        })
            .then(() => toast.success("Discounts submitted!"))
            .catch(() => toast.error("Failed to submit discounts"));
    };

    if (!data) return <div className="text-center mt-10 text-gray-500">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                Discounts for Restaurant {restaurantId}
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border-b text-sm font-medium">Hour</th>
                        <th className="p-2 border-b text-sm font-medium">Discount</th>
                        <th className="p-2 border-b text-sm font-medium">Accept</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(data.discounts).sort((a, b) => Number(a) - Number(b)).map(hour => (
                        <tr key={hour} className="hover:bg-gray-50">
                            <td className="p-2 border-b text-sm">{hour}:00</td>
                            <td className="p-2 border-b text-sm">{data.discounts[hour]}%</td>
                            <td className="p-2 border-b text-sm">
                                <label
                                    className="relative inline-block w-12 h-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">

                                    <input
                                        type="checkbox"
                                        checked={!!accepted[hour]}
                                        onChange={() => toggle(hour)}
                                        className="opacity-0 w-0 h-0 peer"
                                    />
                                    <span
                                        className="absolute inset-0 bg-gray-300 peer-checked:bg-blue-600 rounded-full transition-colors duration-300"></span>
                                    <span
                                        className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 peer-checked:translate-x-6"></span>
                                </label>
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="text-center mt-6">
                <button
                    onClick={submit}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow"
                >
                    Submit Accepted Discounts
                </button>
            </div>
        </div>
    );
}

export default DiscountManager;
