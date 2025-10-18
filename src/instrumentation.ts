export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { execSync } = await import("child_process");

    console.log(
      `Playwright browsers path: ${process.env.PLAYWRIGHT_BROWSERS_PATH}`
    );

    try {
      execSync("npx playwright install", { stdio: "inherit" });
    } catch (error) {
      console.warn(
        "Playwright install at startup failed or already done.",
        error
      );
    }
  }
}
