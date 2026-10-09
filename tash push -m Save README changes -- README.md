warning: in the working copy of 'README.md', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/README.md b/README.md[m
[1mindex c4a4269..8602d80 100644[m
[1m--- a/README.md[m
[1m+++ b/README.md[m
[36m@@ -1,28 +1,45 @@[m
[31m-# 🏦 Playwright Automation Framework — POC[m
[32m+[m[32m<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2EAD33,50:3178C6,100:9B59B6&height=190&section=header&text=Playwright%20Automation%20Framework%20🏦&fontSize=32&fontColor=ffffff&animation=fadeIn&fontAlignY=38"/>[m
 [m
[31m-A Page Object Model (POM) test automation framework built with **Playwright + TypeScript**, targeting a banking demo application. This is a proof-of-concept showing how a small automation codebase can be structured for maintainability from day one — reusable page classes, config-driven test data, and defensive engineering against a flaky hosted test site.[m
[32m+[m[32m<p align="center">[m
[32m+[m[32m  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&pause=1000&color=2EAD33&center=true&vCenter=true&width=680&lines=Hand-Built+POM+Framework+%F0%9F%8F%97%EF%B8%8F;%2B+AI-Agent-Generated+Test+Suite+%F0%9F%A4%96;Two+Approaches%2C+One+Codebase+%E2%9A%96%EF%B8%8F" />[m
[32m+[m[32m</p>[m
 [m
[31m-![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)[m
[31m-![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)[m
[31m-![POM](https://img.shields.io/badge/Architecture-Page%20Object%20Model-blue?style=flat-square)[m
[32m+[m[32m<p align="center">[m
[32m+[m[32m  <img src="https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white" />[m
[32m+[m[32m  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />[m
[32m+[m[32m  <img src="https://img.shields.io/badge/Architecture-Page%20Object%20Model-9B59B6?style=for-the-badge" />[m
[32m+[m[32m  <img src="https://img.shields.io/badge/AI_Agents-Claude_Sonnet_4.6-FF6B6B?style=for-the-badge" />[m
[32m+[m[32m</p>[m
 [m
 ---[m
 [m
[31m-## Overview[m
[32m+[m[32m### 📋 Overview[m
 [m
[31m-This framework automates end-to-end user flows against a [Testers Talk banking demo site](https://bakkappan.github.io/Testers-Talk-Practice-Site/): logging in, submitting a Quick Transaction transfer, and verifying it shows up correctly in transaction history — plus a bill payment flow. It's built around a **Page Object Model** hierarchy rather than flat, linear scripts, so each page's locators and actions live in one place and tests read like plain English.[m
[32m+[m[32mThis is a proof-of-concept showing how a small automation codebase can be structured for **maintainability from day one** — reusable page classes, config-driven test data, and defensive engineering against a flaky hosted test site.[m
 [m
[31m-## Architecture[m
[32m+[m[32mIt automates two independent applications, built two different ways:[m
 [m
[31m-```[m
[31m-BasePage (shared primitives: goto, role-based getButton/getLink, expectHeadingVisible)[m
[31m-   ├── LoginPage           → returns a HomePage on successful login[m
[31m-   ├── HomePage            → returns a QuickTransactionPage[m
[31m-   ├── QuickTransactionPage → returns a TransactionHistoryPage[m
[31m-   └── TransactionHistoryPage[m
[32m+[m[32m| | Banking Demo | GreenKart Shop |[m
[32m+[m[32m|---|---|---|[m
[32m+[m[32m| **How it was built** | Hand-written, Page Object Model | AI-agent generated (planner → generator → healer) |[m
[32m+[m[32m| **What it proves** | I can design a maintainable framework from scratch | I can direct AI agents and still own the resulting code |[m
[32m+[m
[32m+[m[32m> 🆕 **New here?** This README explains not just what each piece does, but *why it's built that way* — every "Engineering Detail" below is something worth bringing up in an interview.[m
[32m+[m
[32m+[m[32m---[m
[32m+[m
[32m+[m[32m### 🏗️ Architecture — Page Object Model[m
[32m+[m
[32m+[m[32m```mermaid[m
[32m+[m[32mflowchart TD[m
[32m+[m[32m    Base["📦 BasePage\n(goto, getButton, getLink, expectHeadingVisible)"][m
[32m+[m[32m    Base --> Login["🔑 LoginPage"][m
[32m+[m[32m    Login -->|"loginAs() returns"| Home["🏠 HomePage"][m
[32m+[m[32m    Home -->|"openQuickTransactions() returns"| Quick["💸 QuickTransactionPage"][m
[32m+[m[32m    Quick -->|"openHistory() returns"| Hist["📜 TransactionHistoryPage"][m
 ```[m
 [m
[31m-Each page method returns the **next page object** in the flow (`loginAs()` returns a `HomePage`, `openQuickTransactions()` returns a `QuickTransactionPage`, etc.), so a test reads as a chained user journey instead of a wall of raw selectors:[m
[32m+[m[32mEach page method returns the **next page object** in the flow, so a test reads like a chained user journey instead of a wall of raw selectors:[m
 [m
 ```ts[m
 const loginPage = new LoginPage(page);[m
[36m@@ -36,38 +53,131 @@[m [mconst historyPage = await quickTransactionPage.openHistory();[m
 await historyPage.expectTransactionReference(reference);[m
 ```[m
 [m
[31m-## Engineering Details Worth Highlighting[m
[32m+[m[32m> 💡 **What is a Page Object Model (POM)?** Instead of writing raw `page.click('#some-selector')` calls directly inside every test, each *page* of the app gets its own class holding its locators and actions. Tests then call readable methods (`loginAs(...)`, `openQuickTransactions()`) instead of raw selectors — so when the UI changes, you fix it in one place, not in every test that touches that page.[m
[32m+[m
[32m+[m[32m---[m
[32m+[m
[32m+[m[32m### 🔍 Engineering Details Worth Highlighting[m
[32m+[m
[32m+[m[32m<details open>[m
[32m+[m[32m<summary><b>These are the decisions worth explaining in an interview — click any to expand</b></summary>[m
[32m+[m
[32m+[m[32m<br>[m
[32m+[m
[32m+[m[32m**⚙️ Config-driven, not hardcoded**[m
[32m+[m[32mTarget URL, login credentials, and app name live in `config.json`, not inline in test files — swapping environments doesn't touch test logic.[m
[32m+[m
[32m+[m[32m**📊 Data-driven test input**[m
[32m+[m[32mThe transfer amount/account/description come from `test-data/Transfer_TestData.json`, separating test data from test logic entirely.[m
[32m+[m
[32m+[m[32m**🏁 Race-condition-safe login**[m
[32m+[m[32m`loginAs()` wraps the login click and the post-login `waitForURL` in a single `Promise.all`, so the navigation listener is attached **before** the click fires — this avoids a subtle, flaky bug where the page navigates before Playwright starts waiting for it.[m
[32m+[m
[32m+[m[32m**🛡️ Stability against a noisy demo site**[m
[32m+[m[32mTests abort network requests to YouTube/ad/tracking domains (`page.route(...).abort()`) that the hosted demo site pulls in, so ad/video loading noise doesn't cause flaky waits unrelated to the actual test.[m
 [m
[31m-These are the specific decisions in this codebase worth bringing up in an interview — they show reasoning about *why*, not just "it passes":[m
[32m+[m[32m**🔒 Single-worker execution — a deliberate trade-off**[m
[32m+[m[32mExplained with a comment in the code itself: *"the hosted practice site is unstable when several browser sessions load it concurrently."* This is a documented decision, not an oversight — worth pointing out in review.[m
 [m
[31m-- **Config-driven, not hardcoded.** Target URL, login credentials, and app name live in `config.json`, not inline in test files — swapping environments doesn't touch test logic.[m
[31m-- **Data-driven test input.** The transfer amount/account/description come from `test-data/Transfer_TestData.json`, separating test data from test logic.[m
[31m-- **Race-condition-safe login.** `loginAs()` wraps the login click and the post-login `waitForURL` in a single `Promise.all`, so the navigation listener is attached *before* the click fires — avoiding a flaky race where the page navigates before Playwright starts waiting.[m
[31m-- **Stability against a noisy demo site.** Tests abort network requests to YouTube/ad/tracking domains (`page.route(...).abort()`) that the hosted demo site pulls in, so ad/video loading noise doesn't cause flaky waits.[m
[31m-- **Single-worker execution by design**, with a comment explaining why: *"the hosted practice site is unstable when several browser sessions load it concurrently."* — a deliberate trade-off, not an oversight.[m
[31m-- **Safe dynamic assertions.** The transaction reference (`TXN-123-456` style) is extracted at runtime via regex, then a static helper (`BasePage.escapeRegExp`) escapes it before it's reused in a second regex match against transaction history — avoiding regex-injection bugs from dynamic string content.[m
[31m-- **Full failure artifacts on every run:** screenshots (`fullPage: true`), video, and trace-on-retry are all enabled, so any failure is debuggable from the HTML report alone.[m
[32m+[m[32m**🧮 Safe dynamic assertions**[m
[32m+[m[32mThe transaction reference (`TXN-123-456` style) is extracted at runtime via regex, then escaped with a static helper (`BasePage.escapeRegExp`) before being reused in a second regex match against transaction history — this avoids regex-injection bugs from dynamic string content, a subtle class of bug most beginner automation code doesn't guard against.[m
 [m
[31m-## Tech Stack[m
[32m+[m[32m**🎥 Full failure artifacts on every run**[m
[32m+[m[32mScreenshots (`fullPage: true`), video, and trace-on-retry are all enabled, so any failure is debuggable from the HTML report alone, without needing to reproduce it locally first.[m
 [m
[31m-- **Framework:** Playwright Test (`@playwright/test`)[m
[31m-- **Language:** TypeScript[m
[31m-- **Pattern:** Page Object Model[m
[31m-- **Reporting:** Playwright HTML reporter[m
[32m+[m[32m</details>[m
 [m
[31m-## Test Coverage — Banking Flows[m
[32m+[m[32m---[m
[32m+[m
[32m+[m[32m### 🧰 Tech Stack[m
 [m
[31m-| Spec | Flow Covered |[m
[32m+[m[32m<p align="center">[m
[32m+[m[32m  <img src="https://skillicons.dev/icons?i=ts,playwright,nodejs,vscode,git,github&theme=dark" />[m
[32m+[m[32m</p>[m
[32m+[m
[32m+[m[32m| Layer | Choice |[m
 |---|---|[m
[31m-| `banking-test.spec.ts` → *Verify Quick Transactions Flow* | Login → open Quick Transactions → submit transfer → confirm → verify reference appears in Transaction History |[m
[31m-| `banking-test.spec.ts` → *Verify transfer and bill payment tabs* | Login → homepage loads correctly → Transfers and Bill Payments tabs are visible |[m
[31m-| `BillPayment.spec.ts` | Login → Bill Payments → submit a payment → confirm → verify entry in Transaction History |[m
[32m+[m[32m| 🎭 Framework | Playwright Test (`@playwright/test`) |[m
[32m+[m[32m| 🔷 Language | TypeScript |[m
[32m+[m[32m| 🏗️ Pattern | Page Object Model |[m
[32m+[m[32m| 📊 Reporting | Playwright HTML reporter |[m
[32m+[m
[32m+[m[32m---[m
[32m+[m
[32m+[m[32m### ✅ Test Coverage — Banking Flows[m
[32m+[m
[32m+[m[32m<details open>[m
[32m+[m[32m<summary><b>💸 <code>banking-test.spec.ts</code> → "Verify Quick Transactions Flow"</b></summary>[m
[32m+[m[32m<br>[m
[32m+[m
[32m+[m[32m**Step by step:**[m
[32m+[m[32m1. Logs in with credentials from `config.json`[m
[32m+[m[32m2. Opens the Quick Transactions section[m
[32m+[m[32m3. Submits a transfer using data from `Transfer_TestData.json`[m
[32m+[m[32m4. Confirms the transfer[m
[32m+[m[32m5. Captures the generated transaction reference at runtime[m
[32m+[m[32m6. Navigates to Transaction History[m
[32m+[m[32m7. Asserts that exact reference appears in the history list[m
[32m+[m
[32m+[m[32m</details>[m
[32m+[m
[32m+[m[32m<details>[m
[32m+[m[32m<summary><b>🧭 <code>banking-test.spec.ts</code> → "Verify transfer and bill payment tabs"</b></summary>[m
[32m+[m[32m<br>[m
[32m+[m
[32m+[m[32m**Step by step:**[m
[32m+[m[32m1. Logs in[m
[32m+[m[32m2. Asserts the homepage loads correctly[m
[32m+[m[32m3. Asserts the Transfers tab is visible[m
[32m+[m[32m4. Asserts the Bill Payments tab is visible[m
[32m+[m
[32m+[m[32m</details>[m
[32m+[m
[32m+[m[32m<details>[m
[32m+[m[32m<summary><b>🧾 <code>BillPayment.spec.ts</code> → Bill payment flow</b></summary>[m
[32m+[m[32m<br>[m
[32m+[m
[32m+[m[32m**Step by step:**[m
[32m+[m[32m1. Logs in[m
[32m+[m[32m2. Navigates to Bill Payments[m
[32m+[m[32m3. Submits a payment[m
[32m+[m[32m4. Confirms the payment[m
[32m+[m[32m5. Verifies the entry appears in Transaction History[m
[32m+[m
[32m+[m[32m*(Note: this spec is currently a Codegen-recorded script, not yet migrated to the POM style above — see Roadmap.)*[m
 [m
[31m-## Test Coverage — GreenKart Shop (AI-Agent Generated)[m
[32m+[m[32m</details>[m
 [m
[31m-A second, independent test suite under `tests/green-kart/` targets [green-kart.in/shop](https://www.green-kart.in/shop), a product catalog and cart demo site. This suite wasn't hand-written — it was produced by a **planner → generator agent workflow** wired into VS Code via a local Playwright MCP server (`.vscode/mcp.json` → `playwright-test/*` tools, agent definitions in `.github/agents/`).[m
[32m+[m[32m---[m
[32m+[m
[32m+[m[32m### 🤖 Test Coverage — GreenKart Shop (AI-Agent Generated)[m
[32m+[m
[32m+[m[32mA second, fully independent suite under `tests/green-kart/` targets the [GreenKart shop](https://www.green-kart.in/shop) — and it wasn't hand-written. It was produced by a **planner → generator → healer** agent workflow, wired into VS Code via a local Playwright MCP server.[m
[32m+[m
[32m+[m[32m```mermaid[m
[32m+[m[32msequenceDiagram[m
[32m+[m[32m    participant P as 🧭 Planner Agent[m
[32m+[m[32m    participant Site as 🌐 GreenKart Site[m
[32m+[m[32m    participant G as ⚙️ Generator Agent[m
[32m+[m[32m    participant Spec as 🧪 Spec File[m
[32m+[m[32m    participant H as 🩹 Healer Agent[m
[32m+[m
[32m+[m[32m    P->>Site: Explores live site (browser_click, browser_navigate)[m
[32m+[m[32m    P->>P: Writes structured test plan (.md)[m
[32m+[m[32m    G->>P: Reads test plan[m
[32m+[m[32m    G->>Site: Drives browser step-by-step, logs each action[m
[32m+[m[32m    G->>Spec: Writes executable spec from observed interactions[m
[32m+[m[32m    H->>Spec: Runs the suite[m
[32m+[m[32m    alt Test fails[m
[32m+[m[32m        H->>Site: Inspects console/network/DOM state[m
[32m+[m[32m        H->>Spec: Patches root cause[m
[32m+[m[32m        H->>Spec: Re-runs until green[m
[32m+[m[32m    else Genuine app issue, not flakiness[m
[32m+[m[32m        H->>Spec: Falls back to test.fixme() with explanatory comment[m
[32m+[m[32m    end[m
[32m+[m[32m```[m
 [m
[31m-The planner agent explored the live site and wrote a structured Markdown test plan (`specs/green-kart-shop-test-plan.md`) covering catalog loading, category filters, price filters, sorting, cart, and wishlist/compare — including explicit edge cases. The generator agent then turned each scenario into an executable spec by literally driving the browser step-by-step (via `browser_click`, `browser_navigate`, etc.), logging each action, then writing the resulting test file — so the generated code reflects real, observed interactions rather than guessed selectors. A third agent, the **healer**, runs the suite, debugs any failing test via Playwright's `test_debug`, inspects console/network/DOM state, patches the root cause, and re-runs until it's green — falling back to `test.fixme()` with an explanatory comment only if a failure turns out to be a genuine app issue rather than a flaky test. All three agents run on **Claude Sonnet 4.6** through a local Playwright MCP server (`.vscode/mcp.json`).[m
[32m+[m[32mAll three agents run on **Claude Sonnet 4.6** through a local Playwright MCP server (`.vscode/mcp.json`). The key detail: the generator doesn't guess selectors from reading code — it **actually drives the browser** step-by-step and logs each real interaction before writing the spec, so the generated tests reflect observed behavior, not assumptions.[m
 [m
 | Spec | Scenario |[m
 |---|---|[m
[36m@@ -79,29 +189,40 @@[m [mThe planner agent explored the live site and wrote a structured Markdown test pl[m
 | `wishlist-compare.spec.ts` | Wishlist/compare controls work without breaking page state |[m
 | `negative-edge-cases.spec.ts` | Invalid price ranges, repeated filter/sort combos, narrow viewports don't break the UI |[m
 [m
[31m-This pairs well with the banking suite in an interview: one shows hand-designed POM architecture, the other shows using AI agents as a force-multiplier for test *planning and generation* — while you still review and own the resulting code.[m
[32m+[m[32m> 🎯 **Why this pairs well with the banking suite in an interview:** one shows hand-designed POM architecture from scratch; the other shows directing AI agents as a force-multiplier for test *planning and generation* — while still reviewing and owning the resulting code, including deciding when a failure is a real bug (`test.fixme()`) versus a flaky test worth fixing.[m
[32m+[m
[32m+[m[32m---[m
[32m+[m
[32m+[m[32m### 🚀 Getting Started[m
 [m
[31m-## Getting Started[m
[32m+[m[32m**Prerequisites:** [Node.js](https://nodejs.org/) (LTS) · npm · VS Code + GitHub Copilot *(optional — only needed to re-run the AI agents, not the existing tests)*[m
 [m
 ```bash[m
[32m+[m[32m# 1. Clone and enter the repo[m
 git clone https://github.com/vamsimappetti2001/Playwright-automation-Framework-POC.git[m
 cd Playwright-automation-Framework-POC[m
[32m+[m
[32m+[m[32m# 2. Install dependencies[m
 npm install[m
[32m+[m
[32m+[m[32m# 3. Install Playwright's browsers (one-time per machine)[m
 npx playwright install[m
[32m+[m
[32m+[m[32m# 4. Run the full suite[m
 npm test[m
 ```[m
 [m
[31m-Run in interactive UI mode:[m
 ```bash[m
[32m+[m[32m# Interactive UI mode — watch each test step through the app visually[m
 npm run test:ui[m
[31m-```[m
 [m
[31m-View the last HTML report:[m
[31m-```bash[m
[32m+[m[32m# View the HTML report from the last run[m
 npm run report[m
 ```[m
 [m
[31m-## Project Structure[m
[32m+[m[32m---[m
[32m+[m
[32m+[m[32m### 📁 Project Structure[m
 [m
 ```[m
 pages/[m
[36m@@ -112,28 +233,61 @@[m [mpages/[m
   TransactionHistoryPage.ts[m
 tests/[m
   banking-test.spec.ts      # POM-based end-to-end flows[m
[31m-  BillPayment.spec.ts       # Bill payment flow[m
[32m+[m[32m  BillPayment.spec.ts       # Bill payment flow (not yet migrated to POM)[m
[32m+[m[32m  green-kart/                # AI-generated shop test suite[m
 config.json                  # Target URL, credentials, app name[m
 test-data/[m
   Transfer_TestData.json     # Externalized test input[m
[31m-tests/green-kart/            # AI-generated shop test suite[m
 specs/[m
   green-kart-shop-test-plan.md  # Planner agent's output[m
[31m-.github/agents/               # Planner/generator agent definitions[m
[32m+[m[32m.github/agents/               # Planner/generator/healer agent definitions[m
 .vscode/mcp.json              # Local Playwright MCP server config[m
 playwright.config.ts[m
 ```[m
 [m
[31m-## Roadmap / Known Improvements[m
[32m+[m[32m---[m
[32m+[m
[32m+[m[32m### 🗺️ Roadmap / Known Improvements[m
 [m
 Being upfront about what's next, since that's a fair interview question:[m
[31m-- Refactor `BillPayment.spec.ts` into the same Page Object Model style as `banking-test.spec.ts` — it's currently a Codegen-recorded script and hasn't been migrated yet.[m
[31m-- Remove the default `example.spec.ts` and empty `seed.spec.ts` boilerplate left over from setup.[m
[31m-- Migrate the GreenKart suite to page objects too, now that the AI-generated specs are in place — currently they're flat scripts like the original banking tests were before refactoring.[m
[31m-- Add a GitHub Actions workflow that actually **runs the test suite** on push — the current `.github/workflows/copilot-setup-steps.yml` only installs dependencies, it doesn't execute `npm test`.[m
[31m-- Move credentials out of `config.json` and into environment variables — low risk here since they're demo-site credentials, but it's the right habit going forward.[m
[31m-- Add `.playwright-mcp/` to `.gitignore` — its debug logs and page snapshots are currently committed to the repo.[m
 [m
[31m-## Why This Project[m
[32m+[m[32m- [ ] Refactor `BillPayment.spec.ts` into the same POM style as `banking-test.spec.ts` — it's currently a Codegen-recorded script[m
[32m+[m[32m- [ ] Remove the default `example.spec.ts` and empty `seed.spec.ts` boilerplate left over from setup[m
[32m+[m[32m- [ ] Migrate the GreenKart suite to page objects too, now that the AI-generated specs are in place[m
[32m+[m[32m- [ ] Add a GitHub Actions workflow that actually **runs** the suite on push — `copilot-setup-steps.yml` currently only installs dependencies[m
[32m+[m[32m- [ ] Move credentials out of `config.json` into environment variables — low risk since they're demo-site credentials, but it's the right habit[m
[32m+[m[32m- [ ] Add `.playwright-mcp/` to `.gitignore` — its debug logs and page snapshots are currently committed[m
[32m+[m
[32m+[m[32m---[m
[32m+[m
[32m+[m[32m### 📖 Glossary[m
[32m+[m
[32m+[m[32m<details>[m
[32m+[m[32m<summary><b>Click to expand — key terms used in this README</b></summary>[m
[32m+[m[32m<br>[m
[32m+[m
[32m+[m[32m| Term | Meaning |[m
[32m+[m[32m|---|---|[m
[32m+[m[32m| **Page Object Model (POM)** | A pattern where each app page gets its own class holding locators/actions, so tests call readable methods instead of raw selectors |[m
[32m+[m[32m| **Locator** | Playwright's way of finding an element on the page before interacting with it |[m
[32m+[m[32m| **Race condition** | A bug where the outcome depends on timing — here, whether Playwright starts waiting for navigation before or after the click fires |[m
[32m+[m[32m| **Regex-injection** | A bug where untrusted dynamic text is used to build a regex pattern without escaping special characters first, causing incorrect matches |[m
[32m+[m[32m| **`test.fixme()`** | Playwright's way of marking a test as "known broken, skip for now" with a reason — used instead of deleting or ignoring the failure |[m
[32m+[m[32m| **MCP (Model Context Protocol)** | An open protocol that lets an AI agent call real tools (like browser actions or test runners) instead of just generating text |[m
[32m+[m
[32m+[m[32m</details>[m
[32m+[m
[32m+[m[32m---[m
[32m+[m
[32m+[m[32m### 💡 Why This Project[m
[32m+[m
[32m+[m[32mBuilt to practice designing a test framework the way a real QA team would maintain one — page objects that model the app rather than the test, config/data separated from logic, explicit handling for a real flakiness source instead of blind retries, and a second suite that shows the same rigor applied to AI-agent-generated code.[m
[32m+[m
[32m+[m[32m---[m
[32m+[m
[32m+[m[32m### 👤 Author[m
[32m+[m
[32m+[m[32m**Vamsi Mappetti** · QA / Test Automation Engineer[m
[32m+[m[32m📍 Bengaluru, India &nbsp;|&nbsp; 🔗 [@vamsimappetti2001](https://github.com/vamsimappetti2001)[m
 [m
[31m-Built to practice designing a test framework the way a real QA team would maintain one — page objects that model the app rather than the test, config/data separated from logic, and explicit handling for a real flakiness source (a shared hosted demo site) instead of just adding blind retries.[m
[32m+[m[32m<img src="https://capsule-render.vercel.app/api?type=waving&color=0:9B59B6,50:3178C6,100:2EAD33&height=100&section=footer"/>[m
