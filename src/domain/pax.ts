export type PaxPurchase = {
  id: string;
  label: string;
  cost: number;
  source: 'attribute' | 'energy' | 'aptitude' | 'skill' | 'trait' | 'gear';
  free?: boolean;
};

export type PaxSummary = {
  spent: number;
  remaining: number;
  valid: boolean;
};

export function summarizePax(purchases: readonly PaxPurchase[], budget = 30): PaxSummary {
  const spent = purchases.reduce((total, purchase) => {
    if (!Number.isFinite(purchase.cost) || purchase.cost < 0) {
      throw new RangeError(`Custo inválido em: ${purchase.label}`);
    }
    return total + (purchase.free ? 0 : purchase.cost);
  }, 0);

  return {
    spent,
    remaining: budget - spent,
    valid: spent <= budget,
  };
}
