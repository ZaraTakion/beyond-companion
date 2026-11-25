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
  if (!Number.isInteger(budget) || budget < 0) {
    throw new RangeError('Orçamento PAX deve ser um inteiro não negativo.');
  }

  const spent = purchases.reduce((total, purchase) => {
    if (!Number.isInteger(purchase.cost) || purchase.cost < 0) {
      throw new RangeError(`Custo PAX inválido em: ${purchase.label}. Use um inteiro não negativo.`);
    }
    return total + (purchase.free ? 0 : purchase.cost);
  }, 0);

  return {
    spent,
    remaining: budget - spent,
    valid: spent <= budget,
  };
}
