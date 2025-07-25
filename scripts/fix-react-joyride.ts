import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const file = join(process.cwd(), "node_modules/react-joyride/dist/index.mjs");

// Si no existe el archivo (dependencia no instalada), salir
if (!existsSync(file)) {
  console.error("⚠️  react-joyride no encontrado. Saltando parche.");
  process.exit(0);
}

let content = readFileSync(file, "utf-8");

// Solo aplicar si contiene las APIs eliminadas
if (!content.includes("unstable_renderSubtreeIntoContainer")) {
  console.log("ℹ️  react-joyride ya está parchado o no requiere fix.");
  process.exit(0);
}

content = content.replace(
    /import\s*\{[^}]+\}\s*from\s*['"]react-dom['"];/,
    `import { createPortal } from 'react-dom';
  
  // React 19 patch para APIs eliminadas (sin duplicar React)
  const unmountComponentAtNode = (node) => {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  };
  
  const unstable_renderSubtreeIntoContainer = (parentComponent, element, container, callback) => {
    const portal = createPortal(element, container);
    if (typeof callback === 'function') {
      callback(portal);
    }
    return portal;
  };`
  );

writeFileSync(file, content, "utf-8");
console.log("✅ react-joyride 2.9.3 parcheado para React 19.");
