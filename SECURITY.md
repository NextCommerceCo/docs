# Security Policy

## Reporting a Vulnerability

Do not open a public GitHub issue for vulnerabilities, exposed credentials, private customer data, or other sensitive reports.

Use GitHub private vulnerability reporting if it is enabled for this repository. If that is unavailable, contact your Next Commerce representative and include:

- the affected page, file, or URL
- what sensitive data or behavior is exposed
- steps to reproduce, if safe to share privately
- whether the issue appears in the live site, the repository, or both

## Sensitive Content Rules

This repository should not contain:

- API keys, tokens, passwords, private keys, `.env` files, or credentials
- customer data, support exports, merchant account details, or private screenshots
- internal-only sprint notes, private GitHub project exports, or private incident notes
- unpublished security procedures that would increase risk if disclosed

If sensitive content is committed, treat the repository history as exposed once the repository is public. Remove the content, rotate any affected credentials, and review the exposure window before publishing.
