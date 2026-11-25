// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import App from './App';

beforeEach(() => {
  window.history.replaceState({}, '', '#inicio');
});

afterEach(cleanup);

describe('App navigation', () => {
  it('opens the route encoded in the URL hash', () => {
    window.history.replaceState({}, '', '#guia');
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'Guia de consulta.' })).toBeTruthy();
    expect(document.title).toBe('Guia de consulta — Beyond Companion');
  });

  it('updates the URL and content when a navigation item is selected', () => {
    render(<App />);

    const navigation = screen.getByRole('navigation', { name: 'Navegação principal' });
    fireEvent.click(within(navigation).getByRole('button', { name: /Criar um Hero/ }));

    expect(window.location.hash).toBe('#criar-heroi');
    expect(screen.getByRole('heading', { level: 1, name: 'Crie seu Hero.' })).toBeTruthy();
  });

  it('falls back to the overview for an unknown hash', () => {
    window.history.replaceState({}, '', '#rota-inexistente');
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: /O universo é maior/ })).toBeTruthy();
  });
});
