// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import CharacterBuilder from './CharacterBuilder';

afterEach(cleanup);

describe('CharacterBuilder UI', () => {
  it('includes species, path, Archetype and condition details in the printable sheet', () => {
    render(<CharacterBuilder />);

    const printable = screen.getByRole('region', { name: 'Ficha de personagem para impressão' });

    expect(within(printable).getByText('Songtide Mapping')).toBeTruthy();
    expect(within(printable).getByText('Cadence Fixation')).toBeTruthy();
    expect(within(printable).getByText('Bônus do Archetype')).toBeTruthy();
    expect(within(printable).getByText('+2 Physical damage em todos os Melee Attacks.')).toBeTruthy();
    expect(within(printable).getByText('Short Fuse')).toBeTruthy();
    expect(within(printable).getByText('□ Tired')).toBeTruthy();
    expect(within(printable).getByText('□ Wounded')).toBeTruthy();
    expect(within(printable).getByText('□ Defeated')).toBeTruthy();
    expect(within(printable).getByText('Omni Die')).toBeTruthy();
  });

  it('shows effective attributes separately from purchased base attributes', () => {
    render(<CharacterBuilder />);

    fireEvent.change(screen.getByLabelText('Espécie'), { target: { value: 'galvan' } });
    fireEvent.click(screen.getByLabelText(/Hyper-Cognition/));

    const liveAttributes = screen.getByRole('group', {
      name: 'Atributos efetivos após bônus de Aptitudes',
    });
    expect(within(liveAttributes).getByText('Mind')).toBeTruthy();
    expect(within(liveAttributes).getByText('+3')).toBeTruthy();

    const printable = screen.getByRole('region', { name: 'Ficha de personagem para impressão' });
    const mindLabel = within(printable).getByText('Mind (MND)');
    expect(mindLabel.parentElement?.textContent).toContain('+0 base → +3 efetivo');
  });

  it('updates the PAX progress indicator when an attribute is purchased', () => {
    render(<CharacterBuilder />);

    fireEvent.change(screen.getByRole('spinbutton', { name: /Agility/ }), {
      target: { value: '3' },
    });

    expect(screen.getByRole('progressbar').getAttribute('aria-valuetext'))
      .toBe('9 de 30 PAX utilizados');
  });

  it('shows the Prodigy Hero Point bonus in the character sheet', () => {
    render(<CharacterBuilder />);

    fireEvent.change(screen.getByLabelText('Archetype'), {
      target: { value: 'prodigy' },
    });

    const printable = screen.getByRole('region', { name: 'Ficha de personagem para impressão' });
    const heroPointsLabel = within(printable).getByText('Hero Points / Episode');
    expect(heroPointsLabel.parentElement?.textContent).toContain('+1');
  });
});
