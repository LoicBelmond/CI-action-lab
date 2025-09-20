# Workflow Documentation

## CI Pipeline — `.github/workflows/ci.yml`
**Purpose:** CI on pushes/PRs to ensure lint, format, tests (coverage ≥ 80%), and build work.  
**Triggers:** push to `master` (also `main`, `develop`), PR into `master`.  
**Jobs:**  
- Lint & Prettier Check → ESLint + Prettier check  
- Unit Tests & Coverage → Jest; uploads `coverage` artifact; uploads to Codecov  
- Build & Upload Artifact → builds to `dist/`; uploads artifact  
**Dependencies:** `test` needs `lint`; `build` needs `test`.  
**Secrets:** `CODECOV_TOKEN` (private repos).  
**Troubleshooting:**  
- `npm ci` fails → delete `node_modules` & `package-lock.json`, run `npm install`, commit lockfile.  
- ESLint v9 → use `eslint.config.cjs` (flat config).  
- Coverage fail → add tests or lower threshold (not recommended).  

## Deploy to GitHub Pages — `.github/workflows/deploy.yml`
**Purpose:** Deploy `dist/` to Pages on push to `master`.  
**Permissions:** `pages: write`, `id-token: write`.  
**Setup:** Settings → Pages → Source = GitHub Actions.  
**Troubleshooting:** 404 → make sure `dist/index.html` exists and workflow ran.

## Daily Dependency Audit — `.github/workflows/dependency-audit.yml`
**Purpose:** Daily `npm audit`; create or comment on an issue if vulnerabilities found.  
**Triggers:** schedule daily 06:00 UTC; manual dispatch.  
**Permissions:** `issues: write`.  
**Outputs:** artifact `npm-audit-report`; created/updated issue with severity counts.

## Composite Action — `.github/actions/node-setup`
**Purpose:** DRY setup: Node + npm cache + `npm ci`.  
**Use:** `uses: ./.github/actions/node-setup` with `node-version: '20'`.
