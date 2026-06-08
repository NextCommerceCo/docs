# Public Repository Readiness

Audit date: 2026-06-05  
Repository: `NextCommerceCo/docs`  
Current visibility at audit time: private

## Recommendation

This repo is a good candidate for public visibility after this branch lands and the GitHub repository settings checklist below is completed.

The main public-readiness issues found were repository hygiene rather than exposed production secrets:

- the root `README.md` was imported site content rather than a repository guide
- public contribution and security reporting conventions were missing
- the tracked `.claude` changelog skill contained personal local paths and internal sprint/project workflow
- several one-time migration scripts contained absolute local paths
- the locked Next.js dependency had active advisories

## Local Audit Summary

Security-sensitive scans performed:

- high-signal credential scan across the tracked tree
- high-signal credential scan across git history
- broad sensitive-term scan for internal-only fragments
- tracked `.env` check
- CI/CD, Docker, and IaC surface check
- npm production dependency audit
- tracked AI-agent skill review

Results:

- No tracked `.env` files were found.
- No high-confidence credential patterns were found in the tracked tree.
- No high-confidence credential patterns were found in git history.
- No `.github` workflows, Dockerfiles, Terraform files, or Kubernetes manifests were present.
- The app is a static-export Next.js/Fumadocs documentation site with a static search route generated from local content.
- `npm audit --omit=dev` is clean after the dependency changes on this branch.

## Changes Made For Public Readiness

- Replaced the root README with repository-oriented setup, validation, publishing, and public safety guidance.
- Added `CONTRIBUTING.md`.
- Added `SECURITY.md`.
- Restored the tracked `.claude` changelog skill because the team relies on it.
- Removed personal local paths from the changelog skill and kept only `.claude/settings.json` ignored.
- Converted changelog migration script paths from local absolute paths to repo-relative paths.
- Updated `next` from `16.2.1` to `16.2.7`.
- Added a narrow npm override for `postcss@8.5.10` because stable Next.js still pins a vulnerable nested PostCSS release.

## GitHub Settings Checklist

Before flipping the repository to public:

- Enable private vulnerability reporting for the repository.
- Enable Dependabot alerts and security updates.
- Enable secret scanning and push protection.
- Keep branch protection on `main` with pull request review required.
- Confirm repository description, homepage URL, and topics are public-friendly.
- Confirm whether the content should remain all-rights-reserved or receive an explicit open documentation license.

## Ongoing Rules

- Keep new internal automation skills, sprint workflows, and private project exports in an internal repository unless the team explicitly depends on them in this repo.
- Keep generated local folders untracked: `.next/`, `.source/`, `.wrangler/`, `.gstack/`, `node_modules/`, and `out/`.
- Re-run `npm audit --omit=dev` when dependencies change.
- Re-run `npm run build` before merging content or framework changes.
