import { test, expect } from '@playwright/test';
const testResultPath = 'test-results';
test('test', async ({ page }) => {
  await page.goto('https://finance.naver.com/sise/sise_index.naver?code=KOSPI');
  await page.getByText('월', { exact: true }).click();
  await page.locator('.ciq-chart-area').screenshot({ path: `./${testResultPath}/KOSPI_monthly.png` })

  await page.goto('https://finance.naver.com/sise/sise_index.naver?code=KOSDAQ');
  await page.getByText('월', { exact: true }).click();
  await page.locator('.ciq-chart-area').screenshot({ path: `./${testResultPath}/KOSDAQ_monthly.png` })
});