// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import QuickReference from './QuickReference';

afterEach(cleanup);

describe('QuickReference UI', () => {
  it('renders all eleven catalog sections', () => {
    render(<QuickReference />);

    const navigation = screen.getByRole('navigation', { name: 'Seções do Guia Rápido' });
    expect(within(navigation).getAllByRole('button')).toHaveLength(11);
  });

  it('filters the active section and clears the search', () => {
    render(<QuickReference />);

    const search = screen.getByRole('searchbox', { name: 'Buscar na seção atual' });
    fireEvent.change(search, { target: { value: 'Necrofrigian' } });

    expect(screen.getByRole('heading', { name: 'Necrofrigian' })).toBeTruthy();

    fireEvent.change(search, { target: { value: 'registro que não existe' } });
    expect(screen.getByRole('status').textContent).toContain('Nenhum registro desta seção');

    fireEvent.click(screen.getByRole('button', { name: 'Limpar busca' }));
    expect(screen.getByRole('heading', { name: 'Auguravian' })).toBeTruthy();
  });

  it('changes catalog section and resets the previous search term', () => {
    render(<QuickReference />);

    const search = screen.getByRole('searchbox', { name: 'Buscar na seção atual' });
    fireEvent.change(search, { target: { value: 'Necrofrigian' } });
    fireEvent.click(screen.getByRole('button', { name: 'Archetypes' }));

    expect((screen.getByRole('searchbox') as HTMLInputElement).value).toBe('');
    expect(screen.getByRole('heading', { name: 'Brawler' })).toBeTruthy();
  });
});
