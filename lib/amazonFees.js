// File: lib/amazonFees.js
export const amazonCategories = [
  /* full amazonCategories array from component */
];

export function getReferralFeeDetails(price, categoryValue) {
  let category = amazonCategories.find(c => c.value === categoryValue);
  if (!category) category = amazonCategories.find(c => c.value === 'everything_else');

  let percent = category.simplePercent;
  let fee = price * (percent / 100);
  if (category.feeType === 'tiered' && category.tiers) {
    const tier = category.tiers.find(t => (t.upTo && price <= t.upTo) || (t.over && price > t.over)) || category.tiers.slice(-1)[0];
    percent = tier.percent;
    fee = price * (percent / 100);
  }
  if (category.feeType === 'tiered_by_fulfillment' && category.fbaTiers) {
    const tier = category.fbaTiers.find(t => (t.upTo && price <= t.upTo) || (t.over && price > t.over)) || category.fbaTiers.slice(-1)[0];
    percent = tier.percent;
    fee = price * (percent / 100);
  }
  if (category.feeType === 'tiered_by_fulfillment_price_sensitive') {
    percent = price > 40 ? category.fbaOver40Percent : category.generalPercent;
    fee = price * (percent / 100);
  }
  if (category.minFee !== undefined) fee = Math.max(fee, category.minFee);
  return { percent, fee };
}
