import DiscountBrowser from './components/DiscountBrowser';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8">
      <header className="mb-8">
        <h1 className="text-4xl text-center font-extrabold text-blue-800">Customer Deals Portal</h1>
        <p className="text-center text-gray-600">Find today\'s best restaurant discounts</p>
      </header>
      <DiscountBrowser />
    </div>
  );
}

export default App;
