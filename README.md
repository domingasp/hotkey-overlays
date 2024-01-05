# Vite + React Starter

Are you tired of having to do all the boilerplate before you can start Developing, I was. This starter project has all the essentials configured allowing you to just do dev work.

Packages have been installed with `pnpm` but feel free to use `npm` or `yarn`, don't forget to remove the existing `pnpm-lock.yaml` file if you do decide to change.

## What's Configured?
---

Great question, the following have been configured:

- ESLint with the AirBnb style guide: allows for consistent code using many of the best practices.
  - Rules can be disabled in the `.eslintrc.json` file.
- Prettier: code-formatter, saves time by not having to worry about the formatting of the code.

## Getting Started
---

It's as easy as cloning the Repo and running `pnpm i` (or equivalent).

### With VSCode

If you are using VSCode install the following plugins the optimal experience:

- ESLint
- Prettier

### Without VSCode (CLI Commands)

If VSCode is not your editor of choice no problem. There should be integrations for your editor, if not you can always use _ye olde faithful_, aka, the CLI.

- To lint: `npx eslint .`
- To fix any issues raised: `npx eslint . --fix`