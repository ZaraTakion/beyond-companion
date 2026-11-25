// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import SpeciesScanner from './SpeciesScanner';

afterEach(cleanup);

describe('SpeciesScanner UI', () => {
  it('selects a species and updates its dossier', () => {
    render(<SpeciesScanner />);

    const galvanButton = screen.getByRole('button', { name: /Galvan/ });
    fireEvent.click(galvanButton);

    expect(galvanButton.getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByRole('heading', { name: 'Galvan' })).toBeTruthy();
    expect(screen.getAllByText('Galvan Prime')).toHaveLength(2);
    expect(screen.getByText('Micro-Diagnostic')).toBeTruthy();
    expect(screen.getByText('Physical Fragility')).toBeTruthy();
  });

  it('keeps exactly one species selected', () => {
    render(<SpeciesScanner />);

    const auguravian = screen.getByRole('button', { name: /Auguravian/ });
    const necrofrigian = screen.getByRole('button', { name: /Necrofrigian/ });

    fireEvent.click(necrofrigian);

    expect(necrofrigian.getAttribute('aria-pressed')).toBe('true');
    expect(auguravian.getAttribute('aria-pressed')).toBe('false');
  });
});
