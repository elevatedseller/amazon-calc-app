// File: pages/api/calculate.js
import { amazonCategories, getReferralFeeDetails } from '../../lib/amazonFees';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const {
    sellingPrice,
    productCost,
    shippingToAmazon,
    fbaFee,
    storageFee,
    productCategory
  } = req.body;

  if ([sellingPrice, productCost, shippingToAmazon, fbaFee, storageFee].some(v => typeof v !== 'number')) {
    return res.status(400).json({ error: 'Invalid input types' });
  }

  const { percent: referralPercent, fee: referralFee } = getReferralFeeDetails(sellingPrice, productCategory);
  const totalCosts = productCost + shippingToAmazon + fbaFee + storageFee + referralFee;
  const profit = sellingPrice - totalCosts;

  res.status(200).json({ referralPercent, referralFee, profit });
}