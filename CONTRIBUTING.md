# Contributing

First, thanks for your interest in contributing!

If you're looking for something to work on or want to talk through an idea before you start coding, visit the [issues page](https://github.com/laurenashpole/inner-image-zoom/issues).

## Getting Started

This is a monorepo using [Yarn's workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) so you'll want to make sure to have [Yarn installed](https://classic.yarnpkg.com/en/docs/install/#mac-stable) on your machine before getting started.

Commits should follow the forking workflow. For an overview, check out this [tutorial](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow) and their instructions for copying your personal repo. Once that's done, install your node modules with:

```js
yarn install
```

To start your demo app at [http://localhost:3000](http://localhost:3000), run:

```js
yarn start
```

## Development

The basic file structure in your new repo will be:

- `packages` - Package files organized by framework.
- `sandbox` - Demo app files organized by framework.
- `tests` - Test specs and data.

Changes to a framework's `src` directory inside `packages` will be reflected in its published package.

Initial releases were made using the [release-it](https://github.com/release-it/release-it) CLI tool but hopefully that'll move to a GitHub Actions CI/CD pipeline before too long. To get ready for that, when you've written your code and feel ready to commit, please use [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines) when writing your commit messages (feel free to just use `*` for scope).

If you're adding a new option or prop, don't forget to add it to the package's type definition file and include a short description in the `README.md` table.

## Testing

Tests are run on Chrome and Firefox headless browsers using [Karma](https://karma-runner.github.io/6.4/index.html) as a test runner, [Mocha](https://mochajs.org/) as a testing framework, and [Chai](https://www.chaijs.com/) for assertions. Interacting with the DOM is handled with the (DOM Testing Library)[https://testing-library.com/docs/dom-testing-library/intro/].

The following commands are available for testing:

- `yarn test` - Run the tests once.
- `yarn test:watch` - Watch files and run the tests on every change.
- `yarn test:coverage` - Run the tests on Chrome and generate a coverage report in `coverage/`.

Each command will also run [tsd](https://github.com/SamVerschueren/tsd) to test type definitions and [ESLint](https://github.com/eslint/eslint) with [Prettier](https://prettier.io/). To auto-fix any linting errors, use `yarn lint`.

If you can, try to include new tests with your changes. Otherwise, make sure to run `yarn test` to check that the existing tests still pass before opening a pull request.

Happy coding!