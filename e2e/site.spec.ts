import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('navigates between the overview, guide and character builder', async ({ page }) => {
  const navigation = page.getByRole('navigation', { name: 'Navegação principal' });

  await expect(page).toHaveTitle(/Visão geral — Beyond Companion/);
  await expect(page.getByRole('heading', {
    name: 'Feito por fãs. Não é um produto oficial.',
  })).toBeVisible();

  await navigation.getByRole('button', { name: /Guia de consulta/ }).click();
  await expect(page).toHaveURL(/#guia$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Guia de consulta.' })).toBeVisible();

  await navigation.getByRole('button', { name: /Criar um Hero/ }).click();
  await expect(page).toHaveURL(/#criar-heroi$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Crie seu Hero.' })).toBeVisible();
});

test('searches the guide catalog and changes reference sections', async ({ page }) => {
  await page.getByRole('navigation', { name: 'Navegação principal' })
    .getByRole('button', { name: /Guia de consulta/ }).click();

  const search = page.getByRole('searchbox', { name: 'Buscar na seção atual' });
  await search.fill('Necrofrigian');
  await expect(page.getByRole('heading', { name: 'Necrofrigian' })).toBeVisible();

  await page.getByRole('button', { name: 'Archetypes' }).click();
  await expect(search).toHaveValue('');
  await expect(page.getByRole('heading', { name: 'Brawler' })).toBeVisible();
});

test('updates the species dossier when another species is selected', async ({ page }) => {
  const speciesIndex = page.getByRole('navigation', { name: 'Índice de espécies' });
  await speciesIndex.getByRole('button', { name: /Galvan/ }).click();

  await expect(page.getByRole('heading', { name: 'Galvan' })).toBeVisible();
  await expect(page.getByText('Micro-Diagnostic')).toBeVisible();
  await expect(page.getByText('Physical Fragility')).toBeVisible();
});

test('updates effective attributes and the printable character sheet', async ({ page }) => {
  await page.getByRole('navigation', { name: 'Navegação principal' })
    .getByRole('button', { name: /Criar um Hero/ }).click();

  await page.getByLabel('Espécie', { exact: true }).selectOption('galvan');
  await page.getByLabel(/Hyper-Cognition/).check();

  const effectiveAttributes = page.getByRole('group', {
    name: 'Atributos efetivos após bônus de Aptitudes',
  });
  await expect(effectiveAttributes.getByText('Mind')).toBeVisible();
  await expect(effectiveAttributes.getByText('+3')).toBeVisible();

  const printable = page.getByRole('region', { name: 'Ficha de personagem para impressão' });
  await expect(printable.getByText(/Micro-Diagnostic/)).toBeVisible();
  await expect(printable.getByText(/Attributes efetivos/)).toBeVisible();
  await expect(printable.getByText('Omni Die')).toBeVisible();

  await page.emulateMedia({ media: 'print' });
  await expect(printable).toBeVisible();
});

test('exports a character as a versioned JSON file', async ({ page }) => {
  await page.getByRole('navigation', { name: 'Navegação principal' })
    .getByRole('button', { name: /Criar um Hero/ }).click();

  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Exportar JSON' }).click();
  const download = await downloadEvent;

  expect(download.suggestedFilename()).toBe('beyond-companion-hero.json');
});

test('keeps the mobile layout within the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();

  await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible();
  await page.getByRole('navigation', { name: 'Navegação principal' })
    .getByRole('button', { name: /Criar um Hero/ }).click();

  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
  }));

  expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
});
