import { test, expect } from '@playwright/test';
const testResultPath = 'test-results';
test('test', async ({ page }) => {
  await page.goto('https://finance.naver.com/sise/sise_index.naver?code=KOSPI');
  await page.getByText('월', { exact: true }).click();
  await page.waitForTimeout(1000);
  await page.locator('.ciq-chart-area').screenshot({ path: `./${testResultPath}/KOSPI_monthly.png` })

  await page.goto('https://finance.naver.com/sise/sise_index.naver?code=KOSDAQ');
  await page.getByText('월', { exact: true }).click();
  await page.waitForTimeout(1000);
  await page.locator('.ciq-chart-area').screenshot({ path: `./${testResultPath}/KOSDAQ_monthly.png` })
});

test('finviz home', async({page}) => {
  page.setViewportSize({ width: 1920, height: 1920 })
  try {
    page.goto('https://finviz.com/');
    await page.waitForTimeout(10000);
    page.locator('.fv-container').screenshot({ path: `./${testResultPath}/finviz-home.png` })
    await page.waitForTimeout(5000);
  } catch (error) {
    // finviz쪽에서 크롤링을 막은듯해서 state load가 안되는듯 하여 임시처리
  }
})
