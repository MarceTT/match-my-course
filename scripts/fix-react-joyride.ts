import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const file = join(process.cwd(), "node_modules/react-joyride/dist/index.mjs");

if (!existsSync(file)) {
  console.error("⚠️  react-joyride no encontrado. Saltando parche.");
  process.exit(0);
}

let content = readFileSync(file, "utf-8");

// Si ya no hay las APIs antiguas, no hacemos nada
if (!content.includes("unstable_renderSubtreeIntoContainer")) {
  console.log("ℹ️  react-joyride ya está parchado o no requiere fix.");
  process.exit(0);
}

// 1) Eliminar TODAS las referencias previas a unmountComponentAtNode y unstable_renderSubtreeIntoContainer
content = content.replace(/unmountComponentAtNode/g, "_removed_unmountComponentAtNode");
content = content.replace(/unstable_renderSubtreeIntoContainer/g, "_removed_unstableRender");

// 2) Reemplazar la importación de react-dom y añadir nuestras funciones seguras
content = content.replace(
  /import\s*\{[^}]+\}\s*from\s*['"]react-dom['"];/,
  `import { createPortal } from 'react-dom';

// React 19 patch: reemplazo seguro de APIs eliminadas
function unmountComponentAtNode(node) {
  if (node && node.parentNode) {
    node.parentNode.removeChild(node);
  }
}

function unstable_renderSubtreeIntoContainer(parentComponent, element, container, callback) {
  const portal = createPortal(element, container);
  if (typeof callback === 'function') {
    callback(portal);
  }
  return portal;
}`
);

writeFileSync(file, content, "utf-8");
console.log("✅ react-joyride 2.9.3 parchado correctamente (sin duplicados).");