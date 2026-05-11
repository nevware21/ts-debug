# Copilot instructions for `nevware21/ts-debug`

## Repository overview

- This repository is a Rush monorepo.
- The publishable packages are `dbg` (`@nevware21/ts-debug`) and `providers` (`@nevware21/ts-debug-providers`).
- Root-level validation runs from the repository root with:
  - `npm run lint`
  - `npm run build`
  - `npm run test`

## Release checklist

When preparing a release, always:

1. Use a commit title in the exact format `[Release] Increase version to x.y.z`.
2. Update every required package manifest:
   - `package.json`
   - `dbg/package.json`
   - `providers/package.json`
   - Keep `providers/package.json` aligned with the new `@nevware21/ts-debug` dependency version.
3. Update `README.md` so the recommended install version matches the new release.
4. Update `CHANGELIST.md`:
   - include only the significant changes for the new version
   - add a full changelist link when one is available
   - preserve any existing unreleased details as-is; do not remove them and do not reduce them into the new version summary

## Release packaging notes

- Root `npm run prep-release` runs `npm run cleanBuild` followed by `npm run npm-pack`.
- Root `npm run npm-pack` copies `README.md` and `LICENSE` into both publishable packages and then runs Rush `npm-pack`.
