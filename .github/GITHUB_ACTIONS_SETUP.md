# GitHub Actions Setup for npm Publishing

This document provides a complete guide to setting up and using the GitHub Actions workflows for automated npm publishing.

## Overview

The npm publishing workflow consists of two main GitHub Actions workflows:

1. **release.yml** - Automatic version bumping based on conventional commits
2. **publish.yml** - Publishing to npm and creating GitHub releases

## Workflow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Developer Workflow                        │
│                                                              │
│  1. Make commits with conventional commit messages          │
│  2. Push to main branch                                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              release.yml (Automatic Release)                │
│                                                              │
│  1. Triggered on push to main                               │
│  2. Analyzes commits since last tag                         │
│  3. Determines version bump (major/minor/patch)             │
│  4. Updates package.json version                            │
│  5. Updates CHANGELOG.md                                    │
│  6. Creates git tag (v0.2.0)                                │
│  7. Pushes tag to GitHub                                    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼ (Tag push triggers release event)
┌─────────────────────────────────────────────────────────────┐
│            publish.yml (Publish to npm)                     │
│                                                              │
│  1. Triggered on GitHub release created                     │
│  2. Checks out code                                         │
│  3. Installs dependencies                                   │
│  4. Runs tests                                              │
│  5. Runs linter                                             │
│  6. Builds packages                                         │
│  7. Publishes to npm                                        │
│  8. Creates GitHub release with artifacts                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                   npm Registry                              │
│                                                              │
│  Package published: @kenikool/ui@0.2.0                      │
│  Available for installation: npm install @kenikool/ui       │
└─────────────────────────────────────────────────────────────┘
```

## Initial Setup

### Step 1: Generate npm Token

1. Go to https://www.npmjs.com/settings/tokens
2. Click "Generate New Token"
3. Select "Automation" token type (recommended for CI/CD)
4. Copy the token (you won't be able to see it again)

### Step 2: Add GitHub Secret

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click "Add secret"

### Step 3: Configure Repository Permissions

1. Go to Settings → Actions → General
2. Under "Workflow permissions", select:
   - ✅ Read and write permissions
   - ✅ Allow GitHub Actions to create and approve pull requests
3. Click "Save"

### Step 4: Verify Workflows

1. Go to Actions tab
2. You should see:
   - "Automatic Release" workflow
   - "Publish to npm" workflow
   - Other workflows (test, lint, etc.)

## Using the Workflows

### Automatic Release (Recommended)

The most common workflow:

1. **Make commits** with conventional commit format:

   ```bash
   git commit -m "feat: add new component"
   git commit -m "fix: resolve styling issue"
   ```

2. **Push to main**:

   ```bash
   git push origin main
   ```

3. **Workflows run automatically**:
   - `release.yml` detects commits
   - Bumps version (0.1.0 → 0.2.0)
   - Creates git tag (v0.2.0)
   - `publish.yml` publishes to npm
   - GitHub release is created

4. **Monitor progress**:
   - Go to Actions tab
   - Click on the workflow run
   - View logs for each step

### Manual Release

If you need to manually trigger a release:

1. Go to GitHub Actions
2. Select "Automatic Release" workflow
3. Click "Run workflow"
4. Select version type:
   - patch (0.1.0 → 0.1.1)
   - minor (0.1.0 → 0.2.0)
   - major (0.1.0 → 1.0.0)
5. Click "Run workflow"

The workflow will:

- Bump the version
- Update CHANGELOG
- Create git tag
- Trigger publishing

### Manual Publishing Only

If you only want to publish without version bumping:

1. Go to GitHub Actions
2. Select "Publish to npm" workflow
3. Click "Run workflow"
4. The workflow will publish the current version

## Conventional Commits

The `release.yml` workflow analyzes commits to determine version bumping:

### Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types and Version Bumping

| Type                                     | Version Bump | Example                                   |
| ---------------------------------------- | ------------ | ----------------------------------------- |
| feat                                     | MINOR        | `feat: add Button animation support`      |
| fix                                      | PATCH        | `fix: resolve focus indicator visibility` |
| BREAKING CHANGE                          | MAJOR        | `feat!: redesign component API`           |
| docs, style, refactor, perf, test, chore | None         | `chore: update dependencies`              |

### Examples

```bash
# Feature (MINOR bump: 0.1.0 → 0.2.0)
git commit -m "feat: add Button animation support"

# Bug fix (PATCH bump: 0.1.0 → 0.1.1)
git commit -m "fix: resolve focus indicator visibility"

# Breaking change (MAJOR bump: 0.1.0 → 1.0.0)
git commit -m "feat!: redesign component API"

# Or with body
git commit -m "feat: redesign component API

BREAKING CHANGE: component props have changed"

