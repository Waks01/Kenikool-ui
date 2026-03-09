# Publishing Guide - Kenikool UI

This guide explains how to publish Kenikool UI to npm using automated workflows.

## Quick Start

### Automatic Publishing (Recommended)

1. Make commits with conventional commit messages:

   ```bash
   git commit -m "feat: add new component"
   git commit -m "fix: resolve styling issue"
   ```

2. Push to main:

   ```bash
   git push origin main
   ```

3. The automated workflow will:
   - Detect the commits
   - Bump the version automatically
   - Create a git tag
   - Publish to npm
   - Create a GitHub release

### Manual Publishing

If you need to manually trigger a release:

1. Go to GitHub Actions
2. Select "Automatic Release" workflow
3. Click "Run workflow"
4. Select version type (patch, minor, major)
5. Click "Run workflow"

## Prerequisites

1. **npm Account**: Create an account at [npmjs.com](https://www.npmjs.com)
2. **npm Token**: Generate a token at https://www.npmjs.com/settings/tokens
3. **GitHub Secrets**: Add `NPM_TOKEN` to your GitHub repository secrets
4. **Git Access**: Push access to the repository

## Automated Workflows

### Automatic Release Workflow (release.yml)

Automatically bumps version based on conventional commits:

**Triggers:**

- Push to main branch
- Manual trigger via GitHub Actions

**Conventional Commit Format:**

```
feat: add new feature          → MINOR version bump
fix: fix a bug                 → PATCH version bump
BREAKING CHANGE: description   → MAJOR version bump
```

**Process:**

1. Analyzes commits since last tag
2. Determines version bump type
3. Updates package.json version
4. Updates CHANGELOG.md
5. Creates git tag
6. Triggers publish workflow

### Publish to npm Workflow (publish.yml)

Publishes to npm and creates GitHub releases:

**Triggers:**

- GitHub release created (automatic)
- Manual trigger via GitHub Actions

**Process:**

1. Checks out code
2. Installs dependencies
3. Runs tests
4. Runs linter
5. Builds packages
6. Publishes to npm
7. Creates GitHub release with artifacts

## Manual Publishing (if needed)

If the automated workflow fails, you can publish manually:

1. Login to npm:

   ```bash
   npm login
   ```

2. Build packages:

   ```bash
   pnpm build
   ```

3. Publish to npm:
   ```bash
   pnpm publish --access public
   ```

## Verifying Publication

1. Check npm package page:

   ```
   https://www.npmjs.com/package/@kenikool/ui
   ```

2. Install from npm:

   ```bash
   npm install @kenikool/ui@0.1.0
   ```

3. Verify package contents:
   ```bash
   npm view @kenikool/ui@0.1.0
   ```

## Troubleshooting

### "npm ERR! 403 Forbidden"

- Check that your npm token is valid
- Verify you have publish permissions
- Check that the version hasn't been published already

### "npm ERR! 404 Not Found"

- Verify the package name is correct
- Check that you're logged in to npm
- Ensure the package.json has the correct name

### Build fails

- Run `pnpm install` to ensure dependencies are installed
- Check that all tests pass: `pnpm test`
- Verify TypeScript compiles: `pnpm build`

### GitHub Actions workflow fails

- Check the workflow logs in GitHub Actions
- Verify `NPM_TOKEN` is set in repository secrets
- Ensure the token has publish permissions

## Version Numbering

Kenikool UI follows [Semantic Versioning](https://semver.org/):

- **MAJOR** (X.0.0): Breaking changes
- **MINOR** (0.X.0): New features (backwards compatible)
- **PATCH** (0.0.X): Bug fixes (backwards compatible)

### Examples

- `0.1.0` → `0.2.0`: New component added
- `0.1.0` → `0.1.1`: Bug fix
- `0.1.0` → `1.0.0`: Breaking API change

## Release Checklist

- [ ] Update version in package.json
- [ ] Update CHANGELOG.md
- [ ] Run full test suite (`pnpm test`)
- [ ] Run linter (`pnpm lint`)
- [ ] Build packages (`pnpm build`)
- [ ] Commit changes
- [ ] Create git tag
- [ ] Push to GitHub
- [ ] Create GitHub release
- [ ] Verify npm publication
- [ ] Update documentation
- [ ] Announce release

## Documentation Updates

After publishing, update:

1. **README.md**: Update installation instructions if needed
2. **Storybook**: Deploy updated documentation
3. **GitHub**: Update repository description if needed
4. **Website**: Update version information

## Support

For publishing issues, see:

- [npm Documentation](https://docs.npmjs.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Semantic Versioning](https://semver.org/)

## Conventional Commits

To ensure proper version bumping, use conventional commit format:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature (MINOR bump)
- **fix**: A bug fix (PATCH bump)
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning
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

## Manual Publishing (if needed)

If the automated workflow fails, you can publish manually:

1. Login to npm:

   ```bash
   npm login
   ```

2. Build packages:

   ```bash
   pnpm build
   ```

3. Publish to npm:
   ```bash
   pnpm publish --access public
   ```

## Verifying Publication

1. Check npm package page:

   ```
   https://www.npmjs.com/package/@kenikool/ui
   ```

2. Install from npm:

   ```bash
   npm install @kenikool/ui@X.Y.Z
   ```

3. Verify package contents:
   ```bash
   npm view @kenikool/ui@X.Y.Z
   ```

## Troubleshooting

### "npm ERR! 403 Forbidden"

- Check that your npm token is valid
- Verify you have publish permissions
- Check that the version hasn't been published already

### "npm ERR! 404 Not Found"

- Verify the package name is correct
- Check that you're logged in to npm
- Ensure the package.json has the correct name

### Build fails

- Run `pnpm install` to ensure dependencies are installed
- Check that all tests pass: `pnpm test`
- Verify TypeScript compiles: `pnpm build`

### GitHub Actions workflow fails

- Check the workflow logs in GitHub Actions
- Verify `NPM_TOKEN` is set in repository secrets
- Ensure the token has publish permissions
- Review the [NPM Publishing Setup Guide](.github/NPM_PUBLISHING_SETUP.md) for detailed troubleshooting

## Version Numbering

Kenikool UI follows [Semantic Versioning](https://semver.org/):

- **MAJOR** (X.0.0): Breaking changes
- **MINOR** (0.X.0): New features (backwards compatible)
- **PATCH** (0.0.X): Bug fixes (backwards compatible)

### Examples

- `0.1.0` → `0.2.0`: New component added
- `0.1.0` → `0.1.1`: Bug fix
- `0.1.0` → `1.0.0`: Breaking API change

## Release Checklist

For manual releases:

- [ ] Make commits with conventional commit messages
- [ ] Push to main branch
- [ ] Monitor GitHub Actions workflows
- [ ] Verify npm publication
- [ ] Check GitHub release was created
- [ ] Update documentation if needed
- [ ] Announce release

## Documentation Updates

After publishing, update:

1. **README.md**: Update installation instructions if needed
2. **Storybook**: Deploy updated documentation
3. **GitHub**: Update repository description if needed
4. **Website**: Update version information

## Additional Resources

- [Detailed Setup Guide](.github/NPM_PUBLISHING_SETUP.md)
- [npm Documentation](https://docs.npmjs.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
