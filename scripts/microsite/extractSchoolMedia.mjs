// Extracts schoolMedia from the source scripts, inline or external.
// Canada embeds it in an inline <script>, the others ship a file.
import { readFileSync, writeFileSync } from "node:fs";
import vm from "node:vm";

const literalAfter = (src, marker) => {
  const start = src.indexOf(marker);
  if (start === -1) return null;
  const open = src.indexOf("{", start);
  let depth = 0;
  for (let j = open; j < src.length; j++) {
    if (src[j] === "{") depth++;
    else if (src[j] === "}") { depth--; if (!depth) return src.slice(open, j + 1); }
  }
  return null;
};

const evaluate = (literal) => {
  const context = Object.create(null);
  vm.createContext(context);
  return vm.runInContext("(" + literal + ")", context, { timeout: 1000 });
};

const out = {};
for (const [page, file] of [
  ["irlanda", "/tmp/t2/js/irlanda_irlanda-ofertas-originales.js"],
  ["nueva-zelanda", "/tmp/t2/js/nueva-zelanda_promociones-originales.js"],
  ["canada", "/tmp/t2/canada.html"],
]) {
  const src = readFileSync(file, "utf8");
  const literal = literalAfter(src, "schoolMedia = {");
  if (!literal) { console.log(page, "— no schoolMedia"); continue; }
  out[page] = evaluate(literal);
  const photos = Object.values(out[page]).reduce((n, s) => n + (s.photos?.length ?? 0), 0);
  console.log(`${page}: ${Object.keys(out[page]).join(",")} · ${photos} fotos`);
}
writeFileSync("/tmp/t2/media.json", JSON.stringify(out, null, 2));
