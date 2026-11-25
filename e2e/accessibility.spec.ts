import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

async function expectNoAccessibilityViolations(page: import('@playwright/test').Page, context: string) {
  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
  const summary = results.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    description: violation.description,
    nodes: violation.nodes.map((node) => ({
      target: node.target,
      summary: node.failureSummary,
    })),
  }));

  expect(summary, `Violações de acessibilidade em ${context}:\n${JSON.stringify(summary, null, 2)}`)
    .toEqual([]);
}

test('passes automated WCAG 2.1 AA checks on all main sections', async ({ page }) => {
  for (const route of [
    { hash: '#inicio', label: 'visão geral' },
    { hash: '#guia', label: 'guia de consulta' },
    { hash: '#criar-heroi', label: 'construtor de personagem' },
  ]) {
    await page.goto(`/${route.hash}`);
    await expectNoAccessibilityViolations(page, route.label);
  }
});

test('passes automated WCAG 2.1 AA checks on narrow mobile layouts', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of [
    { hash: '#inicio', label: 'visão geral mobile' },
    { hash: '#criar-heroi', label: 'construtor mobile' },
  ]) {
    await page.goto(`/${route.hash}`);
    await expectNoAccessibilityViolations(page, route.label);
  }
});

test('exposes the skip link as the first keyboard focus target', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');

  const focused = await page.evaluate(() => ({
    text: document.activeElement?.textContent?.trim(),
    href: document.activeElement instanceof HTMLAnchorElement
      ? document.activeElement.getAttribute('href')
      : null,
  }));

  expect(focused).toEqual({
    text: 'Pular para o conteúdo',
    href: '#conteudo-principal',
  });
});

test('keeps the layout free of horizontal overflow at common breakpoints', async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/#criar-heroi');

    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
    }));

    expect(
      dimensions.document,
      `Overflow horizontal em ${width}px: ${JSON.stringify(dimensions)}`,
    ).toBeLessThanOrEqual(dimensions.viewport);
  }
});
