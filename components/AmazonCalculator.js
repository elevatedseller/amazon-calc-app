// File: components/AmazonCalculator.js (updated)
import { useState } from 'react';

export default function AmazonCalculator() {
  const [formData, setFormData] = useState({
    productName: 'Fishing Lure',
    productCategory: 'sports_outdoors',
    sellingPrice: 19.99,
    productCost: 2.75,
    shippingToAmazon: 0.45,
    fbaFee: 1.87,
    storageFee: 0.02
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: isNaN(value) ? value : parseFloat(value) }));
  };

  const calculateProfit = async () => {
    try {
      const res = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Calculation failed');
      setResult(json);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      {/* form fields as before */}
      <button onClick={calculateProfit}>Calculate via API</button>
      {error && <p className="text-red-500">{error}</p>}
      {result && (
        <div>
          <p><strong>Referral Fee ({result.referralPercent}%):</strong> £{result.referralFee.toFixed(2)}</p>
          <p><strong>Profit:</strong> £{result.profit.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
