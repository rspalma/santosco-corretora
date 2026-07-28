import { copyFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const nextBin = require.resolve("next/dist/bin/next");

const result = spawnSync(process.execPath, [nextBin, "build"], {
  cwd: root,
  env: { ...process.env, STATIC_EXPORT: "true" },
  stdio: "inherit",
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

await mkdir(resolve(root, "out"), { recursive: true });
await copyFile(
  resolve(root, "deployment/apache/.htaccess"),
  resolve(root, "out/.htaccess"),
);

console.log("\nExportação estática concluída em ./out com .htaccess incluído.");
