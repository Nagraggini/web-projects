import { defineConfig } from "vite";
import { resolve } from "path";

// Konkrét mappáim listája - ez a "Whitelist"
const VALID_APPS = [
    "for-a-new-job",
    "guest-number",
    "job-interview-q-and-a",
    "questlog",
    "rock-band",
];

const requestedApp = process.env.APP_NAME || "";
const isSubApp = VALID_APPS.includes(requestedApp);
const appName = isSubApp ? requestedApp : "";

export default defineConfig({
    // Ha al-appot buildelünk, az apps/mappa az alap, különben a gyökér
    root: isSubApp ? resolve(__dirname, "apps", appName) : resolve(__dirname),

    base: isSubApp ? `/web-projects/apps/${appName}/` : "/web-projects/",

    build: {
        // A kimeneti mappa is igazodik: dist/apps/név VAGY simán a dist/ gyökér
        outDir: isSubApp
            ? resolve(__dirname, "dist", "apps", appName)
            : resolve(__dirname, "dist"),

        emptyOutDir: isSubApp ? false : true, // A fő buildnél takarítunk, al-appnál nem töröljük a többit

        rollupOptions: {
            input: {
                // Dinamikusan meghatározzuk a belépési pontot
                main: isSubApp
                    ? resolve(__dirname, "apps", appName, "index.html")
                    : resolve(__dirname, "index.html"),
            },
        },
    },
});
