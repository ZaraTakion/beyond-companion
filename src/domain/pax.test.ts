import { describe, expect, it } from 'vitest';
import { summarizePax } from './pax';

describe('summarizePax', () => {
  it('soma compras pagas e mantém benefícios gratuitos fora do orçamento', () => {
    const result = summarizePax([
      { id: 'spirit', label: 'Spirit +3', cost: 9, source: 'attribute' },
      { id: 'catchphrase', label: 'Catchphrase', cost: 4, source: 'trait' },
      { id: 'versatility-skill', label: 'Skill gratuita', cost: 4, source: 'skill', free: true },
    ]);
    expect(result).toEqual({ spent: 13, remaining: 17, valid: true });
  });

  it('sinaliza orçamento excedido', () => {
    const result = summarizePax([
      { id: 'overspend', label: 'Overspend', cost: 31, source: 'aptitude' },
    ]);
    expect(result.valid).toBe(false);
    expect(result.remaining).toBe(-1);
  });

  it('rejeita custos negativos e fracionários', () => {
    expect(() => summarizePax([
      { id: 'negative', label: 'Negative cost', cost: -1, source: 'gear' },
    ])).toThrow(RangeError);
    expect(() => summarizePax([
      { id: 'fraction', label: 'Fractional cost', cost: 1.5, source: 'gear' },
    ])).toThrow(RangeError);
  });

  it('rejeita orçamentos negativos, fracionários ou não numéricos', () => {
    expect(() => summarizePax([], -1)).toThrow(RangeError);
    expect(() => summarizePax([], 30.5)).toThrow(RangeError);
    expect(() => summarizePax([], Number.NaN)).toThrow(RangeError);
  });
});
