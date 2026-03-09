# npm Publishing Workflow Setup Guide

This document describes the complete npm publishing workflow for Kenikool UI, including automatic version bumping and GitHub Actions integration.

## Overview

The publishing workflow consists of two main GitHub Actions workflows:

1. **release.yml** - Automatic version bumping based on conventional commits
2. **publish.yml** - Publishing to npm and creating GitHub releases

## Prerequisites

### 1. npm Account and Token

1. Create an account at [npmjs.com](https://www.npmjs.com) if you don't have one
2. Generate an npm token:
   - Go to https://www.npmjs.com/settings/tokens
   - Click "Generate New Token"
   - Select "Automation" token type (recommended for CI/CD)
   - Copy the token

### 2. GitHub Repository Secrets

Add the npm token to your GitHub repository:

1. Go to your repository settings
2. Navigate to "Secrets and variables" → "Actions"
3. Click "New repository secret"
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click "Add secret"

### 3. Repository Permissions

Ensure your GitHub Actions have the necessary permissions:

1. Go to repository settings
2. Navigate to "Actions" → "General"
3. Under "Workflow permissions", select:
   - ✅ Read and write permissions
   - ✅ Allow GitHub Actions to create and approve pull requests

## Workflow Configuration

### Automatic Version Bumping (release.yml)

The `release.yml` workflow automatically bumps the version based on conventional commits:

**Triggers:**

- Push to `main` branch
- Manual trigger via `workflow_dispatch`

**Conventional Commit Format:**

```
feat: add new feature          → MINOR version bump
fix: fix a bug                 → PATCH version bump
BREAKING CHANGE: description   → MAJOR version bump
chore: update dependencies     → No release
```

**Process:**

1. Analyzes commits since last tag
2. Determines version bump type
3. Updates `package.json` version
4. Updates `CHANGELOG.md`
5. Creates git tag and pushes to GitHub
6. Triggers `publish.yml` workflow automatically

### npm Publishing (publish.yml)

The `publish.yml` workflow publishes to npm and creates GitHub releases:

**Triggers:**

- GitHub release created
- Manual trigger via `workflow_dispatch` with version type input

**Process:**

1. Checks out code
2. Installs dependencies
3. Runs tests
4. Runs linter
5. Builds packages
6. Publishes to npm
7. Creates/updates GitHub release with build artifacts

## Usage

### Automatic Release (Recommended)

1. Make commits with conventional commit messages:

   ```bash
   git commit -m "feat: add new component"
   git commit -m "fix: resolve styling issue"
   ```

2. Push to main:

   ```bash
   git push origin main
   ```

3. The `release.yml` workflow will:
   - Detect the commits
   - Bump the version
   - Create a git tag
   - Trigger `publish.yml` automatically

4. Monitor the workflows in GitHub Actions tab

### Manual Release

If you need to manually trigger a release:

1. Go to GitHub Actions
2. Select "Automatic Release" workflow
3. Click "Run workflow"
4. Select version type (patch, minor, major)
5. Click "Run workflow"

The workflow will bump the version and trigger publishing.

### Manual Publishing Only

If you only want to publish without version bumping:

1. Go to GitHub Actions
2. Select "Publish to npm" workflow
3. Click "Run workflow"
4. The workflow will publish the current version

## Conventional Commits

To ensure proper version bumping, use conventional commit format:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Code change that improves performance
- **test**: Adding or updating tests
- **chore**: Changes to build process, dependencies, etc.

### Examples

```bash
# Feature (MINOR bump)
git commit -m "feat: add Button animation support"

# Bug fix (PATCH bump)
git commit -m "fix: resolve focus indicator visibility"

# Breaking change (MAJOR bump)
git commit -m "feat!: redesign component API"
# or
git commit -m "feat: redesign component API

BREAKING CHANGE: component props have changed"

# No release
git commit -m "chore: update dependencies"
```

## Version Numbering

Kenikool UI follows [Semantic Versioning](https://semver.org/):

- **MAJOR** (X.0.0): Breaking changes
- **MINOR** (0.X.0): New features (backwards compatible)
- **PATCH** (0.0.X): Bug fixes (backwards compatible)

### Examples

- `0.1.0` → `0.2.0`: New component added (feat)
- `0.1.0` → `0.1.1`: Bug fix (fix)
- `0.1.0` → `1.0.0`: Breaking API change (BREAKING CHANGE)

## CHANGELOG Management

The `CHANGELOG.md` is automatically updated with:

- Version number
- Release date
- Added features (from feat commits)
- Fixed bugs (from fix commits)
- Breaking changes (from BREAKING CHANGE commits)

### Manual CHANGELOG Updates

If you need to manually update the CHANGELOG:

1. Edit `CHANGELOG.md`
2. Add entry at the top with format:

   ```markdown
   ## [X.Y.Z] - YYYY-MM-DD

   ### Added

   - New feature 1
   - New feature 2

   ### Fixed

   - Bug fix 1

   ### Changed

   - Breaking change 1
   ```

3. Commit with message: `chore: update CHANGELOG`

## npm Package Configuration

### Entry Points

The `package.json` exports are configured for:

```json
{
  "exports": {
    ".": {
      "types": "./packages/vanilla/dist/index.d.ts",
      "import": "./packages/vanilla/dist/index.mjs",
      "require": "./packages/vanilla/dist/index.cjs"
    },
    "./vanilla": { ... },
    "./react": { ... },
    "./css": "./packages/vanilla/dist/styles.css"
  }
}
```

### Files Included

The `files` field includes:

- `packages/vanilla/dist` - Vanilla component builds
- `packages/react/dist` - React component builds
- `packages/core/dist` - Core utilities
- `README.md` - Installation guide
- `CHANGELOG.md` - Version history
- `LICENSE` - MIT license

## Troubleshooting

### Workflow Fails with "npm ERR! 403 Forbidden"

**Cause**: Invalid or expired npm token

**Solution**:

1. Generate a new npm token at https://www.npmjs.com/settings/tokens
2. Update the `NPM_TOKEN` secret in GitHub
3. Re-run the workflow

### Workflow Fails with "npm ERR! 404 Not Found"

**Cause**: Package name mismatch or not logged in

**Solution**:

1. Verify package name in `package.json` is `@kenikool/ui`
2. Verify npm token has publish permissions
3. Check that the package hasn't been published already

### Version Bump Not Detected

**Cause**: Commits don't follow conventional commit format

**Solution**:

1. Use proper commit format: `feat:`, `fix:`, `BREAKING CHANGE:`
2. Manually trigger release workflow with desired version type
3. Or manually bump version: `npm version patch|minor|major`

### GitHub Actions Permission Denied

**Cause**: Insufficient workflow permissions

**Solution**:

1. Go to repository settings
2. Navigate to "Actions" → "General"
3. Select "Read and write permissions"
4. Enable "Allow GitHub Actions to create and approve pull requests"

### Release Tag Already Exists

**Cause**: Tag was already created for this version

**Solution**:

1. Delete the tag locally: `git tag -d vX.Y.Z`
2. Delete the tag remotely: `git push origin --delete vX.Y.Z`
3. Re-run the workflow

## Monitoring Releases

### GitHub Actions

Monitor workflow execution:

1. Go to repository "Actions" tab
2. Select "Automatic Release" or "Publish to npm" workflow
3. View logs for each step

### npm Registry

Verify publication:

1. Visit https://www.npmjs.com/package/@kenikool/ui
2. Check version history
3. Verify package contents

### GitHub Releases

View published releases:

1. Go to repository "Releases" page
2. Check release notes and assets
3. Verify build artifacts are attached

## Security Best Practices

1. **Token Scope**: Use "Automation" token type for CI/CD
2. **Token Rotation**: Regenerate tokens periodically
3. **Access Control**: Limit who can trigger manual workflows
4. **Audit Logs**: Monitor GitHub Actions logs for suspicious activity
5. **Branch Protection**: Require reviews before merging to main

## Additional Resources

- [npm Documentation](https://docs.npmjs.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [npm Token Management](https://docs.npmjs.com/creating-and-viewing-authentication-tokens)

## Support

For issues with the publishing workflow:

1. Check GitHub Actions logs for error messages
2. Verify npm token is valid and has publish permissions
3. Ensure commits follow conventional commit format
4. Review this guide for troubleshooting steps
5. Open an issue on GitHub if problems persist
