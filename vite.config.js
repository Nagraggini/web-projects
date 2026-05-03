import { defineConfig } from "vite";

const appName = process.env.APP_NAME || "";

export default defineConfig({
    // Dinamikus bázis útvonal a GitHub Pages-hez
    base: appName ? `/web-projects/apps/${appName}/` : "/",

    // Itt javítjuk a változókat:
    root: appName ? `apps/${appName}` : ".",

    build: {
        // Itt is a process.env-ből származó appName-et használjuk
        outDir: appName ? `../../dist/apps/${appName}` : "./dist",
        emptyOutDir: false,
    },
});
