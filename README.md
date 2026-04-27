![Workflow neve](https://github.com/Nagraggini/web-projects/actions/workflows/playwright.yml/badge.svg)
![Top Language](https://img.shields.io/github/languages/top/Nagraggini/web-projects)
![License](https://img.shields.io/badge/license-MIT-green)

## Web Practising & Fun

This repository is a collection of small web development projects, experiments, and practice work.

I use it to improve my skills in HTML, CSS, and JavaScript while building fun and simple applications.

## Live Demo

👉 https://nagraggini.github.io/web-projects/

## IT Blog

If you're interested in how to get started with web development, check out my blog.

Currently available only in Hungarian:
👉 https://nagraggini.github.io/my-awesome-book/

---

## 🇭🇺 Magyar verzió - Hungarian version

## Web gyakorlás és fun projektek

Ez a repository kisebb webes projektekből és gyakorló feladatokból áll.

Célja, hogy fejlesszem a HTML, CSS és JavaScript tudásomat, miközben egyszerű és szórakoztató dolgokat készítek.

## Élő verzió

👉 https://nagraggini.github.io/web-practising-and-fun/

## IT Blog

Ha érdekel, hogyan kezdj el webfejlesztést tanulni, nézd meg a blogomat:

👉 https://nagraggini.github.io/my-awesome-book/

# Előkészületek Vite-hoz

A dinamikus tartalom és a gyors frissítés miatt jobb, ha a js-ben van a html lényegi része.

Telepítés:
Terminálba írd be:
node -v
npm -v

Terminálban navigálj el (cd-vel) oda ahova szeretnéd a projekt mappáját.

npm create vite@latest
Írd be a projekt nevét. pl.: my-app
Framework: vanilla aztán javascript
Kiírja a local host-ot. pl.: http://localhost:5173/
cd my-app
npm install

Projekt elindítása: npm run dev

Projekt leállítása: Terminálban ctrl+c-t nyomj.

# Teszt Playwright-al

Terminálba: npm init playwright@latest

Linux-on valszeg elhasal a telepítés, és külön kell a függőségeket telepíteni ezzel: 
sudo rm /etc/apt/sources.list.d/docker.list  //Ezt akkor futtasd, ha van hibás docker tárolód.
sudo apt update
sudo apt-get install libavif16
sudo npx playwright install-deps

JavaScript -> tests -> GitHub Actions yes -> Install Playwright browsers? yes

Egy test mappád legyen, akár kicsi akár nagy betűs. 
Ezután a playwright.config.js-ben csekkold le ezt: testDir: './tests',


**Így indítsd el a "Kattintgatós" módot**

Live Server-en indítsd el az oldalt.

Kattints a bal oldali sávban a Testing (lombik) ikonra.

Az alsó részen keresd meg a "Record new" gombot.

Ekkor a Playwright megnyit egy üres böngészőt és egy "Playwright Inspector" ablakot.

Írd be a címsorba a helyi weboldalad címét (pl. http://127.0.0.1:5500).

Kezdj el kattintgatni: vegyél fel egy új questet, pipáld ki, töröld le stb.

Látni fogod, hogy az Inspector ablakban automatikusan generálódik a kód.

Ha végeztél, csak zárd be a böngészőt, és a VS Code-ban ott lesz az új tesztfájl a kész kóddal!
Bal oldalt frissítsd a test explorert és nyisd le a test részt ott láthatod az imént felvitt tesztedet. 

**Tesztek futtatása**

Live Server-en indítsd el az oldalt.

Kattints a bal oldali sávban a Testing (lombik) ikonra.
A test melletti play ikonra kattints.

**GitHub Actions**

Ennek meg kell lennie:
.github/workflows/playwright.yml

Ez az útmutató, hogy mi alapján futtassa a GitHub a teszteket. 

Amikor a terminálban telepítetted a playwright-ot (npm init playwright@latest), akkor yes-t kellett nyomni a GitHub Action-s kérdésre.

## playwright.config.js

A GitHub Actions egy üres szerveren fut, ahol nincs elindítva a Live Server, ezért a playwright.config.js fájlba a lentit írd bele, amivel megmondjuk a Playwright-nak, hogy indítsa el a webszervert a tesztek előtt.

```javascript
export default defineConfig({

    use: { //Fontos, hogy ne duplikáld a use részt!
     //... korábbi sorok
        baseURL: "http://127.0.0.1:8080", // Így nem kell mindig beírni.
        actionTimeout: 10000, // 10 másodperc minden kattintásra/gépelésre
        navigationTimeout: 15000,

    // ... többi sorok
        trace: "on-first-retry",
    },

//... korábbi sorok
    /* Run your local dev server before starting the tests */
    webServer: {
        command: "npm run start",
        url: "http://127.0.0.1:8080",
        reuseExistingServer: !process.env.CI,
        stdout: 'ignore',
        stderr: 'pipe',
    },
// ... többi sor
});
```
A "projects: [..]" részen kommenteld ki a safarit és a firefox-ot, ha nem akarod a gépedre is telepíteni azokat.

## package.json

A gyökér könyvtárban lévő package.json-t ki kell egészíteni a playwright függőséggel:
```js
{
{
  }
 //... korábbi sorok 
  ,
  "devDependencies": {
    "@playwright/test": "^1.44.0"
  }
// ... többi sor
}
```

Valamint ennél:
```js
  "scripts": {},
```

Javítsd ki erre:
```js
"scripts": {
  "test": "npx playwright test",
  "start": "servor . 8080 --reload" 
} //Duplikálni nem szabad.
```

Fontos , hogy a port számnak mindenhol egyeznie kell.

Terminálba: npm install --save-dev servor
npm start //Ezzel a portokat tudod csekkolni. 

Ezek után még csekkold le, hogy tuti nem a live servert akarja használni playwright.
Terminálba írd be ezt: npx playwright test

Ha hiba van írd be ezt: npx playwright show-report
Meg tudod nézni részletesen a hibát.

Ezután jöhet a commitolás a master/main-be. "Add GitHub Actions workflow" címmel.

Ezután a GitHub-on az adott reponál az Actions lapfülön láthatod, hogy sikerült-e a teszt.

**Teljes teszthez**

Terminálban: 
Ezzel csak a chromium típusú böngészőben futtatod a tesztet.
npx playwright test --project=chromium

npm run start

Miután elindult minden a leállításhoz a terminálban nyomd meg a ctrl+C-t.
npx playwright test

Többi hasznos terminál parancs a teszteléshez:
npx playwright test --headed
npx playwright test --ui
npx playwright test --debug

# Codesand.io használata

https://codesandbox.io/

Lépj be a github fiókoddal.

Jobb felül "Create" -> Html+css, ne aggódj js-t is tudsz majd létrehozni.

Template-k:
https://codesandbox.io/search?query=spring%20boot&type=template&refinementList%5Btemplate%5D=&page=1&configure%5BhitsPerPage%5D=12

# Források

https://www.youtube.com/watch?v=i_KXcwr7PYc
https://www.freecodecamp.org/learn/javascript-v9/lecture-working-with-the-dom-click-events-and-web-apis/what-is-an-api-and-what-are-web-apis
https://www.youtube.com/watch?v=HmaQwuKUYTc
https://www.freecodecamp.org/learn/javascript-v9/lecture-working-with-the-dom-click-events-and-web-apis/how-do-you-create-new-nodes-using-innerhtml-and-createelement
[10 CSS PRO Tips and Tricks you NEED to know](https://www.youtube.com/watch?v=44FTAS-qT8Q&list=WL&index=11)
[How to create a Responsive Navigation Bar (for beginners)](https://www.youtube.com/watch?v=U8smiWQ8Seg)


# Github branch

A Settingben állj át az új branchre és a Pages-en is.

Pages -> build and deployment -> source -> GitHub Actions -> Static HTML
A branch névre figyelj, hogy megfelelő legyen beállítva.

# Mappa Struktúra

web-practising-and-fun/
├── index.html                  # Főoldal (alkalmazás választó)
├── README.md                   # Projekt leírás
├── package.json                # Node.js függőségek és szkriptek
├── playwright.config.js        # Tesztelési konfiguráció
├── .gitignore                  # (Ajánlott: node_modules, test-results elrejtésére)
│
├── components/                 # HTML sablonok (újrafelhasználható darabok)
│   ├── header-component.html
│   ├── footer-component.html
│   └── sidebar-navigation.html
│
├── pages/                      # Fix információs oldalak
│   ├── about-me.html
│   └── settings.html
│
├── apps/                       # MINI ALKALMAZÁSOK (A projekt szíve)
│   ├── blog/                   # Blog motor
│   ├── questlog/               # Quest log (saját JS mappával)
│   ├── student-list/           # Hallgatói listák (Beginner, Modern, Pro szintek)
│   ├── js-zero-to-expert/      # Tanfolyami feladatok (pl. Guess My Number)
│   ├── calc / calc-2 / feladat8 # Számológép variációk
│   ├── rock-band / counter     # Kisebb interaktív appok
│   └── ... (további gyakorló mappák: form, localstore, responsive-design)
│
├── css/                        # STÍLUSOK
│   ├── main-style.css          # Globális stílus
│   └── components/             # Komponensek egyedi CSS fájljai (footer, header, theme)
│
├── js/                         # JAVASCRIPT
│   ├── common.js               # Általános logikák
│   └── components/             # JS komponensek (firework-ui, header-script, model)
│
├── assets/                     # ERŐFORRÁSOK
│   ├── fonts/                  # Egyedi betűtípusok (Momo_Signature)
│   ├── icons/                  # Ikonok és gifek
│   └── images/                 # Képek, ábrák és cheat-sheetek
│
├── tests/                      # AUTOMATIZÁLT TESZTEK (Playwright)
│   ├── example.spec.js
│   └── set-name-and-create-one-quest.spec.ts
│
├── docs/                       # DOKUMENTÁCIÓ
│   └── main-site-plan.png      # Tervezési vázlatok
│
└── node_modules/               # Telepített könyvtárak (Playwright, Servor)

