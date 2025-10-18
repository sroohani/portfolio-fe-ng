export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { execSync } = await import("child_process");

    try {
      execSync(
        "PLAYWRIGHT_BROWSERS_PATH=/root/.cache/ms-playwright npx playwright install chromium",
        { stdio: "inherit" }
      );
    } catch (error) {
      console.warn(
        "Playwright install at startup failed or already done.",
        error
      );
    }
  }
}
