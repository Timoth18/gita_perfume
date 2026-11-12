import "server-only";
import fs from "node:fs";
import path from "node:path";

// Photos are picked up by FILENAME at build time. Drop a file in /public/images/... and redeploy.
// No code change needed; anything missing falls back to the drawn placeholder.
const PUBLIC = path.join(process.cwd(), "public");
const EXTS = ["webp", "jpg", "jpeg", "png", "avif"];

function find(dir: string, base: string): string | undefined {
  for (const ext of EXTS) {
    for (const name of [`${base}.${ext}`, `${base}.${ext.toUpperCase()}`]) {
      if (fs.existsSync(path.join(PUBLIC, dir, name))) return `/${dir}/${name}`;
    }
  }
}

function list(dir: string): string[] {
  const abs = path.join(PUBLIC, dir);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs)
    .filter((f) => EXTS.includes(f.split(".").pop()!.toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => `/${dir}/${f}`);
}

/** Main photo first, then extra angles: <slug>.jpg, <slug>-2.jpg … <slug>-6.jpg */
export function productPhotos(slug: string): string[] {
  const main = find("images/products", slug);
  const extra = [2, 3, 4, 5, 6].map((n) => find("images/products", `${slug}-${n}`)).filter(Boolean) as string[];
  return main ? [main, ...extra] : extra;
}

export const categoryPhoto = (slug: string) => find("images/categories", slug);
export const heroPhoto = () => find("images", "hero");
export const aboutPhoto = () => find("images", "about");
export const logoFile = () => find("images", "logo") ?? (fs.existsSync(path.join(PUBLIC, "images/logo.svg")) ? "/images/logo.svg" : undefined);

/** Warehouse / workshop gallery: every image in /public/images/facility, in filename order. */
export const facilityPhotos = () => list("images/facility");

/** Turns "02-screen-printing.jpg" into "Screen printing" for alt text and captions. */
export function captionFromFile(src: string) {
  const base = src.split("/").pop()!.replace(/\.[^.]+$/, "").replace(/^\d+[-_ ]*/, "").replace(/[-_]+/g, " ");
  return base.charAt(0).toUpperCase() + base.slice(1);
}
