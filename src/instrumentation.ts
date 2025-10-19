export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { execSync } = await import("child_process");

    try {
      execSync("npx puppeteer browsers install chrome", { stdio: "inherit" });
    } catch (error) {
      console.warn(
        "Puppeteer install at startup failed or already done.",
        error
      );
    }
  }
}
