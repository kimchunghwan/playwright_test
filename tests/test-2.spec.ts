import { test, expect } from "@playwright/test";

const testResultPath = "test-results";
test("kospi, kosdaq", async ({ page }) => {
  await page.goto("https://finance.naver.com/sise/sise_index.naver?code=KOSPI");
  await page.getByText("월", { exact: true }).click();
  await page.waitForTimeout(1000);
  await page
    .locator(".ciq-chart-area")
    .screenshot({ path: `./${testResultPath}/KOSPI_monthly.png` });

  await page.goto(
    "https://finance.naver.com/sise/sise_index.naver?code=KOSDAQ"
  );
  await page.getByText("월", { exact: true }).click();
  await page.waitForTimeout(1000);
  await page
    .locator(".ciq-chart-area")
    .screenshot({ path: `./${testResultPath}/KOSDAQ_monthly.png` });
});

const finvizCapture = async (
  page: any,
  url: string,
  path: string,
  locator: string
) => {
  page.setViewportSize({ width: 1920, height: 1920 });
  try {
    page.goto(url).catch((e) => {});
    await page.waitForTimeout(5000);
    page
      .locator(locator)
      .screenshot({ path })
      .catch((e) => {});
    await page.waitForTimeout(5000);
  } catch (error) {
    // finviz쪽에서 크롤링을 막은듯해서 state load가 안되는듯 하여 임시처리
  }
};

test("finviz home", async ({ page }) => {
  await finvizCapture(
    page,
    "https://finviz.com/",
    `./${testResultPath}/finviz-home.png`,
    ".fv-container"
  );
});

test.describe("finviz symbols", () => {
  const symbols = ["TSLA", "PLTR", "ADBE", "SNOW", "QQQ", "SOXX"];
  for (const symbol of symbols) {
    test(`finviz ${symbol}`, async ({ page }) => {
      await finvizCapture(
        page,
        `https://finviz.com/quote.ashx?t=${symbol}&p=d`,
        `./${testResultPath}/finviz-${symbol}.png`,
        "#chart"
      );
    });
  }
});
