# 🏦 Playwright Automation Framework — POC

A Page Object Model (POM) test automation framework built with **Playwright + TypeScript**, targeting a banking demo application. This is a proof-of-concept showing how a small automation codebase can be structured for maintainability from day one — reusable page classes, config-driven test data, and defensive engineering against a flaky hosted test site.

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![POM](https://img.shields.io/badge/Architecture-Page%20Object%20Model-blue?style=flat-square)

---

## Overview

This framework automates end-to-end user flows against a [Testers Talk banking demo site](https://bakkappan.github.io/Testers-Talk-Practice-Site/): logging in, submitting a Quick Transaction transfer, and verifying it shows up correctly in transaction history — plus a bill payment flow. It's built around a **Page Object Model** hierarchy rather than flat, linear scripts, so each page's locators and actions live in one place and tests read like plain English.

## Architecture

```
BasePage (shared primitives: goto, role-based getButton/getLink, expectHeadingVisible)
   ├── LoginPage           → returns a HomePage on successful login
   ├── HomePage            → returns a QuickTransactionPage
   ├── QuickTransactionPage → returns a TransactionHistoryPage
   └── TransactionHistoryPage
```

Each page method returns the **next page object** in the flow (`loginAs()` returns a `HomePage`, `openQuickTransactions()` returns a `QuickTransactionPage`, etc.), so a test reads as a chained user journey instead of a wall of raw selectors:

```ts
const loginPage = new LoginPage(page);
await loginPage.open(config.url);

const homePage = await loginPage.loginAs(config.username, config.password, config.appName);
const quickTransactionPage = await homePage.openQuickTransactions();
const reference = await quickTransactionPage.createTransfer(transferTestData);

const historyPage = await quickTransactionPage.openHistory();
await historyPage.expectTransactionReference(reference);
```

## Engineering Details Worth Highlighting

These are the specific decisions in this codebase worth bringing up in an interview — they show reasoning about *why*, not just "it passes":

- **Config-driven, not hardcoded.** Target URL, login credentials, and app name live in `config.json`, not inline in test files — swapping environments doesn't touch test logic.
- **Data-driven test input.** The transfer amount/account/description come from `test-data/Transfer_TestData.json`, separating test data from test logic.
- **Race-condition-safe login.** `loginAs()` wraps the login click and the post-login `waitForURL` in a single `Promise.all`, so the navigation listener is attached *before* the click fires — avoiding a flaky race where the page navigates before Playwright starts waiting.
- **Stability against a noisy demo site.** Tests abort network requests to YouTube/ad/tracking domains (`page.route(...).abort()`) that the hosted demo site pulls in, so ad/video loading noise doesn't cause flaky waits.
- **Single-worker execution by design**, with a comment explaining why: *"the hosted practice site is unstable when several browser sessions load it concurrently."* — a deliberate trade-off, not an oversight.
- **Safe dynamic assertions.** The transaction reference (`TXN-123-456` style) is extracted at runtime via regex, then a static helper (`BasePage.escapeRegExp`) escapes it before it's reused in a second regex match against transaction history — avoiding regex-injection bugs from dynamic string content.
- **Full failure artifacts on every run:** screenshots (`fullPage: true`), video, and trace-on-retry are all enabled, so any failure is debuggable from the HTML report alone.

## Tech Stack

- **Framework:** Playwright Test (`@playwright/test`)
- **Language:** TypeScript
- **Pattern:** Page Object Model
- **Reporting:** Playwright HTML reporter

## Test Coverage — Banking Flows

| Spec | Flow Covered |
|---|---|
| `banking-test.spec.ts` → *Verify Quick Transactions Flow* | Login → open Quick Transactions → submit transfer → confirm → verify reference appears in Transaction History |
| `banking-test.spec.ts` → *Verify transfer and bill payment tabs* | Login → homepage loads correctly → Transfers and Bill Payments tabs are visible |
| `BillPayment.spec.ts` | Login → Bill Payments → submit a payment → confirm → verify entry in Transaction History |

## Test Coverage — GreenKart Shop (AI-Agent Generated)

A second, independent test suite under `tests/green-kart/` targets [green-kart.in/shop](https://www.green-kart.in/shop), a product catalog and cart demo site. This suite wasn't hand-written — it was produced by a **planner → generator agent workflow** wired into VS Code via a local Playwright MCP server (`.vscode/mcp.json` → `playwright-test/*` tools, agent definitions in `.github/agents/`).

The planner agent explored the live site and wrote a structured Markdown test plan (`specs/green-kart-shop-test-plan.md`) covering catalog loading, category filters, price filters, sorting, cart, and wishlist/compare — including explicit edge cases. The generator agent then turned each scenario into an executable spec by literally driving the browser step-by-step (via `browser_click`, `browser_navigate`, etc.), logging each action, then writing the resulting test file — so the generated code reflects real, observed interactions rather than guessed selectors. A third agent, the **healer**, runs the suite, debugs any failing test via Playwright's `test_debug`, inspects console/network/DOM state, patches the root cause, and re-runs until it's green — falling back to `test.fixme()` with an explanatory comment only if a failure turns out to be a genuine app issue rather than a flaky test. All three agents run on **Claude Sonnet 4.6** through a local Playwright MCP server (`.vscode/mcp.json`).

| Spec | Scenario |
|---|---|
| `verify-shop-page-loads.spec.ts` | Shop page loads, title/heading correct, product catalog renders |
| `filter-by-category.spec.ts` | Category filters (Fruits, Vegetables, Exotic, etc.) update the product grid correctly |
| `filter-by-price.spec.ts` | Price range filter narrows results, resets cleanly |
| `sort-products.spec.ts` | Sort by price (asc/desc) and name reorders the catalog correctly |
| `add-to-cart.spec.ts` | Adding products updates cart state and contents |
| `wishlist-compare.spec.ts` | Wishlist/compare controls work without breaking page state |
| `negative-edge-cases.spec.ts` | Invalid price ranges, repeated filter/sort combos, narrow viewports don't break the UI |

This pairs well with the banking suite in an interview: one shows hand-designed POM architecture, the other shows using AI agents as a force-multiplier for test *planning and generation* — while you still review and own the resulting code.

## Getting Started

```bash
git clone https://github.com/vamsimappetti2001/Playwright-automation-Framework-POC.git
cd Playwright-automation-Framework-POC
npm install
npx playwright install
npm test
```

Run in interactive UI mode:
```bash
npm run test:ui
```

View the last HTML report:
```bash
npm run report
```

## Project Structure

```
pages/
  BasePage.ts               # Shared locator/action primitives
  LoginPage.ts
  HomePage.ts
  QuickTransactionPage.ts
  TransactionHistoryPage.ts
tests/
  banking-test.spec.ts      # POM-based end-to-end flows
  BillPayment.spec.ts       # Bill payment flow
config.json                  # Target URL, credentials, app name
test-data/
  Transfer_TestData.json     # Externalized test input
tests/green-kart/            # AI-generated shop test suite
specs/
  green-kart-shop-test-plan.md  # Planner agent's output
.github/agents/               # Planner/generator agent definitions
.vscode/mcp.json              # Local Playwright MCP server config
playwright.config.ts
```

## Roadmap / Known Improvements

Being upfront about what's next, since that's a fair interview question:
- Refactor `BillPayment.spec.ts` into the same Page Object Model style as `banking-test.spec.ts` — it's currently a Codegen-recorded script and hasn't been migrated yet.
- Remove the default `example.spec.ts` and empty `seed.spec.ts` boilerplate left over from setup.
- Migrate the GreenKart suite to page objects too, now that the AI-generated specs are in place — currently they're flat scripts like the original banking tests were before refactoring.
- Add a GitHub Actions workflow that actually **runs the test suite** on push — the current `.github/workflows/copilot-setup-steps.yml` only installs dependencies, it doesn't execute `npm test`.
- Move credentials out of `config.json` and into environment variables — low risk here since they're demo-site credentials, but it's the right habit going forward.
- Add `.playwright-mcp/` to `.gitignore` — its debug logs and page snapshots are currently committed to the repo.

## Why This Project

Built to practice designing a test framework the way a real QA team would maintain one — page objects that model the app rather than the test, config/data separated from logic, and explicit handling for a real flakiness source (a shared hosted demo site) instead of just adding blind retries.