# No release (no version bump)
git commit -m "chore: update dependencies"
```

## Workflow Details

### release.yml Workflow

**Triggers:**

- Push to main branch
- Manual trigger via workflow_dispatch

**Steps:**

1. Checkout code with full history
2. Setup Node.js 18
3. Install pnpm
4. Setup pnpm cache
5. Install dependencies
6. Analyze commits since last tag
7. Determine version bump type
8. Update package.json version
9. Update CHANGELOG.md
10. Commit changes
11. Create git tag
12. Push to GitHub

**Outputs:**

- Updated package.json
- Updated CHANGELOG.md
- New git tag
- Triggers publish.yml workflow

### publish.yml Workflow

**Triggers:**

- GitHub release created (automatic)
- Manual trigger via workflow_dispatch

**Steps:**

1. Checkout code
2. Setup Node.js 18
3. Install pnpm
4. Setup pnpm cache
5. Install dependencies
6. Run tests
7. Run linter
8. Build packages
9. Publish to npm
10. Create GitHub release with artifacts

**Outputs:**

- Published npm package
- GitHub release with build artifacts

## CHANGELOG Management

The `CHANGELOG.md` is automatically updated with:

- Version number
- Release date
- Added features (from feat commits)
- Fixed bugs (from fix commits)
- Breaking changes (from BREAKING CHANGE commits)

### Format

```markdown
## [0.2.0] - 2024-01-15

### Added

- Button animation support
- New Card shadow variants

### Fixed

- Focus indicator visibility issue
- Input placeholder styling

### Changed

- Component API redesign (BREAKING)
```

## Monitoring Workflows

### GitHub Actions Dashboard

1. Go to repository Actions tab
2. View workflow runs
3. Click on a run to see details
4. View logs for each step
5. Check for errors or warnings

### Workflow Status Badges

Add to README.md:

```markdown
[![Publish to npm](https://github.com/kenikool/kenikool-ui/actions/workflows/publish.yml/badge.svg)](https://github.com/kenikool/kenikool-ui/actions/workflows/publish.yml)
[![Automatic Release](https://github.com/kenikool/kenikool-ui/actions/workflows/release.yml/badge.svg)](https://github.com/kenikool/kenikool-ui/actions/workflows/release.yml)
```

## Troubleshooting

### Workflow Fails with "npm ERR! 403 Forbidden"

**Cause**: Invalid or expired npm token

**Solution**:

1. Generate a new npm token at https://www.npmjs.com/settings/tokens
2. Update the `NPM_TOKEN` secret in GitHub
3. Re-run the workflow

### Workflow Fails with "npm ERR! 404 Not Found"

**Cause**: Package name mismatch

**Solution**:

1. Verify package name in package.json is `@kenikool/ui`
2. Check npm token has publish permissions
3. Ensure version hasn't been published already

### Version Bump Not Detected

**Cause**: Commits don't follow conventional commit format

**Solution**:

1. Use proper commit format: `feat:`, `fix:`, `BREAKING CHANGE:`
2. Manually trigger release workflow with desired version type
3. Or manually bump: `npm version patch|minor|major`

### GitHub Actions Permission Denied

**Cause**: Insufficient workflow permissions

**Solution**:

1. Go to Settings → Actions → General
2. Select "Read and write permissions"
3. Enable "Allow GitHub Actions to create and approve pull requests"

### Release Tag Already Exists

**Cause**: Tag was already created for this version

**Solution**:

1. Delete tag locally: `git tag -d vX.Y.Z`
2. Delete tag remotely: `git push origin --delete vX.Y.Z`
3. Re-run the workflow

### Tests Fail in Workflow

**Cause**: Code changes break tests

**Solution**:

1. Run tests locally: `pnpm test`
2. Fix failing tests
3. Commit fixes with proper message
4. Push to main

### Build Fails in Workflow

**Cause**: TypeScript or build errors

**Solution**:

1. Run build locally: `pnpm build`
2. Fix build errors
3. Commit fixes
4. Push to main

## Security Best Practices

1. **Token Scope**: Use "Automation" token type for CI/CD
2. **Token Rotation**: Regenerate tokens periodically (every 90 days)
3. **Access Control**: Limit who can trigger manual workflows
4. **Audit Logs**: Monitor GitHub Actions logs for suspicious activity
5. **Branch Protection**: Require reviews before merging to main
6. **Secrets Management**: Never commit tokens or secrets to repository

## Advanced Configuration

### Custom Version Bumping

To use a different version bumping strategy:

1. Edit `.github/workflows/release.yml`
2. Modify the "Analyze commits" step
3. Change version bump logic as needed

### Custom Publishing

To add additional publishing steps:

1. Edit `.github/workflows/publish.yml`
2. Add new steps after "Publish to npm"
3. Examples: deploy Storybook, send notifications, etc.

### Conditional Publishing

To publish only on certain conditions:

1. Add `if:` condition to publish step
2. Example: `if: github.ref == 'refs/heads/main'`

## Integration with Other Tools

### Slack Notifications

Add to publish.yml:

```yaml
- name: Notify Slack
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
    payload: |
      {
        "text": "Published @kenikool/ui@${{ steps.version.outputs.new_version }}"
      }
```

### Discord Notifications

Add to publish.yml:

```yaml
- name: Notify Discord
  uses: sarisia/actions-status-discord@v1
  with:
    webhook_url: ${{ secrets.DISCORD_WEBHOOK }}
    status: ${{ job.status }}
```

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [npm Documentation](https://docs.npmjs.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [npm Token Management](https://docs.npmjs.com/creating-and-viewing-authentication-tokens)

## Support

For issues with the publishing workflow:

1. Check GitHub Actions logs for error messages
2. Verify npm token is valid and has publish permissions
3. Ensure commits follow conventional commit format
4. Review this guide for troubleshooting steps
5. Check [NPM_PUBLISHING_SETUP.md](.github/NPM_PUBLISHING_SETUP.md) for additional help
