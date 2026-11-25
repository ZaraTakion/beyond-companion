import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];
const mainRoutes = [
  { hash: '#inicio', label: 'visão geral', navigationLabel: /Visão geral/ },
  { hash: '#guia', label: 'guia de consulta', navigationLabel: /Guia de consulta/ },
  { hash: '#criar-heroi', label: 'construtor de personagem', navigationLabel: /Criar um Hero/ },
];

async function openRoute(
  page: import('@playwright/test').Page,
  route: typeof mainRoutes[number],
  viewport: string,
) {
  // The app animates page entry. Honor reduced motion so contrast is measured
  // after the page reaches its stable, fully opaque presentation.
  await page.emulateMedia({ reducedMotion: 'reduce' });

  // A unique query forces a fresh document for each hash so the initial tab
  // state and the hash agree before axe inspects the rendered page.
  await page.goto(`/?a11y=${encodeURIComponent(viewport + '-' + route.label)}${route.hash}`);

  const navigation = page.getByRole('navigation', { name: 'Navegação principal' });
  await expect(
    navigation.getByRole('button', { name: route.navigationLabel }),
    `A rota ${route.hash} deve marcar sua própria navegação como ativa.`,
  ).toHaveAttribute('aria-current', 'page');
}

async function collectAccessibilityViolations(
  page: import('@playwright/test').Page,
  context: string,
) {
  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();
  return results.violations.map((violation) => ({
    context,
    id: violation.id,
    impact: violation.impact,
    description: violation.description,
    nodes: violation.nodes.map((node) => ({
      target: node.target,
      summary: node.failureSummary,
    })),
  }));
}

test('passes automated WCAG 2.1 AA checks on all main sections', async ({ page }) => {
  const violations: Array<Record<string, unknown>> = [];

  for (const route of mainRoutes) {
    await openRoute(page, route, 'desktop');
    violations.push(...await collectAccessibilityViolations(page, route.label));
  }

  expect(
    violations,
    `Violações WCAG 2.1 AA encontradas nas páginas principais:\n${JSON.stringify(violations, null, 2)}`,
  ).toEqual([]);
});

test('passes automated WCAG 2.1 AA checks on narrow mobile layouts', async ({ page }) => {
  const violations: Array<Record<string, unknown>> = [];

  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });

    for (const route of mainRoutes) {
      await openRoute(page, route, `mobile-${width}px`);
      violations.push(...await collectAccessibilityViolations(
        page,
        `${route.label} mobile ${width}px`,
      ));
    }
  }

  expect(
    violations,
    `Violações WCAG 2.1 AA em layouts mobile:\n${JSON.stringify(violations, null, 2)}`,
  ).toEqual([]);
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

test('supports keyboard navigation between the main sections', async ({ page }) => {
  await page.goto('/?a11y=keyboard#inicio');
  const navigation = page.getByRole('navigation', { name: 'Navegação principal' });
  const overview = navigation.getByRole('button', { name: /Visão geral/ });
  const guide = navigation.getByRole('button', { name: /Guia de consulta/ });

  await overview.focus();
  await page.keyboard.press('Tab');
  await expect(guide).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/#guia$/);
  await expect(page.getByRole('heading', {
    level: 1,
    name: 'Guia de consulta.',
  })).toBeVisible();
});

test('keeps the layout free of horizontal overflow at common breakpoints', async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`/?a11y=overflow-${width}#criar-heroi`);

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
