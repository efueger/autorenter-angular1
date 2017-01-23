[![Build Status][travis-image]][travis-url]

# AutoRenter - Angular 1

An Angular based implementation of the AutoRenter UI.

## Overview

These instructions will cover usage information for the UI.

## Prerequisites

For now, the api must also be running for the UI to work properly. Please follow directions in the corresponding readme.

- Make sure the project is at a location with minimal file path length (this is especially important in a Windows environment!). For this project we strongly recommend `c:/aur/ui` as the project root.
- Install [Git](https://git-scm.com/downloads).
- Install [Node](https://nodejs.org/en/download/) (tested on version 6.2.2)

## How To

**Unless otherwise noted, all terminal commands must be issued from the project's root directory.**

### Install project libraries

```bash
npm install
```

### Run tests

Note that this will lint the code before running tests. No tests will run if lint errors are found.

```bash
npm test
```

Watch mode:
```bash
npm run test:watch
```

### Start the app

To start the app with all debug logging enabled (recommended):

```bash
npm start
```

## Browse the App

After successfully starting the UI app, you should be able to run the application by browsing to `http://127.0.0.1:8080/`.

## Recommended Development Workflow

The following steps describe the recommended development workflow.

1. Pull from the `development` branch.
1. As described above:
  1. Install project libraries.
  1. Run tests.
  1. Start the UI.
1. Browse the UI.

**If you encounter problems with any of this, please see the Troubleshooting section, below.**

If you are implementing a new feature, in addition to the previous steps you should:

1. Create a feature branch by branching off of `development`.
1. Implement your feature. *Note that during this process you should regularly (at least 1x/day) merge the `development` branch into your feature branch to ensure your code is staying current with work being done by the rest of the team.*
	1. Develop
		1. Make changes to code, scripts, unit tests, etc.
		1. Lint your code.
		1. Run the tests.
		1. Browse the UI.
		1. Repeat until you have something meaningful to commit to your feature branch.
	1. Commit changes to your feature branch.
	1. Repeat these feature implementation steps until the feature is ready to review.
1. Open a pull request to merge your feature branch into `development`.

## Troubleshooting

### npm "Maximum call stack size exceeded"

* Try running `npm install` again. After a few tries it will finally succeed. Usually.

## Style Guide

Please refer to the team's Angular 1 Style Guide, located [here](https://bitbucket.fusionalliance.com/projects/FUSADIP/repos/autorenter_spec/browse/styleguide_angular1.md).

## Contributing

Please read the [CONTRIBUTING](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository]().

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Fusion Alliance for the initiative to create a community of open source development within our ranks.

[travis-url]: https://travis-ci.org/fusionalliance/autorenter-angular1
[travis-image]: https://travis-ci.org/fusionalliance/autorenter-angular1.svg?branch=development&style=flat-square
