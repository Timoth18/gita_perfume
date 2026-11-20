// Builds a JS-free, relative-link copy of the static export (out/ -> preview/)
// so the mockup can be opened from any static host or straight from disk.
import fs from "node:fs";
import path from "node:path";

const src = path.resolve("out");
const dst = path.resolve("preview");
fs.rmSync(dst, { recursive: true, force: true });
fs.cpSync(src, dst, { recursive: true });

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);

for (const f of walk(dst).filter((f) => f.endsWith(".html"))) {
  const rel = path.relative(dst, f);
  const depth = rel.split(path.sep).length - 1;
  const up = depth ? "../".repeat(depth) : "";
  let h = fs.readFileSync(f, "utf8");
  // drop Next runtime scripts but keep JSON-LD
  h = h.replace(/<script(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/g, "");
  h = h.replace(/<link[^>]*rel="preload"[^>]*as="script"[^>]*\/?>/g, "");
  h = h.replace(/(href|src)="\/(?!\/)([^"#?]*)([^"]*)"/g, (_m, attr, p, rest) => {
    let target = p;
    if (!p.startsWith("_next/") && !/\.[a-z0-9]+$/i.test(p)) target = p === "" ? "index.html" : `${p}.html`;
    return `${attr}="${up}${target}${rest}"`;
  });
  h = h.replace(/(href|src)="((?:\.\.\/)*)_next\//g, '$1="$2assets/');
  fs.writeFileSync(f, h);
}
// "_"-prefixed folders are reserved on some static hosts
fs.mkdirSync(path.join(dst, "assets"), { recursive: true });
fs.cpSync(path.join(dst, "_next/static/css"), path.join(dst, "assets/static/css"), { recursive: true });
fs.rmSync(path.join(dst, "_next"), { recursive: true, force: true });
for (const f of walk(dst)) if (f.endsWith(".txt") && !f.endsWith("robots.txt")) fs.rmSync(f);
// The site lives under /id and /en; the root page just opens the Indonesian version.
fs.writeFileSync(path.join(dst, "index.html"), '<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=id.html"><a href="id.html">Bahasa Indonesia</a> · <a href="en.html">English</a>\n');
console.log("preview written to", dst);
