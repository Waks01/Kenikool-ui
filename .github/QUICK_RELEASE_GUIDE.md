# Quick Release Guide

Fast reference for publishing Kenikool UI to npm.

## TL;DR - Automatic Release

```bash
# 1. Make commits with conventional format
git commit -m "feat: add new component"
git commit -m "fix: resolve bug"

# 2. Push to main
git push origin main

# 3. Done! Workflows handle the rest
# - Version bumped automatically
# - Published to npm
# - GitHub release created
```

## Conventional Commit Types

| Type                           | Bump  | Example                      |
| ------------------------------ | ----- | ---------------------------- |
| `feat:`                        | MINOR | `feat: add Button animation` |
| `fix:`                         | PATCH | `fix: resolve focus issue`   |
| `feat!:` or `BREAKING CHANGE:` | MAJOR | `feat!: redesign API`        |
| `chore:`, `docs:`, etc.        | None  | `chore: update deps`         |

## Manual Release

Go to GitHub Actions → "Automatic Release" → "Run workflow" → Select version type

## Verify Publication

1. Check npm: https://www.npmjs.com/package/@kenikool/ui
2. Check GitHub: https://github.com/kenikool/kenikool-ui/releases
3. Install locally: `npm install @kenikool/ui@X.Y.Z`

## Troubleshooting

| Issue              | Solution                             |
| ------------------ | ------------------------------------ |
| Workflow fails     | Check GitHub Actions logs            |
| npm 403 error      | Verify NPM_TOKEN secret is valid     |
| Version not bumped | Use conventional commit format       |
| Permission denied  | Check repository Actions permissions |

## Documentation

- [Full Setup Guide](.github/GITHUB_ACTIONS_SETUP.md)
- [npm Publishing Guide](../PUBLISHING.md)
- [Conventional Commits](https://www.conventionalcommits.org/)
