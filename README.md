````markdown
# WebUI Playwright Test Automation

This repository contains Playwright code to test EN_MEDICAL.

## Prerequisites

- Node.js **v21.6.1**
- npm (comes with Node.js)
- VSCode (optional but recommended)
- May need local installation of Chrome browser to run tests

## Environment Summary

* Node.js: `v21.6.1`
* npm: bundled with Node.js
* Playwright: `@playwright/test@1.39.0`
* Browser: Google Chrome (via `channel: 'chrome'`)
* OS: macOS (tested on Intel-based MacBook)


## Installation

Clone the repo and install dependencies:

```bash
git clone <your-repo-url>
cd <your-repo-folder>
````

Use the verified Playwright version:

```bash
npm install --save-dev @playwright/test@1.39.0
npx playwright install
```

If switching versions later, always clean reinstall with:

> ```bash
> rm -rf node_modules package-lock.json
> npm install
> npx playwright install
> ```

---

Note: due to difficulties on Mac, the local installation of Chrome was used rather than the playwright-chromium package.
That can be changed in 'playwright.config.ts' by deleting 'channel: \'chrome\' '.

---

## Running Tests

### From the Terminal

To run all tests:

```bash
npx playwright test
```

To run a specific test file:

```bash
npx playwright test tests/example.spec.ts
```

To run with verbose logging:

```bash
DEBUG=pw:browser* npx playwright test
```

---

### From VSCode

1. Open the full project folder (where `playwright.config.ts` is at root).
2. Install the **Playwright Test for VSCode** extension.
3. Run `>Test: Install Playwright` from the command palette.
4. Open the Playwright sidebar to run/debug tests.


## 📁 File Structure

```
project-root/
├── tests/
│   └── example.spec.ts      # Main test file
├── playwright.config.ts     # Test configuration
├── package.json
└── README.md
```


