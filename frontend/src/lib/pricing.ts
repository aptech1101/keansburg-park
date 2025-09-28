export const BASE_PRICE = 10;
export const WEEKEND_SURCHARGE = 0.2; // $12 cuối tuần

export function isWeekend(dateIso: string): boolean {
  if (!dateIso) return false;
  const day = new Date(dateIso).getDay();
  return day === 0 || day === 6;
}

export function unitPriceOf(dateIso: string): number {
  const base = BASE_PRICE;
  return isWeekend(dateIso) ? base * (1 + WEEKEND_SURCHARGE) : base;
}

export const GROUP_DISCOUNT_THRESHOLD = 10;
export const GROUP_DISCOUNT_RATE = 0.1;

export function computeDiscount(subtotal: number, totalQty: number): number {
  if (!Number.isFinite(subtotal) || subtotal <= 0) return 0;
  return totalQty >= GROUP_DISCOUNT_THRESHOLD
    ? subtotal * GROUP_DISCOUNT_RATE
    : 0;
}


