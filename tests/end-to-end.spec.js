const { test, expect } = require("@playwright/test");

const URL = "http://127.0.0.1:5500/FrontEnd/src/index.html";

test("Check for Title", async ({ page }) => {
  await page.goto(URL);

  const title = await page.title();

  expect(title).toBe("Skill Trade");
});
