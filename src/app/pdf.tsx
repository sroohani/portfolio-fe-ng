"use server";

import PDF from "@/app/(about)/resume/PDF";
import path from "node:path";
import fs from "node:fs";
import { Buffer } from "node:buffer";
import { parse } from "node-html-parser";
import { resumeFullPath } from "@/server-constants";

// Source: https://medium.com/@harish.siri/pdf-generator-in-nextjs-fcaea81404a4
const imageToBase64 = async (url: string) => {
  try {
    const buffer = Buffer.from(fs.readFileSync(url));

    return `data:image/jpeg;base64,${buffer.toString("base64")}`;
  } catch (error) {
    console.error("Error loading image:", error);

    return "";
  }
};

const replaceImagesWithBase64 = async (html: string) => {
  const root = parse(html);

  const images = root.querySelectorAll("img");

  for (const img of images) {
    const src = img.getAttribute("src");
    if (src) {
      img.setAttribute(
        "src",
        await imageToBase64(path.join(process.cwd(), "public", src))
      );
    }
  }

  return root.toString();
};

const isTailwindCss = (cssContent: string) => {
  return /(?:\.\w+)?\b(container|flex|grid|text-xl|p-4|m-2)\b/.test(cssContent);
};

const getGlobalsCss = () => {
  const globalsCssPath = path.resolve(process.cwd(), "src/app/globals.css");
  return fs.readFileSync(globalsCssPath, "utf-8");
};

const getTailwindCss = () => {
  const mode = process.env.NODE_ENV || "production";
  let tailwindCss = "";
  const tailwindCssPath = path.resolve(
    process.cwd(),
    ".next/static/css/app/layout.css"
  );

  if (mode == "development") {
    tailwindCss = fs.existsSync(tailwindCssPath)
      ? fs.readFileSync(tailwindCssPath, "utf-8")
      : "";
  } else {
    const cssDir = path.resolve(process.cwd(), ".next/static/css");
    const cssFiles = fs.readdirSync(cssDir);
    for (const file of cssFiles) {
      if (file.endsWith(".css")) {
        const filePath = path.join(cssDir, file);
        const cssContent = fs.readFileSync(filePath, "utf-8");

        if (isTailwindCss(cssContent)) {
          tailwindCss = cssContent;
          break;
        }
      }
    }
  }

  return tailwindCss;
};

export const generatePDF = async () => {
  const { chromium } = await import("playwright");

  const { renderToString } = await import("react-dom/server");
  const htmlString = renderToString(<PDF />);
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const globalsCss = getGlobalsCss();
  const tailwindCss = getTailwindCss();

  const htmlWithBase64 = await replaceImagesWithBase64(htmlString);
  const htmlWithStyles = `
  <html>
  <head>
  <style>${globalsCss} ${tailwindCss}</style>
  </head>
  <body>${htmlWithBase64}</body>
  </html>

      `;

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.emulateMedia({ media: "screen" });
  await page.setContent(htmlWithStyles, { waitUntil: "load" });
  await page.pdf({
    path: resumeFullPath,
    format: "A4",
    margin: {
      top: "48px",
      bottom: "48px",
    },
  });
  await browser.close();
};
